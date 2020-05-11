import React from "react"
import ScrollEffect from "react-animate-on-scroll"
import HtmlToReact from "html-to-react"
import { Link, graphql } from "gatsby"

import Layout from "./layout"
import CSHero from "../components/CaseStudyHero"
import SVG from "../components/SVG"
import ReqProp from "../components/ReqProp"
import { kebabToCamel, stripSite } from "../utils"

import styles from "./singleService.module.sass"
import "../pages/lineartanim.sass"

const HTR = new HtmlToReact.Parser()

export default ({
  data: {
    wpquery: {
      service: {
        subtitle,
        description,
        seo,
        name,
        slug,
        featuredImg,
        caseStudies: { nodes: caseStudies },
      },
    },
  },
}) => {
  let Icon = SVG[kebabToCamel(slug)]

  let heroes = []
  let others = []

  caseStudies.map((noda, i) => {
    let { altText: alt, sourceUrl: src, ...fi } = noda.featuredImage
    if (i < 3) {
      heroes.push(<CSHero hasMore={true} idx={i + 1} key={noda.id} {...noda} />)
    } else {
      others.push(
        <Link to={stripSite(noda.link)}>
          <case-study-card>
            <picture>
              <img src={src} alt={alt} {...fi} />
            </picture>
            <h3>{HTR.parse(noda.title)}</h3>
            <em>{HTR.parse(noda.client)}</em>
          </case-study-card>
        </Link>
      )
    }
    return noda
  })

  return (
    <Layout seo={seo}>
      <section className={styles.ssIntro}>
        {featuredImg ? (
          HTR.parse(featuredImg)
        ) : (
          <img
            loading="lazy"
            alt="HCK2 marketing experts discussing next steps on an awesome brand strategy!"
            src="/assets/img/video-placeholder.jpg"
          />
        )}
        <aside>
          <i className="icon single">
            <ScrollEffect animateOnce animateIn="drawLineArtSingle">
              <Icon />
            </ScrollEffect>
          </i>
          <h1>{HTR.parse(name)}</h1>
        </aside>
      </section>
      <section className={styles.ssContent}>
        <h2>{subtitle}</h2>
        <div-spacer-white />
        <p>{HTR.parse(description)}</p>
        <ReqProp />
      </section>
      <section className={styles.ssCaseStudies}>
        {heroes}
        <div className={styles.theOthers}>{others}</div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($id: ID!) {
    wpquery {
      service(id: $id, idType: DATABASE_ID) {
        subtitle
        featuredImg
        description
        id
        slug
        name
        seo
        caseStudies(first: 1000) {
          nodes {
            link
            title
            client
            stats
            featuredImage {
              altText
              id
              srcSet
              title
              sourceUrl
              mimeType
            }
          }
        }
      }
    }
  }
`
