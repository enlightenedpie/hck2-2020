import React from "react"
import HtmlToReact from "html-to-react"
import { graphql } from "gatsby"

import Layout from "./layout"

const HTR = new HtmlToReact.Parser()

export default ({ data }) => {
  let service = data.wpquery.service,
    seo = {
      title: ["Our Expertise:", service.name].join(" "),
      description: service.description,
    }

  return (
    <Layout seo={seo}>
      <p>{HTR.parse(service.description)}</p>
    </Layout>
  )
}

export const query = graphql`
  query($id: ID!) {
    wpquery {
      service(id: $id, idType: DATABASE_ID) {
        description
        slug
        count
        uri
        name
        id
        caseStudies {
          nodes {
            title
          }
        }
      }
    }
  }
`
