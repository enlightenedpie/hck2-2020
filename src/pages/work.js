import React from "react"

import Layout from "../templates/layout"
import SEO from "../components/seo"

import styles from "./work.module.sass"

const WorkPage = props => {
  return (
    <Layout {...props} title={"work page"}>
      <SEO
        bodyClass="page-work"
        title={"work page"}
        keywords={[`devlog`, `blog`, `gatsby`, `javascript`, `react`]}
        description={"work page"}
      />
      <section className={styles.work}>{"werk werk werk werk werk"}</section>
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
