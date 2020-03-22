import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../templates/layout"
import SVG from "../components/SVG"
import SEO from "../components/seo"
import CaseStudyHero from "../components/CaseStudyHero"

import styles from "./front.module.sass"

const FrontPage = ({ wpquery, location, ...rest }) => {
  const { title, description, contentData } = wpquery.pages.nodes[0]
  let cdata = JSON.parse(contentData)
  return (
    <Layout {...rest} location={location} title={title || ""}>
      <SEO
        bodyClass="page-front"
        title={title || ""}
        keywords={[`devlog`, `blog`, `gatsby`, `javascript`, `react`]}
        description={description || ""}
      />
      <section className={styles.stage_ATF}>
        <img loading="lazy" src="/assets/img/video-placeholder.jpg" />
        <div className={styles.stage_logoOverlay}>
          <SVG.logo />
        </div>
      </section>
      <section className={styles.callOutATF}>
        {cdata.callOutATF.map((noda, i) => {
          const Tag = noda.tagName
          return <Tag {...noda.attributes}>{noda.contents}</Tag>
        })}
        <div className={styles.lineArt}>
          <SVG.allFive />
        </div>
      </section>
      <section className={styles.caseStudies}>
        <CaseStudyHero bg="/assets/img/zix-corp.jpg" />
        <CaseStudyHero bg="/assets/img/emagispace.jpg" />
        <CaseStudyHero bg="/assets/img/austin-college.jpg" />
      </section>
      <section className={styles.testimonials}>
        <h3>Testimonials</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </p>
        <p>Name | Title | Company</p>
      </section>
      <section className={styles.blogMedia}>
        <div className={styles.blog}>
          <h4>Blog</h4>
        </div>
        <div className={styles.media}>
          <h4>Newsroom</h4>
        </div>
      </section>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    wpquery {
      pages(where: { name: "front-page" }) {
        nodes {
          uri
          id
          seo
          contentData
        }
      }
    }
  }
`

export default ({ location, ...rest }) => {
  return (
    <StaticQuery
      query={indexQuery}
      render={query => <FrontPage location={location} {...query} {...rest} />}
    />
  )
}
