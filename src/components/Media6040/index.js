import React from "react"
import { Link } from "gatsby"
import ScrollEffect from "react-animate-on-scroll"
import HtmlToReact from "html-to-react"

import Button from "../Button"
import ResponsiveImg from "../ResponsiveImg"
import { stripSite } from "../../utils"

import h6040 from "../h6040.module.sass"
import "../h6040anim.sass"

const HTR = new HtmlToReact.Parser()

export default ({ data }) => {
  return (
    <section className={[h6040.container, "h6040container"].join(" ")}>
      {data.map((item, i) => {
        return (
          <div key={item.id}>
            <aside>
              <ScrollEffect duration="1" animateOnce animateIn="h6040slide">
                {item.featuredImage ? (
                  <ResponsiveImg>{HTR.parse(item.featuredImage)}</ResponsiveImg>
                ) : (
                  <ResponsiveImg
                    altText="HCK2 marketing experts discussing next steps on an awesome brand strategy!"
                    sourceUrl="/assets/img/video-placeholder.jpg"
                  />
                )}
              </ScrollEffect>
            </aside>
            <article>
              <h2>{HTR.parse(item.title)}</h2>
              <div-spacer />
              <p>{HTR.parse(item.excerpt)}</p>
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
