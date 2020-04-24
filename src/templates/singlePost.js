import React from "react"
import HtmlToReact from "html-to-react"
//import { graphql } from "gatsby"

import Layout from "./layout"

import styles from "./single.module.sass"

const HTR = new HtmlToReact.Parser()

export default ({ pathContext: post }) => {
  let { featuredImage: image, title, content } = post,
    seo = `{
      title: title,
      bodyClass: "single single-post",
    }`
  return (
    <Layout title={title} {...seo}>
      <section className={styles.singleStage}>
        {/* Hero image goes here */}
      </section>
      <section className={styles.singleContent}>{HTR.parse(content)}</section>
    </Layout>
  )
}
