import React from "react"
import { Link } from "gatsby"
import ScrollEffect from "react-animate-on-scroll"
import parse from "html-react-parser"
import Button from "../Button"
import ResponsiveImg from "../ResponsiveImg"
import { stripSite } from "../../utils"

import h6040 from "../h6040.module.sass"
import "../h6040anim.sass"

export default ({ data }) => {
  return (
    <section className={[h6040.container, "h6040container"].join(" ")}>
      {data.map((item, i) => {
        return (
          <div key={item.id}>
            <aside>
              <ScrollEffect duration="1" animateOnce animateIn="h6040slide">
                {item.featuredImage ? (
                  <ResponsiveImg {...item.featuredImage} />
                ) : (
                  <ResponsiveImg
                    altText="HCK2 marketing experts discussing next steps on an awesome brand strategy!"
                    sourceUrl="/assets/img/video-placeholder.jpg"
                  />
                )}
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
