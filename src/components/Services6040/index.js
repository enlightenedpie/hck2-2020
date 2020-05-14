import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import ScrollEffect from "react-animate-on-scroll"
import parse from "html-react-parser"

import Button from "../Button"
import SVG from "../SVG"
import ResponsiveImg from "../ResponsiveImg"
import { kebabToCamel } from "../../utils"

import h6040 from "../h6040.module.sass"
import "../h6040anim.sass"

const query = graphql`
  query {
    wpquery {
      services {
        nodes {
          name
          uri
          description
          id
          databaseId
          seo
          featuredImg
          slug
        }
      }
    }
  }
`

const Services6040 = ({ data }) => {
  return (
    <section className={[h6040.container, "h6040container"].join(" ")}>
      {data.map((item, i) => {
        let Icon = SVG[kebabToCamel(item.slug)]

        return (
          <div key={item.id}>
            <aside>
              <ScrollEffect duration="1" animateOnce animateIn="h6040slide">
                {item.featuredImg ? (
                  <ResponsiveImg>{parse(item.featuredImg)}</ResponsiveImg>
                ) : (
                  <ResponsiveImg
                    altText="HCK2 marketing experts discussing next steps on an awesome brand strategy!"
                    sourceUrl="/assets/img/video-placeholder.jpg"
                  />
                )}
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
