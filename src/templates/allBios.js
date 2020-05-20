import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import parse from "html-react-parser"
import ScrollEffect from "react-animate-on-scroll"
import Layout from "./layout"
import SVG from "../components/SVG"
import { stripSite, imageDefaults } from "../utils"

import styles from "./landings.module.sass"
import bioStyles from "./allBios.module.sass"

export default ({ pageContext: { bios } }) => {
  let cards = []

  bios.map((bio, idx) => {
    let {
      altText: alt,
      imageFile: { childImageSharp },
    } = bio.featuredImage

    let splitTitle = bio.title.split(" | ")
    cards.push(
      <ScrollEffect
        style={{ animationDelay: (idx + 1) * 50 + "ms" }}
        duration=".5"
        animateOnce
        animateIn="h6040fade"
      >
        <Link to={stripSite(bio.uri)}>
          <case-study-card>
            {alt ? (
              <Img
                loading="auto"
                className={[bioStyles.bioImg, "square"].join(" ")}
                alt={alt}
                {...childImageSharp}
                {...imageDefaults}
              />
            ) : (
              <picture>
                <SVG.LogoNoText />
              </picture>
            )}
            <h3>{parse(splitTitle[0])}</h3>
            <em>{parse(splitTitle[1])}</em>
          </case-study-card>
        </Link>
      </ScrollEffect>
    )
    return bio
  })
  return (
    <Layout seo={"{}"} bodyClass="landing bios">
      <section className={styles.landingIntro}>
        <div>
          <h1>The HCK2 Leadership Team</h1>
          <div-spacer />
          <p>
            Meet our executive leadership team. International agencies and
            boutiques. Fortune 500 and start-ups. Government and non-profits. We
            represent experience - and some good stories too - from all and draw
            upon this experience to guide and inspire.
          </p>
        </div>
      </section>
      <section
        className={[
          styles.contentCardContainer,
          styles.landingsContentMedia,
          bioStyles.bioCards,
        ].join(" ")}
      >
        {cards}
      </section>
    </Layout>
  )
}
