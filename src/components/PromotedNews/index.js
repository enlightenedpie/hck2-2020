import React from "react"
import { graphql, useStaticQuery } from "gatsby"

export default props => {
  const data = useStaticQuery(graphql`
    query {
      wpquery {
        posts(first: 1, where: { categoryName: "news", isFeatured: true }) {
          nodes {
            title
            contentData
            content
            seo
          }
        }
      }
    }
  `)

  let dist = data.wpquery.posts.nodes[0]

  return (
    <div {...props}>
      <h4>Newsroom</h4>
      <div>{dist.title}</div>
    </div>
  )
}
