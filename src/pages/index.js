import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "./front.module.sass"

const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout {...data} location={location} title={siteTitle}>
      <SEO
        title="Posts"
        keywords={[`devlog`, `blog`, `gatsby`, `javascript`, `react`]}
      />
      {data.site.siteMetadata.description && (
        <header className="page-head">
          <h1 className="page-head-title">
            {data.site.siteMetadata.description}
          </h1>
        </header>
      )}
      <div className={styles.testClass}>
        {posts.map(({ node }) => {
          return null
        })}
      </div>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            description
            tags
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default props => {
  return (
    <StaticQuery
      query={indexQuery}
      render={data => (
        <BlogIndex location={props.location} props data={data} {...props} />
      )}
    />
  )
}
