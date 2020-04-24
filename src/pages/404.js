import React from "react"
import { graphql, StaticQuery } from "gatsby"
import HtmlToReact from "html-to-react"

import Layout from "../templates/layout"

import "./404.sass"

const HTR = new HtmlToReact.Parser()

const NFQuery = graphql`
  query {
    wpquery {
      pages(where: { name: "not-found" }) {
        nodes {
          id
          title
          seo
          content
        }
      }
    }
  }
`

const Error404 = ({ wpquery, location, ...rest }) => {
  const { title, id, content, seo } = wpquery.pages.nodes[0]

  return (
    <Layout seo={seo} location={location}>
      {HTR.parse(content)}
    </Layout>
  )
}

export default ({ location, ...rest }) => {
  return (
    <StaticQuery
      query={NFQuery}
      render={query => <Error404 location={location} {...query} {...rest} />}
    />
  )
}
