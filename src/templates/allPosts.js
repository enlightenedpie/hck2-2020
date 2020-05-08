import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"
import HtmlToReact from "html-to-react"
import Layout from "./layout"
import Media6040 from "../components/Media6040"

import styles from "./landings.module.sass"

const HTR = new HtmlToReact.Parser()

const fetchMore = async (cursor, slug, qty = 12) => {
  let query = `query ($cursor: String!, $slug: ID!, $qty: Int!) {
    category(id: $slug, idType: SLUG) {
      posts(first: $qty, after: $cursor, , where: {status: PUBLISH}) {
        pageInfo {
          hasNextPage
          endCursor
          startCursor
        }
        nodes {
          title
        }
      }
    }
  }`

  return await fetch("https://admin.hck2.com/wp/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { cursor, slug, qty },
    }),
  })
    .then(res => res.json())
    .then(q => q)
}

export default ({
  data: {
    wpquery: {
      category: {
        seo,
        description,
        name,
        slug,
        posts: { pageInfo, nodes: posts },
      },
    },
  },
}) => {
  let heroes = [],
    others = []

  /* useEffect(async () => {
    if (posts.pageInfo.hasNextPage) console.log(await fetchMore(posts.pageInfo.endCursor,slug))
  },[]) */

  posts.map((post, ind) => {
    if (ind < 3) heroes.push(post)
  })

  return (
    <Layout seo={seo} bodyClass="landing blog-news-media">
      <section className={styles.landingIntro}>
        <div>
          <h1>{name}</h1>
        </div>
      </section>
      <section className={styles.heroes}>
        <Media6040 data={heroes} />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($slug: ID!) {
    wpquery {
      category(id: $slug, idType: SLUG) {
        seo
        description
        name
        slug
        posts(first: 11, where: { status: PUBLISH }) {
          pageInfo {
            hasNextPage
            endCursor
            startCursor
          }
          nodes {
            id
            title
            uri
            excerpt
            slug
            seo
            featuredImage {
              title
              srcSet
              sourceUrl
              mimeType
              link
              altText
            }
          }
        }
      }
    }
  }
`
