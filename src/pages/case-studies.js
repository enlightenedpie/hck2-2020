import React, { useState } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import parse from "html-react-parser"
import ScrollEffect from "react-animate-on-scroll"
import { stripSite, imageDefaults } from "../utils"

import Layout from "../templates/layout"
import ClientsAccordion from "../components/ClientsAccordion"

import styles from "../templates/landings.module.sass"

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
    services = {},
    [active, setActive] = useState(""),
    others = caseStudies.filter((caseStudy, i) => {
      if (active === "") return true
      let servs = []

      caseStudy.services.nodes.map(serv => servs.push(serv.slug))

      return servs.includes(active)
    })

  caseStudies.map((caseStudy, i) => {
    caseStudy.services.nodes.map(serv => {
      services[serv.slug] = serv.name
      return serv.slug
    })
    return caseStudy
  })

  return (
    <Layout seo={seo} bodyClass="landing case-studies">
      <section id={id} className={styles.landingIntro}>
        <div>
          <h1>{title}</h1>
          <div-spacer />
          {parse(content)}
        </div>
      </section>
      <section className={styles.serviceFilter}>
        <div>
          <div>Filter Work By: </div>
          <div className={styles.selectWrapper}>
            <select
              name="serviceLines"
              onChange={e => {
                e.target.blur()
              }}
              onBlur={e => {
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
                  return <option value={slug}>{parse(services[slug])}</option>
                })}
            </select>
          </div>
        </div>
      </section>
      <section
        className={[styles.landingsContent, styles.contentCardContainer].join(
          " "
        )}
      >
        {others.map((caseStudy, i) => {
          let {
            altText: alt,
            imageFile: { childImageSharp },
          } = caseStudy.featuredImage

          return (
            <ScrollEffect
              style={{ animationDelay: (i + 1) * 25 + "ms" }}
              duration=".5"
              animateOnce
              animateIn="h6040fade"
            >
              <Link to={stripSite(caseStudy.link)}>
                <case-study-card>
                  <Img
                    alt={alt}
                    className={[styles.csImg].join(" ")}
                    {...imageDefaults}
                    {...childImageSharp}
                  />
                  <h3>{parse(caseStudy.client)}</h3>
                  <em>{parse(caseStudy.title)}</em>
                </case-study-card>
              </Link>
            </ScrollEffect>
          )
        })}
        <div className={styles.clientAccordion}>
          <h2>Clients We Serve</h2>
          <ClientsAccordion />
        </div>
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
