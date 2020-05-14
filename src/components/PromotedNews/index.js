import React from "react"
import parse from "html-react-parser"
import { Link, graphql, useStaticQuery } from "gatsby"
import ResponsiveImg from "../ResponsiveImg"
import { stripSite } from "../../utils"

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
        posts: { nodes: posts },
      },
    } = data,
    { title, excerpt, uri, featuredImage: img } = posts[0] || {}

  return (
    <div {...props}>
      <h4>
        <Link to="/news">Newsroom</Link>
      </h4>
      <div-spacer />
      <Link to={stripSite(uri)}>
        {img ? (
          <ResponsiveImg {...img} />
        ) : (
          <ResponsiveImg
            altText="HCK2 marketing experts discussing next steps on an awesome brand strategy!"
            sourceUrl="/assets/img/video-placeholder.jpg"
          />
        )}
        <blog-title>{title}</blog-title>
        {parse(excerpt)}
      </Link>
    </div>
  )
}
