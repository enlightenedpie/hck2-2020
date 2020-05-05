import React from "react"
import HtmlToReact from "html-to-react"
import _ from "lodash"
import { Link, graphql } from "gatsby"

import Layout from "./layout"
import CSHero from "../components/CaseStudyHero"

import styles from "./singleCaseStudy.module.sass"
import "./blockContent.sass"

const HTR = new HtmlToReact.Parser()

export default ({
  data: {
    wpquery: { caseStudy },
    site: {
      siteMetadata: { separator },
    },
  },
  ...props
}) => {
  let {
    content,
    seo,
    termNames,
    termSlugs,
    services: { nodes: services },
    ...rest
  } = caseStudy

  return (
    <Layout seo={seo} bodyClass="single single-case-study">
      <article role="article">
        <CSHero
          isAtTop={true}
          otherClass={styles.singleCaseStudyHero}
          idx={1}
          {...rest}
        />
        <aside className={styles.csTags}>
          <span>
            {services.map((serv, i) => (
              <Link to={serv.uri}>
                {_.unescape(serv.name) + (services.length - 1 > i ? ", " : "")}
              </Link>
            ))}
          </span>
          <span>{termNames && separator}</span>
          <span>{termNames && termNames.join(", ")}</span>
        </aside>
        <section className={[styles.contentArea, "contentArea"].join(" ")}>
          {HTR.parse(content)}
        </section>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($id: ID!) {
    wpquery {
      caseStudy(id: $id, idType: DATABASE_ID) {
        databaseId
        uri
        content
        title
        seo
        client
        stats
        status
        termNames(taxonomies: TAG)
        termSlugs(taxonomies: TAG)
        services {
          nodes {
            name
            uri
          }
        }
        featuredImage {
          uri
          title
          srcSet
          sourceUrl
          sizes
          mediaType
          mimeType
          id
          databaseId
          altText
        }
      }
    }
    site {
      siteMetadata {
        separator
      }
    }
  }
`
