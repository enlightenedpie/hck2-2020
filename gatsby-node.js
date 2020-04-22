const _ = require("lodash")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

const getOnlyPublished = nodes =>
  _.filter(nodes, ({ node }) => node.status === "publish")

const stripSite = link => link.replace("https://hck2.com/", "")

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
      const allPosts = result.data.wpquery.posts.nodes
      const posts =
        process.env.NODE_ENV === "production"
          ? getOnlyPublished(allPosts)
          : allPosts

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
            pages(where: { name: "services" }) {
              nodes {
                uri
                databaseId
                seo
                contentData
              }
            }
            services {
              nodes {
                name
                uri
                description
                id
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

      const serviceTemplate = path.resolve(`./src/templates/singleService.js`),
        serviceLines = path.resolve(`./src/templates/allServices.js`)
      ;(allServices = result.data.wpquery.services.nodes),
        (page = result.data.wpquery.services.nodes[0]),
        (services =
          process.env.NODE_ENV === "production"
            ? getOnlyPublished(allServices)
            : allServices)

      createPage({
        path: `${stripSite(page.uri)}`,
        component: serviceLines,
      })

      // Create a Gatsby page for each individual service line
      _.each(services, service => {
        createPage({
          path: `${stripSite(service.uri)}`,
          component: serviceTemplate,
          context: {
            id: service.databaseId,
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
