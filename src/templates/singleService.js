import React from "react"
import ScrollEffect from "react-animate-on-scroll"
import parse from "html-react-parser"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "./layout"
import CSHero from "../components/CaseStudyHero"
import SVG from "../components/SVG"
import ReqProp from "../components/ReqProp"
import { kebabToCamel, stripSite, imageDefaults } from "../utils"

import styles from "./singleService.module.sass"
import "../pages/lineartanim.sass"

export default ({
  data: {
    wpquery: {
      service: {
        subtitle,
        description,
        seo,
        name,
        slug,
        taxonomyFeaturedImage: {
          featuredImage: {
            altText: servAlt,
            imageFile: { childImageSharp: servImg },
          },
        },
        caseStudies: { nodes: caseStudies },
      },
    },
  },
}) => {
  let Icon = SVG[kebabToCamel(slug)]

  let heroes = []
  let others = []

  caseStudies.map((noda, i) => {
    let { altText: alt, imageFile } = noda.featuredImage

    if (i < 3) {
      heroes.push(<CSHero hasMore={true} idx={i + 1} key={noda.id} {...noda} />)
    } else {
      let { childImageSharp } = imageFile
      others.push(
        <Link to={stripSite(noda.link)}>
          <case-study-card>
            <Img
              alt={alt}
              className={[styles.csImg, "square"].join(" ")}
              {...imageDefaults}
              {...childImageSharp}
            />
            <h3>{parse(noda.client)}</h3>
            <em>{parse(noda.title)}</em>
          </case-study-card>
        </Link>
      )
    }

    return noda
  })

  return (
    <Layout seo={seo}>
      <section className={styles.ssIntro}>
        <Img alt={servAlt} {...imageDefaults} className="hero" {...servImg} />
        <aside>
          <i className="icon single">
            <ScrollEffect animateOnce animateIn="drawLineArtSingle">
              <Icon />
            </ScrollEffect>
          </i>
          <h1>{parse(name)}</h1>
        </aside>
      </section>
      <section className={styles.ssContent}>
        <h2>{subtitle}</h2>
        <div-spacer-white />
        <p>{parse(description)}</p>
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
        description
        id
        slug
        name
        seo
        taxonomyFeaturedImage {
          featuredImage {
            id
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                ...hck2FluidImage
              }
            }
          }
        }
        caseStudies(first: 1000) {
          nodes {
            link
            title
            client
            stats
            featuredImage {
              id
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  ...hck2FluidImage
                }
              }
            }
          }
        }
      }
    }
  }
`
