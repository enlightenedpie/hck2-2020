import React from "react"
import ScrollEffect from "react-animate-on-scroll"
import HtmlToReact from "html-to-react"
import { graphql } from "gatsby"

import Layout from "./layout"
import SVG from "../components/SVG"
import { kebabToCamel } from "../utils"

import styles from "./singleService.module.sass"
import "../pages/lineartanim.sass"

const HTR = new HtmlToReact.Parser()

export default ({
  data: {
    wpquery: {
      service: { description, seo, name, slug, featuredImg },
    },
  },
}) => {
  let Icon = SVG[kebabToCamel(slug)]

  return (
    <Layout seo={seo}>
      <section className={styles.ssIntro}>
        {featuredImg ? (
          HTR.parse(featuredImg)
        ) : (
          <img
            alt="HCK2 marketing experts discussing next steps on an awesome brand strategy!"
            src="/assets/img/video-placeholder.jpg"
          />
        )}
        <article>
          <i className="icon single">
            <ScrollEffect animateOnce animateIn="drawLineArtSingle">
              <Icon />
            </ScrollEffect>
          </i>
          <h1>{HTR.parse(name)}</h1>
        </article>
      </section>
      <section>
        <div-spacer />
        <p>{HTR.parse(description)}</p>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($id: ID!) {
    wpquery {
      service(id: $id, idType: DATABASE_ID) {
        description
        slug
        count
        uri
        name
        id
        seo
        featuredImg
        caseStudies {
          nodes {
            title
          }
        }
      }
    }
  }
`
