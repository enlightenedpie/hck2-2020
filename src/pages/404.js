import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../templates/layout"
import SEO from "../components/seo"

import styles from "./404.module.sass"

const NFQuery = graphql`
  query {
    wpquery {
      pages(where: { name: "not-found" }) {
        nodes {
          id
          title
          seo
          contentData
        }
      }
    }
  }
`

const Error404 = props => {
  console.log(props)
  return (
    <Layout location={props.location} title={"404: Not Found"}>
      <SEO title="404: Not Found" />
      {}
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
