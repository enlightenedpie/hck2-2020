import React from "react"
import parse from "html-react-parser"
import ScrollEffect from "react-animate-on-scroll"

import Layout from "./layout"
import SVG from "../components/SVG"
import Sharer from "../components/SocialSharer"

import styles from "./single.module.sass"
import "../components/h6040anim.sass"

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
    link,
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
          <Sharer url={link} />
          <h1>{parse(title)}</h1>
          {/* <div className={styles.bug}>
            <time pubDate={true} dateTime={date}>
              {dateString}
            </time>
            <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
            <em class="author">{parse(name)}</em>
          </div> */}
          <div className={styles.mainContent}>{parse(content)}</div>
        </section>
      </article>
    </Layout>
  )
}
