import React from "react"
import HtmlToReact from "html-to-react"
import { graphql, useStaticQuery } from "gatsby"

const HTR = new HtmlToReact.Parser()

export default props => {
  const data = useStaticQuery(graphql`
    query {
      wpquery {
        posts(first: 1, where: { categoryName: "blog", isFeatured: true }) {
          nodes {
            title
            excerpt
            uri
            featuredImage {
              altText
              sourceUrl
              srcSet
              sizes
              mimeType
              title
              uri
              link
            }
          }
        }
      }
    }
  `)

  let {
      wpquery: {
        posts: { nodes },
      },
    } = data,
    { title, excerpt, uri, featuredImage: img } = nodes[0]

  return (
    <div {...props}>
      <h4>Blog</h4>
      <div-spacer />
      {img ? (
        ""
      ) : (
        <img
          alt="HCK2 marketing experts discussing next steps on an awesome brand strategy!"
          src="/assets/img/video-placeholder.jpg"
        />
      )}
      <blog-title>{title}</blog-title>
      {HTR.parse(excerpt)}
    </div>
  )
}
