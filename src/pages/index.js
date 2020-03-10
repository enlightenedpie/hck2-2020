import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../templates/layout"
import SVG from "../components/SVG"
import SEO from "../components/seo"
import CaseStudyHero from "../components/CaseStudyHero"

import styles from "./front.module.sass"

const FrontPage = ({ wpquery, location, ...rest }) => {
  const { title, description } = wpquery.generalSettings
  return (
    <Layout {...rest} location={location} title={title}>
      <SEO
        title={title}
        keywords={[`devlog`, `blog`, `gatsby`, `javascript`, `react`]}
        description={description}
      />
      <section className={styles.stage_ATF}>
        <img loading="lazy" src="/assets/img/video-placeholder.jpg" />
        <div className={styles.stage_logoOverlay}>
          <SVG.logo />
        </div>
      </section>
      <section className={styles.callOut_ATF}>
        <h1>Discover. Imagine. Create.</h1>
        <p>
          Whether you’re ready to launch a new company, take your existing
          enterprise to the next level or revitalize your brand to compete more
          effectively in today’s market, you’ve come to the right place.
        </p>
        <p>
          HCK2 is a full-service marketing agency that can bring together the
          ideal combination of creative concepts and design, interactive
          experiences, digital communication, public relations and media to help
          you get noticed – and get results.
        </p>
        <p>
          Come discover our difference. Imagine the possibilities. And let’s
          create something powerful together.
        </p>
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
      generalSettings {
        description
        title
        language
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
