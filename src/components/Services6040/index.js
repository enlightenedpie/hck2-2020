import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import ScrollEffect from "react-animate-on-scroll"
import HtmlToReact from "html-to-react"

import Button from "../Button"

import h6040 from "../h6040.module.sass"
import "../h6040anim.sass"

const HTR = new HtmlToReact.Parser()

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
        }
      }
    }
  }
`

const Services6040 = ({ data }) => {
  return (
    <section className={[h6040.container, "h6040container"].join(" ")}>
      {data.map((item, i) => {
        return (
          <div key={item.id}>
            <aside>
              <ScrollEffect duration="1" animateOnce animateIn="h6040slide">
                {item.featuredImg ? (
                  HTR.parse(item.featuredImg)
                ) : (
                  <img
                    alt="image placeholder"
                    src="/assets/img/video-placeholder.jpg"
                  />
                )}
              </ScrollEffect>
            </aside>
            <article>
              <i className="icon"></i>
              <h2>{HTR.parse(item.name)}</h2>
              <div-spacer />
              <p>{HTR.parse(item.description)}</p>
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
