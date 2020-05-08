const _ = require("lodash")
const path = require("path")
const {
  createFilePath,
  createRemoteFileNode,
} = require("gatsby-source-filesystem")

const getOnlyPublished = nodes =>
  _.filter(nodes, ({ node }) => node.status === "publish")

const stripSite = link => (link ? link.replace("https://hck2.com/", "") : "")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return (
    graphql(`
      query {
        wpquery {
          posts(first: 2000, where: { status: PUBLISH }) {
            nodes {
              databaseId
              seo
              title
              date
              excerpt
              slug
              link
              status
              content
              categories {
                nodes {
                  name
                  slug
                }
              }
              featuredImage {
                altText
                databaseId
                link
                mediaType
                sizes
                sourceUrl
                srcSet
                title
              }
            }
          }
        }
      }
    `)
      .then(result => {
        if (result.errors) {
          result.errors.forEach(e => console.error(e.toString()))
          return Promise.reject(result.errors)
        }

        const postTemplate = path.resolve(`./src/templates/singlePost.js`),
          allPosts = path.resolve(`./src/templates/allPosts.js`)

        let {
            posts: { nodes: posts },
          } = result.data.wpquery,
          landings = {}

        // Create a Gatsby page for each WordPress post
        _.each(posts, post => {
          _.each(post.categories.nodes, cat => {
            landings[cat.slug] = cat.name
          })
          createPage({
            path: `${stripSite(post.link)}`,
            component: postTemplate,
            context: {
              ...post,
            },
          })
        })

        _.each(Object.keys(landings), slug => {
          createPage({
            path: `${slug}`,
            component: allPosts,
            context: {
              slug: slug,
              name: landings[slug],
            },
          })
        })
      })
      .then(() => {
        return graphql(`
          query {
            wpquery {
              page(id: "661", idType: DATABASE_ID) {
                uri
                databaseId
                seo
                content
                title
                status
                date
                featuredImage {
                  uri
                  title
                  srcSet
                  sourceUrl
                  sizes
                  mediaType
                  mimeType
                  id
                  databaseId
                  altText
                }
              }
              services {
                nodes {
                  name
                  uri
                  description
                  databaseId
                  seo
                  featuredImg
                }
              }
            }
          }
        `)
      })
      .then(result => {
        if (result.errors) {
          result.errors.forEach(e => console.error(e.toString()))
          return Promise.reject(result.errors)
        }

        const serviceTemplate = path.resolve(
            `./src/templates/singleService.js`
          ),
          serviceLines = path.resolve(`./src/templates/allServices.js`)

        let {
          services: { nodes: services },
          page,
        } = result.data.wpquery

        // Create a Gatsby page for each individual expertise
        _.each(services, service => {
          createPage({
            path: `${stripSite(service.uri)}`,
            component: serviceTemplate,
            context: {
              id: service.databaseId,
            },
          })
        })

        // Create a Gatsby page for Expertise landing
        createPage({
          path: `${stripSite(page.uri)}`,
          component: serviceLines,
          context: {
            ...page,
          },
        })
      })

      .then(() => {
        return graphql(`
          query {
            wpquery {
              caseStudies(first: 1000) {
                nodes {
                  uri
                  databaseId
                }
              }
            }
          }
        `)
      })
      .then(result => {
        if (result.errors) {
          result.errors.forEach(e => console.error(e.toString()))
          return Promise.reject(result.errors)
        }

        const csTemplate = path.resolve(`./src/templates/singleCaseStudy.js`)

        let {
          data: {
            wpquery: {
              caseStudies: { nodes: caseStudies },
            },
          },
        } = result

        // Create a Gatsby page for each individual case study
        _.each(caseStudies, caseStudy => {
          createPage({
            path: `${stripSite(caseStudy.uri)}`,
            component: csTemplate,
            context: {
              id: caseStudy.databaseId,
            },
          })
        })
      })
      // Agency Bios
      .then(() => {
        return graphql(`
          query {
            wpquery {
              teamMembers {
                nodes {
                  content
                  title
                  featuredImage {
                    uri
                    title
                    srcSet
                    sourceUrl
                    sizes
                    mediaType
                    id
                    mimeType
                    databaseId
                    altText
                  }
                  slug
                  databaseId
                }
              }
            }
          }
        `)
      })
      .then(result => {
        if (result.errors) {
          result.errors.forEach(e => console.error(e.toString()))
          return Promise.reject(result.errors)
        }

        const bioTemplate = path.resolve(`./src/templates/bio.js`),
          leadershipTemplate = path.resolve(`./src/templates/leadership.js`)

        // let bios = result.data.wpquery.teamMembers.nodes
        let { teamMembers: team } = result.data.wpquery

        //   pages = pages.nodes[0]
        let bios = team.nodes

        // Create a Gatsby page for each individual Bio
        _.each(bios, bio => {
          createPage({
            // path: `${stripSite(bio.slug)}`,
            path: bio.slug,
            component: bioTemplate,
            context: {
              id: bio.databaseId,
            },
          })
        })

        // Create a Gatsby page for Leadership landing
        createPage({
          path: `leadership`,
          component: leadershipTemplate,
          context: {
            bios: bios,
          },
        })
      })
  )
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
