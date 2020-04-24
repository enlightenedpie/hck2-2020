import React from "react"
import { graphql, StaticQuery } from "gatsby"
import HtmlToReact from "html-to-react"
import ScrollEffect from "react-animate-on-scroll"

import Layout from "../templates/layout"
import SVG from "../components/SVG"
import CSHero from "../components/CaseStudyHero"
import Services6040 from "../components/Services6040"
import PromotedBlog from "../components/PromotedBlog"
import PromotedNews from "../components/PromotedNews"

import styles from "./front.module.sass"
import "./lineartanim.sass"

const HTR = new HtmlToReact.Parser()

const FrontPage = ({ wpquery, location, ...rest }) => {
  let { content, seo, slug } = wpquery.pages.nodes[0],
    { caseStudies } = wpquery

  return (
    <Layout seo={seo} bodyClass={slug} {...rest} location={location}>
      <section className={styles.stage_ATF}>
        {HTR.parse(content)}
        <div className={styles.lineArt}>
          <ScrollEffect animateOnce animateIn="drawLineArt">
            <SVG.allFive />
          </ScrollEffect>
        </div>
      </section>
      <Services6040 />
      <section id="csFeature" className={styles.caseStudies_feature}>
        {caseStudies.nodes.map((noda, i) => (
          <CSHero hasMore={true} idx={i} key={noda.id} {...noda} />
        ))}
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
        <PromotedBlog className={styles.blog} />
        <PromotedNews className={styles.media} />
      </section>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    wpquery {
      caseStudies(first: 3, where: { isFeatured: true }) {
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
      pages(where: { name: "front-page" }) {
        nodes {
          uri
          id
          slug
          seo
          contentData
          content
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
