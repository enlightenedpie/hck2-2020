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

  let splitTitle = title.split("|")

  let pageColor
  if (rest.databaseId % 3 == 0) {
    pageColor = styles.green
  } else if (rest.databaseId % 3 == 1) {
    pageColor = styles.blue
  } else {
    pageColor = styles.orange
  }

  return (
    <Layout bodyClass="single page-bio" {...props} seo={seo}>
      <section className={styles.content}>
        <div className={[styles.column, styles.left].join(" ")}>
          <div className={[styles.image_container, pageColor].join(" ")}>
            <div
              className={styles.image}
              style={
                !!rest.featuredImage
                  ? {
                      backgroundImage:
                        "url(" + rest.featuredImage.sourceUrl + ")",
                    }
                  : {
                      backgroundImage:
                        "url(https://admin.hck2.com/app/uploads/2020/04/Generic-Profile-Placeholder-v3.png)",
                    }
              }
            ></div>
          </div>
          <div className={[styles.water_cooler, styles.desktop].join(" ")}>
            <div className={styles.cooler_icon}>
              <SVG.waterCooler className={styles.icon} />
            </div>
            <div className={styles.cooler_copy}>
              <h2 className={pageColor}>Hanging at the water cooler</h2>
              {HTR.parse(rest.waterCooler)}
            </div>
          </div>
        </div>
        <div className={[styles.column, styles.right].join(" ")}>
          <div className={styles.content_container}>
            <h1 className={pageColor}>{splitTitle[0]}</h1>
            <h2 className={styles.gray}>
              {!!splitTitle[1] ? splitTitle[1] : ""}
            </h2>
            <div-spacer />
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
                <h2 className={pageColor}>Hanging at the water cooler</h2>
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
        databaseId
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
