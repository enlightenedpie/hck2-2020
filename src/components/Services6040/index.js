import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import ScrollEffect from "react-animate-on-scroll"
import parse from "html-react-parser"
import Button from "../Button"
import SVG from "../SVG"
import { kebabToCamel, imageDefaults } from "../../utils"

import h6040 from "../h6040.module.sass"
import "../h6040anim.sass"

const query = graphql`
  query {
    wpquery {
      services(where: { orderby: TERM_ID }) {
        nodes {
          name
          uri
          description
          id
          databaseId
          seo
          slug
          taxonomyFeaturedImage {
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

const Services6040 = ({ data }) => {
  let orderBy = [
    "marketing-strategy",
    "creative",
    "digital-social",
    "pr",
    "web",
  ]
  data.sort(el => orderBy.indexOf(el.slug))
  return (
    <section className={[h6040.container, "h6040container"].join(" ")}>
      {data.map((item, i) => {
        let Icon = SVG[kebabToCamel(item.slug)],
          {
            taxonomyFeaturedImage: {
              featuredImage: {
                altText: alt,
                imageFile: { childImageSharp },
              },
            },
          } = item

        return (
          <div key={item.id}>
            <aside>
              <ScrollEffect duration="1" animateOnce animateIn="h6040slide">
                <Img
                  loading="auto"
                  className={[h6040.h6040img, "hero"].join(" ")}
                  alt={alt}
                  {...imageDefaults}
                  {...childImageSharp}
                />
              </ScrollEffect>
            </aside>
            <article>
              <i className="icon">
                <Icon />
              </i>
              <h2>{parse(item.name)}</h2>
              <div-spacer />
              <p>{parse(item.description)}</p>
              <Link to={item.uri}>
                <Button size="sm">Read More</Button>
              </Link>
            </article>
          </div>
        )
      })}
    </section>
  )
}

export default props => {
  return (
    <StaticQuery
      query={query}
      render={query => (
        <Services6040 {...props} data={query.wpquery.services.nodes} />
      )}
    />
  )
}
