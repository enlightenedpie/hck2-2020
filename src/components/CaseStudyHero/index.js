import React from "react"
import { Link } from "gatsby"
import ScrollEffect from "react-animate-on-scroll"

import Button from "../Button"

import styles from "./caseyjones.module.sass"

export default ({
  hasMore = false,
  link,
  title,
  client,
  stats,
  featuredImage,
  idx,
  ...rest
}) => {
  let colores = ["default", "orange", "green"],
    { id, altText: alt, sourceUrl: src, mimeType: type, ...fi } = featuredImage,
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
  })

  return (
    <article className={styles.caseStudyHero}>
      <picture className={styles.csHeroImg} id={newId}>
        <source type={type} alt={alt} type={type} {...fi}></source>
        <img loading="lazy" src={src} alt={alt} />
      </picture>
      <div className={styles.informatic}>
        <div>
          <div>
            <h3>{client}</h3>
            <h4 className={styles[colores[idx]]}>{title}</h4>
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
