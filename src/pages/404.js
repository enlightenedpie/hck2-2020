import React from "react"
import { graphql, StaticQuery } from "gatsby"
import parse from "html-react-parser"

import Layout from "../templates/layout"

import "./404.sass"

const NFQuery = graphql`
  query {
    wpquery {
      page(id: "58", idType: DATABASE_ID) {
        id
        title
        seo
        content
      }
    }
  }
`

const Error404 = ({ wpquery: { page }, location, ...rest }) => {
  const { title, content, seo } = page

  return (
    <Layout seo={seo} location={location} bodyClass="404 not-found">
      <h1>{title}</h1>
      {parse(content)}
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
