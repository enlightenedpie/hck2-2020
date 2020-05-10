import React, { useState } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import HtmlToReact from "html-to-react"
import ScrollEffect from "react-animate-on-scroll"
import Layout from "../templates/layout"
import { stripSite } from "../utils"

import styles from "../templates/landings.module.sass"

const HTR = new HtmlToReact.Parser()

const defImg = {
  altText: "",
  sourceUrl: "",
  mimeType: "",
  srcSet: "",
}

const csQuery = graphql`
  query {
    wpquery {
      caseStudies(first: 1000) {
        nodes {
          link
          title
          client
          services {
            nodes {
              slug
              name
            }
          }
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
      page(id: "814", idType: DATABASE_ID) {
        uri
        id
        title
        slug
        seo
        content
      }
    }
  }
`

const CaseStudies = ({
  wpquery: {
    page,
    caseStudies: { nodes: caseStudies },
  },
}) => {
  let { content, id, seo, title } = page,
    others = [],
    services = {},
    [active, setActive] = useState("")

  caseStudies.map((caseStudy, i) => {
    let { altText: alt, srcSet, sourceUrl: src, mimeType: type } =
      caseStudy.featuredImage || defImg

    let servs = caseStudy.services.nodes.map(serv => {
      services[serv.slug] = serv.name
      return serv.slug
    })

    if (!active || servs.indexOf(active) < 0) {
      others.push(
        <ScrollEffect
          style={{ animationDelay: (i + 1) * 50 + "ms" }}
          duration="1"
          animateOnce
          animateIn="h6040fade"
        >
          <Link to={stripSite(caseStudy.link)}>
            <case-study-card>
              <picture>
                <source type={type} alt={alt} srcSet={srcSet}></source>
                <img loading="lazy" src={src} alt={alt} />
              </picture>
              <h3>{HTR.parse(caseStudy.title)}</h3>
            </case-study-card>
          </Link>
        </ScrollEffect>
      )
    }

    return caseStudy
  })

  return (
    <Layout seo={seo} bodyClass="landing case-studies">
      <section id={id} className={styles.landingIntro}>
        <div>
          <h1>{title}</h1>
          <div-spacer />
          {HTR.parse(content)}
        </div>
      </section>
      <section className={styles.serviceFilter}>
        <div>Filter Work By: </div>
        <div className={styles.selectWrapper}>
          <select
            name="serviceLines"
            onChange={e => {
              others = []
              setActive(e.target.value)
            }}
          >
            <option selected disabled>
              Choose One...
            </option>
            <option value="">All Case Studies</option>
            {Object.keys(services)
              .sort()
              .map(slug => {
                return <option value={slug}>{HTR.parse(services[slug])}</option>
              })}
          </select>
        </div>
      </section>
      <section
        className={[styles.landingsContent, styles.contentCardContainer].join(
          " "
        )}
      >
        {others}
      </section>
    </Layout>
  )
}

export default ({ location, ...rest }) => {
  return (
    <StaticQuery
      query={csQuery}
      render={query => <CaseStudies location={location} {...query} {...rest} />}
    />
  )
}
