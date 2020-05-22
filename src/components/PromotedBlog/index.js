import React from "react"
import Img from "gatsby-image"
import parse from "html-react-parser"
import { Link, graphql, useStaticQuery } from "gatsby"
import { stripSite, imageDefaults } from "../../utils"

import styles from "../promoted.module.sass"

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
              id
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  ...hck2FluidImage
                }
              }
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
    {
      uri,
      title,
      excerpt,
      featuredImage: {
        imageFile: { childImageSharp },
      },
    } = posts[0]

  return (
    <div {...props}>
      <h4>
        <Link to="/blog">Blog</Link>
      </h4>
      <div-spacer />
      <Link to={stripSite(uri)}>
        <Img
          className={[styles.mediaImage, "hero"].join(" ")}
          {...childImageSharp}
          {...imageDefaults}
        />
        <blog-title>{title}</blog-title>
        {parse(excerpt)}
      </Link>
    </div>
  )
}
