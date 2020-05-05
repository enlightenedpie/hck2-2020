import React, { useState } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import HtmlToReact from "html-to-react"
import Layout from "../templates/layout"
import { kebabToCamel, stripSite } from "../utils"

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
    [active, setActive] = useState("")

  caseStudies.map(caseStudy => {
    let { altText: alt, srcSet, sourceUrl: src, mimeType: type } =
      caseStudy.featuredImage || defImg
    others.push(
      <Link to={stripSite(caseStudy.link)}>
        <case-study-card>
          <picture>
            <source type={type} alt={alt} srcSet={srcSet}></source>
            <img loading="lazy" src={src} alt={alt} />
          </picture>
          <h3>{caseStudy.title}</h3>
        </case-study-card>
      </Link>
    )
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
          <select name="serviceLines">
            <option value="general">General Information</option>
            <option value="rfp">Request for Proposal</option>
            <option value="career">Career Opportunities</option>
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
