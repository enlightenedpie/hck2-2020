import React from "react"
import { Link } from "gatsby"
import { Transition, Spring } from "react-spring/renderprops"
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
        <p>{stat.icon}</p>
        <p>{stat.data}</p>
        <p>{stat.label}</p>
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
            <aside className={styles.csStats}>
              <Transition
                items={items}
                keys={item => item.key}
                from={{ transform: "translate3d(0,-40px,1px)" }}
                enter={{ transform: "translate3d(0,0px,1px)" }}
                leave={{ transform: "translate3d(0,-40px,1px)" }}
              >
                {item => props => item}
              </Transition>
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
