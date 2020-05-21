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
      service(id: "marketing-strategy", idType: SLUG) {
        name
        extraCopy {
          frontPageCopy
          landingPageCopy
        }
        description
      }
      services(where: { exclude: "10", orderby: SLUG }) {
        nodes {
          name
          uri
          description
          id
          databaseId
          seo
          slug
          extraCopy {
            frontPageCopy
            landingPageCopy
          }
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

const Services6040 = ({ isFront = false, isLanding = false, data }) => {
  let i = 0
  data.sort((el1, el2) => {
    console.log(i++)
  })
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

        let theCopy = isFront
          ? item.extraCopy.frontPageCopy || item.description
          : isLanding
          ? item.extraCopy.landingPageCopy || item.description
          : item.description

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
              <p>{parse(theCopy)}</p>
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
