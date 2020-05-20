import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import parse from "html-react-parser"
import ScrollEffect from "react-animate-on-scroll"

import Button from "../Button"
import { stripSite, imageDefaults } from "../../utils"

import styles from "./caseyjones.module.sass"

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
  let {
      id,
      altText: alt,
      imageFile: { childImageSharp },
    } = featuredImage,
    colores = ["blue", "orange", "green"],
    newId = "_csHero-" + id.replace("=", ""),
    items = []

  stats = JSON.parse(stats)

  stats.map((stat, i) => {
    items.push(
      <div key={"stat" + i + id}>
        <ScrollEffect duration={1} animateOnce animateIn="statsIn">
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
    <article
      id={newId}
      className={[styles.caseStudyHero, otherClass].join(" ")}
    >
      <Img
        loading="auto"
        className="hero"
        alt={alt}
        {...childImageSharp}
        {...imageDefaults}
      />
      <div className={styles.informatic}>
        <div>
          <div>
            {isAtTop ? <h1>{parse(client)}</h1> : <h3>{parse(client)}</h3>}
            {isAtTop ? (
              <h2 className={styles[colores[idx]]}>{parse(title)}</h2>
            ) : (
              <h4 className={styles[colores[idx]]}>{parse(title)}</h4>
            )}
            <aside className={styles.csStats}>{items}</aside>
            {hasMore ? (
              <span className={styles.hasMore}>
                <Link to={stripSite(link)}>
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
