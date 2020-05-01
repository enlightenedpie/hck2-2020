import React from "react"
import HtmlToReact from "html-to-react"
import Layout from "./layout"

import styles from "./landings.module.sass"

const HTR = new HtmlToReact.Parser()

export default ({ pageContext: page }) => {
  let { seo, content, title, caseStudies } = page
  console.log(caseStudies)
  return (
    <Layout seo={seo} bodyClass="landing case-studies">
      <section className={styles.landingIntro}>
        <div>
          <h1>{title}</h1>
          <div-spacer />
          {HTR.parse(content)}
        </div>
      </section>
      <section className={styles.serviceFilter}>
        <div className={styles.selectWrapper}>
          <select name="serviceLines">
            <option value="general">General Information</option>
            <option value="rfp">Request for Proposal</option>
            <option value="career">Career Opportunities</option>
          </select>
        </div>
      </section>
      <section className={styles.landingsContent}></section>
    </Layout>
  )
}
