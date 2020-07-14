import React from "react"
import { graphql, StaticQuery } from "gatsby"
import parse from "html-react-parser"
import ScrollEffect from "react-animate-on-scroll"
import Layout from "../templates/layout"
import SVG from "../components/SVG"
import CSHero from "../components/CaseStudyHero"
import Services6040 from "../components/Services6040"
import Testimonials from "../components/Testimonials"
import PromotedBlog from "../components/PromotedBlog"
import PromotedNews from "../components/PromotedNews"

import styles from "./front.module.sass"
import "./lineartanim.sass"

const FrontPage = ({ wpquery, location, ...rest }) => {
  let { content, seo, slug } = wpquery.page,
    { caseStudies } = wpquery

  return (
    <Layout seo={seo} bodyClass={slug} {...rest} location={location}>
      <section className={styles.stage_ATF}>
        {parse(content)}
        <div className={styles.lineArt}>
          <ScrollEffect animateOnce animateIn="drawLineArt">
            <SVG.allFive />
          </ScrollEffect>
        </div>
      </section>
      <section>
        <script src="https://snapwidget.com/js/snapwidget.js"></script>
        <iframe
          src="https://snapwidget.com/embed/849675"
          className="snapwidget-widget"
          allowTransparency="true"
          frameBorder="0"
          scrolling="no"
          style={{ border: "none", overflow: "hidden", width: "100%" }}
        ></iframe>
      </section>
      <section id="csFeature" className={styles.caseStudies_feature}>
        {caseStudies.nodes.map((noda, i) => (
          <CSHero hasMore={true} idx={i} key={noda.id} {...noda} />
        ))}
      </section>
      <Services6040 isFront={true} />
      <Testimonials />
      <section className={styles.blogMedia}>
        <PromotedBlog className={styles.blog} />
        <PromotedNews className={styles.news} />
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
          status
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
      page(id: "10", idType: DATABASE_ID) {
        uri
        id
        slug
        seo
        content
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
