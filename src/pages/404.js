import React from "react"
import { graphql, StaticQuery } from "gatsby"
import HCK2 from "../utils/hck2"

import Layout from "../templates/layout"
import SEO from "../components/seo"

import "./404.sass"

const NFQuery = graphql`
  query {
    wpquery {
      pages(where: { name: "not-found" }) {
        nodes {
          id
          title
          seo
          contentData
        }
      }
    }
  }
`

const Error404 = ({ wpquery, location, ...rest }) => {
  const { title, description, contentData } = wpquery.pages.nodes[0]
  let cdata = JSON.parse(HCK2.html.entities.decode(contentData)),
    seo = {
      bodyClass: "page-404-notfound",
      title: title || "404: Not Found",
      description: description || "",
    }
  return (
    <Layout seo={seo} location={location} title={title}>
      {cdata.fourOHfour.map((noda, i) => {
        const Tag = noda.tagName
        return (
          <Tag
            data-key={(i + Math.random()) * 978473}
            key={(i + Math.random()) * 978473}
            {...noda.attributes}
          >
            {noda.contents}
          </Tag>
        )
      })}
    </Layout>
  )
}

export default ({ location, ...rest }) => {
  return (
    <StaticQuery
      query={NFQuery}
      render={query => <Error404 location={location} {...query} {...rest} />}
    />
  )
}
