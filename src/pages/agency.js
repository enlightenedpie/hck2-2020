import React from "react"

import Layout from "../templates/layout"
import Testimonials from "../components/Testimonials"

import styles from "./work.module.sass"

const WorkPage = props => {
  return (
    <Layout bodyClass="page-work" {...props} seo={"{}"}>
      <section className={styles.work}>{"Agency"}</section>
      <Testimonials />
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
