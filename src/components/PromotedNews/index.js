import React from "react"
import HtmlToReact from "html-to-react"
import { Link, graphql, useStaticQuery } from "gatsby"
import ResponsiveImg from "../ResponsiveImg"
import { stripSite } from "../../utils"

const HTR = new HtmlToReact.Parser()

export default props => {
  const data = useStaticQuery(graphql`
    query {
      wpquery {
        posts(first: 1, where: { categoryName: "news", isFeatured: true }) {
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
      <h4>Newsroom</h4>
      <div-spacer />
      <Link to={stripSite(uri)}>
        {img ? (
          <ResponsiveImg {...img} />
        ) : (
          <img
            alt="HCK2 marketing experts discussing next steps on an awesome brand strategy!"
            src="/assets/img/video-placeholder.jpg"
          />
        )}
        <blog-title>{title}</blog-title>
        {HTR.parse(excerpt)}
      </Link>
    </div>
  )
}
