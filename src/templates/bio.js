import React from "react"
import HtmlToReact from "html-to-react"
import { Link, graphql } from "gatsby"

import Layout from "../templates/layout"
import SVG from "../components/SVG"
import styles from "./bio.module.sass"

const HTR = new HtmlToReact.Parser()

// const BioPage = props => {
export default ({
  data: {
    wpquery: { teamMember },
  },
  ...props
}) => {
  let { title, content, seo, ...rest } = teamMember

  console.log(rest)
  let splitTitle = title.split("|")

  return (
    <Layout bodyClass="page-bio" {...props} seo={"{}"}>
      <div className={styles.temp_spacer}></div>
      <section className={styles.content}>
        <div className={[styles.column, styles.left].join(" ")}>
          <div className={[styles.image_container, styles.green].join(" ")}>
            {!!rest.featuredImage && (
              <div
                className={styles.image}
                style={{
                  backgroundImage: "url(" + rest.featuredImage.sourceUrl + ")",
                }}
              ></div>
            )}
          </div>
          <div className={[styles.water_cooler, styles.desktop].join(" ")}>
            <div className={styles.cooler_icon}>
              <SVG.waterCooler className={styles.icon} />
            </div>
            <div className={styles.cooler_copy}>
              <h2 className={styles.green}>Hanging at the water cooler</h2>
              {HTR.parse(rest.waterCooler)}
            </div>
          </div>
        </div>
        <div className={[styles.column, styles.right].join(" ")}>
          <div className={styles.content_container}>
            <h1 className={styles.green}>{splitTitle[0]}</h1>
            <h2 className={styles.gray}>
              {!!splitTitle[1] ? splitTitle[1] : ""}
            </h2>
            <hr />
            <div className={styles.main_copy}>{HTR.parse(content)}</div>
            {!!rest.quote && (
              <div className={styles.quote}>
                <h2 className={styles.orange}>Favorite Quote</h2>
                <blockquote>{HTR.parse(rest.quote)}</blockquote>
                {!!rest.quoteAuthor && <p>- {HTR.parse(rest.quoteAuthor)}</p>}
              </div>
            )}
            <div className={[styles.water_cooler, styles.mobile].join(" ")}>
              <div className={styles.cooler_icon}>
                <SVG.creative className={styles.icon} />
              </div>
              <div className={styles.cooler_copy}>
                <h2 className={styles.green}>Hanging at the water cooler</h2>
                {HTR.parse(rest.waterCooler)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

// export default BioPage

export const query = graphql`
  query($id: ID!) {
    wpquery {
      teamMember(id: $id, idType: DATABASE_ID) {
        content
        title
        seo
        featuredImage {
          uri
          title
          srcSet
          sourceUrl
          sizes
          mediaType
          mimeType
          id
          altText
        }
        waterCooler
        quote
        quoteAuthor
      }
    }
  }
`
