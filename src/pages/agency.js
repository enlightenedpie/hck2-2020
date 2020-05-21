import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import parse from "html-react-parser"
import Layout from "../templates/layout"
import Testimonials from "../components/Testimonials"
import Button from "../components/Button"
import SVG from "../components/SVG"

import styles from "./agency.module.sass"

const AgencyPage = ({
  props,
  wpquery: {
    page: {
      id,
      title,
      seo,
      content,
      featuredImage: {
        altText: alt,
        imageFile: { childImageSharp },
      },
      childPages: { nodes: childPages },
    },
  },
}) => {
  let cpLeadership = childPages[0],
    {
      content: cpContent,
      title: cpTitle,
      featuredImage: {
        altText: cpAlt,
        imageFile: { childImageSharp: cpChildImageSharp },
      },
    } = cpLeadership

  return (
    <Layout bodyClass="landing agency" {...props} seo={seo}>
      <section className={styles.agencyIntro}>
        <div>
          <h1>{parse(title)}</h1>
          <div-spacer-white />
          {parse(content)}
        </div>
      </section>
      <section className={styles.content}>
        <Img
          loading="auto"
          alt={alt}
          style={{ order: 1 }}
          className={["square", styles.agencyImg].join(" ")}
          {...childImageSharp}
        />
        <article style={{ order: 2 }}>
          <div>
            <h2 className={styles.blue}>Who We Are</h2>
            <div-spacer />
            <p>
              HCK2 is a marketing communications agency that offers it all:
              creative advertising, design and branding, social media and
              digital communication, public relations, and web + interactive
              creation. All rooted in proven brand strategy - and focused on
              delivering measurable results.
            </p>
            <p>
              Invite us to serve as an extension of your team, and you'll get so
              much more than you ever imagined!
            </p>
          </div>
        </article>
        <div className={styles.valuesIcons}>
          <div className={styles.valueSquare}>
            <div>
              <SVG.charitableHearts />
              <h4>Charitable Hearts</h4>
            </div>
          </div>
          <div className={styles.valueSquare}>
            <div>
              <SVG.knowledgeSeekers />
              <h4>Knowledge Seekers</h4>
            </div>
          </div>
          <div className={styles.valueSquare}>
            <div>
              <SVG.ravingFans />
              <h4>Raving Fans</h4>
            </div>
          </div>
          <div className={styles.valueSquare}>
            <div>
              <SVG.balancedLife />
              <h4>Balanced Life</h4>
            </div>
          </div>
        </div>
        <article style={{ order: 3 }}>
          <div>
            <h2 className={styles.orange}>Our Values</h2>
            <div-spacer />
            <p>
              At HCK2, we embrace a culture that promotes giving back and paying
              it forward… continually expanding our knowledge and skills … going
              above and beyond to exceed expectations… all while understanding
              that our lives outside of work is what keeps us grounded, steady
              and ready to come back every day to give it our all.
            </p>
            <Link to="/values">
              <Button color="orange">Learn More</Button>
            </Link>
          </div>
        </article>
        <Img
          loading="auto"
          style={{ order: 5 }}
          alt={cpAlt}
          className={["square", styles.agencyImg].join(" ")}
          {...cpChildImageSharp}
        />
        <article style={{ order: 6 }}>
          <div>
            <h2 className={styles.green}>{parse(cpTitle)}</h2>
            <div-spacer />
            {parse(cpContent)}
            <Link to="/leadership">
              <Button color="green">Meet The Team</Button>
            </Link>
          </div>
        </article>
      </section>
      <Testimonials />
    </Layout>
  )
}

const agencyQuery = graphql`
  query {
    wpquery {
      page(id: "674", idType: DATABASE_ID) {
        id
        title
        seo
        content
        featuredImage {
          sourceUrl
          altText
          imageFile {
            childImageSharp {
              ...hck2FluidImage
            }
          }
        }
        childPages(where: { name: "leadership" }) {
          nodes {
            content
            title
            featuredImage {
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

export default ({ team, ...rest }) => {
  return (
    <StaticQuery
      query={agencyQuery}
      render={query => <AgencyPage team={team} {...query} {...rest} />}
    />
  )
}
