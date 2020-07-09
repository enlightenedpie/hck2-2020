import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import parse from "html-react-parser"
import ScrollEffect from "react-animate-on-scroll"
import Layout from "./layout"
import Media6040 from "../components/Media6040"
import SVG from "../components/SVG"
import Button from "../components/Button"
import { stripSite, imageDefaults } from "../utils"

import styles from "./landings.module.sass"

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
          id
          title
          uri
          excerpt
          slug
          seo
          featuredImage {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(maxWidth: 1920, srcSetBreakpoints: [1600, 1366, 1024, 768, 576], quality: 50) {
                  sizes
                  src
                  srcSet
                  srcSetWebp
                  srcWebp
                  base64
                  originalName
                  originalImg
                }
              }
            }
          }
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
  let [state, setState] = useState({}),
    [heroes, setHeroes] = useState([]),
    [others, setOthers] = useState([]),
    [remaining, setRemaining] = useState([])

  if (Object.keys(state).length === 0) {
    let oth,
      her = []

    oth = posts.filter((post, ind) =>
      ind < 3 ? her.push(post) && false : true
    )

    let firstOth = oth.slice(0, 8)

    if (heroes.length === 0) setHeroes(her)

    if (others.length === 0) setOthers(firstOth)

    if (remaining.length === 0) setRemaining(oth)

    setState(
      Object.assign(state, {
        ...pageInfo,
        morePosts: [],
      })
    )
  }

  return (
    <Layout seo={seo} bodyClass="landing blog-news-media">
      <section className={styles.landingIntro}>
        <div>
          <h1>{name}</h1>
          <div-spacer />
          <p>{parse(description)}</p>
        </div>
      </section>
      <section className={styles.heroes}>
        <Media6040 data={heroes} />
      </section>
      <section
        className={[
          styles.contentCardContainer,
          styles.landingsContentMedia,
        ].join(" ")}
      >
        {others.map((item, idx) => {
          let {
            altText: alt,
            imageFile: { childImageSharp },
          } = item.featuredImage
          return (
            <ScrollEffect
              style={{ animationDelay: (idx + 1) * 50 + "ms" }}
              duration=".5"
              animateOnce
              animateIn="h6040fade"
            >
              <Link to={stripSite(item.uri)}>
                <case-study-card>
                  {alt ? (
                    <Img
                      className={[styles.csImg].join(" ")}
                      alt={alt}
                      {...childImageSharp}
                      {...imageDefaults}
                    />
                  ) : (
                    <picture>
                      <SVG.LogoNoText />
                    </picture>
                  )}
                  <h3>{parse(item.title)}</h3>
                </case-study-card>
              </Link>
            </ScrollEffect>
          )
        })}
      </section>
      {remaining.length < 8 ? null : (
        <div
          style={{ padding: "2rem", background: "white", textAlign: "center" }}
        >
          <Button
            onClick={async e => {
              setOthers(remaining)
            }}
          >
            Load More Posts
          </Button>
        </div>
      )}
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
        posts(first: 2000, where: { status: PUBLISH }) {
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
