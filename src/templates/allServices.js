import React from "react"
import HtmlToReact from "html-to-react"
import Layout from "./layout"
import ReqProp from "../components/ReqProp"
import Services6040 from "../components/Services6040"

import styles from "./allServices.module.sass"

const HTR = new HtmlToReact.Parser()

export default ({ pageContext: page }) => {
  let { seo, content, title, featuredImage } = page

  return (
    <Layout seo={seo} bodyClass="landing services">
      <section className={styles.asIntro}>
        <div>
          <h1>{title}</h1>
          <div-spacer />
          {HTR.parse(content)}
          <ReqProp />
        </div>
      </section>
      <Services6040 />
    </Layout>
  )
}
