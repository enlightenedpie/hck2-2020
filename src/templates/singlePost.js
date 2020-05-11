import React from "react"
import HtmlToReact from "html-to-react"
import ScrollEffect from "react-animate-on-scroll"

import Layout from "./layout"
import SVG from "../components/SVG"

import styles from "./single.module.sass"
import "../components/h6040anim.sass"

const HTR = new HtmlToReact.Parser()

const defImg = {
  altText: "",
  databaseId: "",
  sourceUrl: "",
  mimeType: "",
  srcSet: "",
  title: "",
}

export default ({ pageContext: post }) => {
  let {
    featuredImage,
    content,
    seo,
    title,
    catSlug,
    date,
    author: { name },
  } = post

  let { mimeType, altText, sourceUrl, ...rest } = featuredImage || defImg

  let dateString = new Date(date).toLocaleDateString()

  return (
    <Layout bodyClass="single single-post" seo={seo}>
      <article>
        <figure className={[styles.singleFeatured].join(" ")}>
          <ScrollEffect duration="1" animateOnce animateIn="h6040slide">
            {sourceUrl ? (
              <img type={mimeType} alt={altText} src={sourceUrl} {...rest} />
            ) : (
              <aside className="h6040container">
                <SVG.LogoNoText />
              </aside>
            )}
          </ScrollEffect>
        </figure>
        <section className={styles.singleContent}>
          <h1>{HTR.parse(title)}</h1>
          <div className={styles.bug}>
            <time pubDate={true} dateTime={date}>
              {dateString}
            </time>
            <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
            <em class="author">{HTR.parse(name)}</em>
          </div>
          <div className={styles.mainContent}>{HTR.parse(content)}</div>
        </section>
      </article>
    </Layout>
  )
}
