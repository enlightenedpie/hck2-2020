import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import ScrollEffect from "react-animate-on-scroll"
import parse from "html-react-parser"
import Button from "../Button"
import { stripSite, imageDefaults } from "../../utils"

import h6040 from "../h6040.module.sass"
import "../h6040anim.sass"

export default ({ data }) => {
  return (
    <section className={[h6040.container, "h6040container"].join(" ")}>
      {data.map((item, i) => {
        let {
          featuredImage: {
            altText: alt,
            imageFile: { childImageSharp },
          },
        } = item
        return (
          <div key={item.id}>
            <aside>
              <ScrollEffect duration="1" animateOnce animateIn="h6040slide">
                <Img
                  className={[h6040.h6040img].join(" ")}
                  alt={alt}
                  {...imageDefaults}
                  {...childImageSharp}
                />
              </ScrollEffect>
            </aside>
            <article>
              <h2>{parse(item.title)}</h2>
              <div-spacer />
              <p>{parse(item.excerpt)}</p>
              <Link to={stripSite(item.uri)}>
                <Button size="sm">Read More</Button>
              </Link>
            </article>
          </div>
        )
      })}
    </section>
  )
}
