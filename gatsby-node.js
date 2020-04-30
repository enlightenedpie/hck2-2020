const _ = require("lodash")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

const getOnlyPublished = nodes =>
  _.filter(nodes, ({ node }) => node.status === "publish")

const stripSite = link => (link ? link.replace("https://hck2.com/", "") : "")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    query {
      wpquery {
        posts(first: 300) {
          nodes {
            categories {
              nodes {
                name
                slug
              }
            }
            databaseId
            seo
            title
            date
            excerpt
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
            slug
            link
            status
            content
          }
        }
        categories(where: {}) {
          edges {
            node {
              id
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

      const postTemplate = path.resolve(`./src/templates/singlePost.js`)
      const posts = result.data.wpquery.posts.nodes

      // Create a Gatsby page for each WordPress post
      _.each(posts, post => {
        createPage({
          path: `${stripSite(post.link)}`,
          component: postTemplate,
          context: {
            ...post,
          },
        })
      })
    })
    .then(() => {
      return graphql(`
        query {
          wpquery {
            pages(where: { id: 661 }) {
              nodes {
                uri
                databaseId
                seo
                content
                contentData
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
            }
            services {
              nodes {
                name
                uri
                description
                id
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

      const serviceTemplate = path.resolve(`./src/templates/singleService.js`),
        serviceLines = path.resolve(`./src/templates/allServices.js`)

      let { services, pages } = result.data.wpquery

      pages = pages.nodes[0]
      services = services.nodes

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
        path: `${stripSite(pages.uri)}`,
        component: serviceLines,
        context: {
          ...pages,
        },
      })
    })
    .then(() => {
      return graphql(`
        query {
          wpquery {
            caseStudies {
              nodes {
                databaseId
                uri
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

      // Create a Gatsby page for each individual case studies
      _.each(caseStudies, cs => {
        createPage({
          path: `${stripSite(cs.uri)}`,
          component: csTemplate,
          context: {
            id: cs.databaseId,
          },
        })
      })
    })
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
