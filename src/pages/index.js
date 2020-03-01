import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../templates/layout"
import SEO from "../components/seo"

import styles from "./front.module.sass"

const FrontPage = ({ data }, location) => {
  const { title, description } = data.site.siteMetadata

  return (
    <Layout {...data} location={location} title={title}>
      <SEO
        title={title}
        keywords={[`devlog`, `blog`, `gatsby`, `javascript`, `react`]}
        description={description}
      />
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
  }
`

export default ({ location, ...rest }) => {
  return (
    <StaticQuery
      query={indexQuery}
      render={data => <FrontPage location={location} data={data} {...rest} />}
    />
  )
}
