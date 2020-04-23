import React from "react"
import HtmlToReact from "html-to-react"
import { Link } from "gatsby"

import Layout from "./layout"
import Services6040 from "../components/Services6040"

import styles from "./allServices.module.sass"

const HTR = new HtmlToReact.Parser()

export default ({ pageContext: page }) => {
  let {
    services,
    seo,
    contentData,
    content,
    title,
    status,
    featuredImage,
  } = page

  contentData = JSON.parse(contentData)
  seo = JSON.parse(seo)

  return (
    <Layout seo={seo} title={title || "work page"}>
      <section className={styles.asIntro}>
        <div>
          <h1>{title}</h1>
          <div-spacer />
          {HTR.parse(content)}
        </div>
      </section>
      <Services6040 data={services} />
    </Layout>
  )
}
