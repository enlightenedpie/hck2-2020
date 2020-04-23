import React from "react"
import { graphql, StaticQuery } from "gatsby"
import HtmlToReact from "html-to-react"
import ScrollEffect from "react-animate-on-scroll"

import Layout from "../templates/layout"
import SVG from "../components/SVG"
import SEO from "../components/seo"
import CSHero from "../components/CaseStudyHero"
import Services6040 from "../components/Services6040"
import PromotedBlog from "../components/PromotedBlog"
import PromotedNews from "../components/PromotedNews"

import styles from "./front.module.sass"
import "./lineartanim.sass"

const HTR = new HtmlToReact.Parser()

const videoAtts = {
  poster: "/assets/img/video-placeholder.jpg",
  playsInline: true,
  loop: true,
  muted: true,
  autoPlay: true,
}

const FrontPage = ({ wpquery, location, ...rest }) => {
  let { title, description, contentData, content } = wpquery.pages.nodes[0],
    { caseStudies } = wpquery,
    cdata = JSON.parse(contentData)
  return (
    <Layout {...rest} location={location} title={title || ""}>
      <SEO
        bodyClass="page-front"
        title={title || ""}
        keywords={[`devlog`, `blog`, `gatsby`, `javascript`, `react`]}
        description={description || ""}
      />
      <section className={styles.stage_ATF}>
        {HTR.parse(content)}
        {/* <video {...videoAtts}>
          <source type="video/mp4" src={cdata.stage}></source>
          Your browser doesn't support embedded videos.
        </video>
      </section>
      <section className={styles.callOutATF}>
        {cdata.callOutATF.map((noda, i) => {
          const Tag = noda.tagName
          return <Tag {...noda.attributes}>{noda.contents}</Tag>
        })} */}
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
