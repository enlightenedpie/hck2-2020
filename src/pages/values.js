import React from "react"
import { graphql, StaticQuery } from "gatsby"
import parse from "html-react-parser"
import Layout from "../templates/layout"
import ValuesHero from "../components/ValuesHero"

import styles from "../templates/landings.module.sass"

const valuesQuery = graphql`
  query {
    wpquery {
      page(id: "759", idType: DATABASE_ID) {
        id
        seo
        content
        title
        childPages(where: { orderby: { field: MENU_ORDER, order: ASC } }) {
          nodes {
            content
            slug
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

const ValuesPage = ({ wpquery: { page }, location, ...rest }) => {
  let {
    id,
    seo,
    content,
    title,
    childPages: { nodes: childPages },
  } = page

  return (
    <Layout seo={seo} bodyClass={"landing core-values"}>
      <section id={id} className={styles.landingIntro}>
        <div>
          <h1>{title}</h1>
          <div-spacer />
          {parse(content)}
        </div>
      </section>
      <section>
        {childPages.map(cp => (
          <ValuesHero {...cp} />
        ))}
      </section>
    </Layout>
  )
}

export default ({ location, ...rest }) => {
  return (
    <StaticQuery
      query={valuesQuery}
      render={query => <ValuesPage location={location} {...query} {...rest} />}
    />
  )
}
