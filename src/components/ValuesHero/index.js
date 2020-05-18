import React from "react"
import Img from "gatsby-image"
import parse from "html-react-parser"
import ScrollEffect from "react-animate-on-scroll"
import SVG from "../SVG"
import { kebabToCamel } from "../../utils"

import styles from "./valuesHero.module.sass"

export default ({
  content,
  title,
  slug,
  featuredImage: {
    altText: alt,
    imageFile: { childImageSharp },
  },
}) => {
  let Icon = SVG[kebabToCamel(slug)]
  return (
    <article className={[styles.valuesHero].join(" ")}>
      <Img
        style={{ position: "", overflow: "" }}
        imgStyle={{
          position: "",
          top: "",
          left: "",
          transition: "",
          opacity: "",
          objectPosition: "",
          objectFit: "",
          height: "",
          width: "",
        }}
        className={["hero", styles.valuesHeroImg].join(" ")}
        alt={alt}
        {...childImageSharp}
      />
      <div className={styles.overlay}>
        <div>
          <ScrollEffect
            className={styles.scroller}
            duration={1}
            animateOnce
            animateIn="valuesIn"
          >
            <Icon />
          </ScrollEffect>
          <ScrollEffect duration={1} animateOnce animateIn="valuesIn">
            <h2>{parse(title)}</h2>
          </ScrollEffect>
          <ScrollEffect duration={1} animateOnce animateIn="valuesIn">
            {parse(content)}
          </ScrollEffect>
        </div>
      </div>
    </article>
  )
}
