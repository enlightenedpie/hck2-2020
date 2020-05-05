import React from "react"
import { Link } from "gatsby"
import ScrollEffect from "react-animate-on-scroll"

import Button from "../Button"

import styles from "./caseyjones.module.sass"

const defImg = {
  id: "",
  altText: "",
  sourceUrl: "",
  mimeType: "",
  srcSet: "",
}

export default ({
  isAtTop = false,
  hasMore = false,
  otherClass = "",
  link,
  title,
  client,
  stats,
  featuredImage,
  idx,
  ...rest
}) => {
  let colores = ["blue", "orange", "green"],
    { id, altText: alt, sourceUrl: src, mimeType: type, srcSet, ...all } =
      featuredImage || defImg,
    newId = "_csHero-" + id.replace("=", ""),
    items = []

  stats = JSON.parse(stats)

  stats.map((stat, i) => {
    items.push(
      <div key={"stat" + i + id}>
        <ScrollEffect duration={1} animateOnce animateIn="statsIn">
          {/* <p>{stat.icon}</p> */}
          <p>
            <strong>{stat.data}</strong>
          </p>
          <p>{stat.label}</p>
        </ScrollEffect>
      </div>
    )
    return stat
  })

  return (
    <article className={[styles.caseStudyHero, otherClass].join(" ")}>
      <picture className={styles.csHeroImg} id={newId}>
        <source type={type} alt={alt} srcSet={srcSet} {...all}></source>
        <img loading="lazy" src={src} alt={alt} />
      </picture>
      <div className={styles.informatic}>
        <div>
          <div>
            {isAtTop ? <h1>{client}</h1> : <h3>{client}</h3>}
            {isAtTop ? (
              <h2 className={styles[colores[idx]]}>{title}</h2>
            ) : (
              <h4 className={styles[colores[idx]]}>{title}</h4>
            )}
            <aside className={styles.csStats}>{items}</aside>
            {hasMore ? (
              <span className={styles.hasMore}>
                <Link to={link.replace("https://hck2.com", "")}>
                  <Button color="white">Read More</Button>
                </Link>
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
