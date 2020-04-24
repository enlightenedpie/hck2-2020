import React from "react"

import Layout from "../templates/layout"

import styles from "./work.module.sass"

const WorkPage = props => {
  return (
    <Layout {...props} seo={"{}"}>
      <section className={styles.work}>{"Media"}</section>
    </Layout>
  )
}

export default WorkPage

/* const indexQuery = graphql`
  query {
    wpquery {
      pages(where: { name: "front-page" }) {
        nodes {
          uri
          id
          seo
          contentData
        }
      }
    }
  }
`

export default ({ location, ...rest }) => {
  return (
    <StaticQuery
      query={indexQuery}
      render={query => <FrontPage location={location} {...query} {...rest} />}
    />
  )
} */
