import React from "react"
import HtmlToReact from "html-to-react"
//import { graphql } from "gatsby"

import Layout from "./layout"

import styles from "./single.module.sass"

const HTR = new HtmlToReact.Parser()

export default ({ pathContext: post }) => {
  let { featuredImage: image, content, seo } = post

  return (
    <Layout bodyClass="single single-post" seo={seo}>
      <section className={styles.singleStage}>
        {/* Hero image goes here */}
      </section>
      <section className={styles.singleContent}>{HTR.parse(content)}</section>
    </Layout>
  )
}
