import React from "react"
import HtmlToReact from "html-to-react"
//import { graphql } from "gatsby"

import Layout from "./layout"

import styles from "./single.module.sass"

const HTR = new HtmlToReact.Parser()

export default ({ pageContext: post }) => {
  let {
    featuredImage: image,
    content,
    seo,
    title,
    catSlug,
    date,
    author: { name },
  } = post

  let dateString = new Date(date).toDateString()

  return (
    <Layout bodyClass="single single-post" seo={seo}>
      <article>
        <figure className={styles.singleFeatured}>
          {/* Hero image goes here */}
        </figure>
        <section className={styles.singleContent}>
          <h1>{title}</h1>
          <time pubDate={true} dateTime={date}>
            {dateString}
          </time>
          <address class="author">{name}</address>
          <div className={styles.mainContent}>{HTR.parse(content)}</div>
        </section>
      </article>
    </Layout>
  )
}
