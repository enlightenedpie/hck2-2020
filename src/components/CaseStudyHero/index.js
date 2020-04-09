import React from "react"
import { Link } from "gatsby"
import { Parallax } from "react-scroll-parallax"
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
    { id, altText: alt, sourceUrl: src, mimeType: type, ...fi } = featuredImage
  stats = JSON.parse(stats)
  let newId = "_csHero-" + id.replace("=", "")
  return (
    <article className={styles.caseStudyHero}>
      <picture className={styles.csHeroImg} id={newId}>
        <source type={type} alt={alt} type={type} {...fi}></source>
        <Parallax y={[-50, 50]}>
          <img src={src} alt={alt} />
        </Parallax>
      </picture>
      <div className={styles.informatic}>
        <div>
          <div>
            <h3>{client}</h3>
            <h4 className={styles[colores[idx]]}>{title}</h4>
            <aside className={styles.csStats}>
              {stats.map((stat, i) => {
                return (
                  <div key={"stat" + i + id}>
                    <p>{stat.icon}</p>
                    <p>{stat.data}</p>
                    <p>{stat.label}</p>
                  </div>
                )
              })}
            </aside>
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
