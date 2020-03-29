import React from "react"
import { Link } from "gatsby"
import RellaxWrapper from "react-rellax-wrapper"
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
  return (
    <article className={styles.caseStudyHero}>
      <picture
        className={styles.csHeroImg}
        id={"_csHero-" + id.replace("=", "")}
      >
        <source type={type} alt={alt} type={type} {...fi}></source>
        <RellaxWrapper speed={-7} percentage={0.75}>
          <img src={src} alt={alt} />
        </RellaxWrapper>
      </picture>
      <div className={styles.informatic}>
        <h3>{client}</h3>
        <h4 className={styles[colores[idx]]}>{title}</h4>
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
    </article>
  )
}
