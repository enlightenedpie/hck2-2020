import React from "react"
import parse from "html-react-parser"
import Layout from "./layout"
import ReqProp from "../components/ReqProp"
import Services6040 from "../components/Services6040"

import styles from "./landings.module.sass"

export default ({ pageContext: page }) => {
  let { seo, content, title } = page

  return (
    <Layout seo={seo} bodyClass="landing services">
      <section className={styles.landingIntro}>
        <div>
          <h1>{title}</h1>
          <div-spacer />
          {parse(content)}
          <ReqProp />
        </div>
      </section>
      <Services6040 />
    </Layout>
  )
}
