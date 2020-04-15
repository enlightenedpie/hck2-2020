const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

const postNodes = ["blog", "news"]

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  postNodes.forEach(async (postNode, i) => {
    const result = await graphql(`
      query {
        wpquery {
          posts(where: {categoryName: "${postNode}"}, first: 500) {
            nodes {
              categories {
                nodes {
                  name
                }
              }
              contentData
              databaseId
              id
              seo
              slug
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
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) throw result.errors

      // Create blog posts pages.
      const posts = result.data.wpquery.posts.nodes

      posts.forEach((post, index) => {
        let theSlug = [postNode, post.slug].join("/")
        createPage({
          path: theSlug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            slug: theSlug,
          },
        })
      })

      return null
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  return null
  const { createNodeField } = actions

  postNodes.forEach(async (postNode, i) => {
    if (node.internal.type === `SitePage`) {
      const value = createFilePath({ node, getNode, basePath: postNode })

      createNodeField({
        name: `slug`,
        node,
        value,
      })
    }
  })
}
