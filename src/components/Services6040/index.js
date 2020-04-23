import React from "react"
import { Link } from "gatsby"
import ScrollEffect from "react-animate-on-scroll"
import HtmlToReact from "html-to-react"

import Button from "../Button"

import h6040 from "../h6040.module.sass"
import "../h6040anim.sass"

const HTR = new HtmlToReact.Parser()

export default ({ data }) => {
  console.log(data)
  return (
    <section className={[h6040.container, "h6040container"].join(" ")}>
      {data.map((item, i) => {
        return (
          <div key={item.id}>
            <aside>
              <ScrollEffect duration=".5" animateOnce animateIn="h6040slide">
                <img
                  alt="image placeholder"
                  src="/assets/img/video-placeholder.jpg"
                />
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
