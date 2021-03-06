import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"

import stylings from "./testimonials.module.sass"

export default props => {
  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          separator
        }
      }
      wpquery {
        testimonials(where: { isFeatured: true }, first: 6) {
          nodes {
            title
            content
            organization
            jobTitle
          }
        }
      }
    }
  `)

  const carouselOptions = {
    naturalSlideWidth: 100,
    naturalSlideHeight: 100,
    infinite: true,
    isPlaying: true,
    interval: 10000,
    transitionTime: 250,
    isIntrinsicHeight: true,
  }

  let {
      wpquery: {
        testimonials: { nodes: testimonials },
      },
    } = query,
    {
      site: {
        siteMetadata: { separator },
      },
    } = query

  let slides = []

  testimonials.map((test, i) => {
    let { title, content, organization, jobTitle } = test
    slides.push(
      <Slide index={i}>
        {parse(content)}
        <p>
          {title} {separator} {jobTitle} {separator} {organization}
        </p>
      </Slide>
    )
    return test
  })

  return (
    <section className={stylings.headLikeAHole}>
      <h3>Testimonials</h3>
      <CarouselProvider {...carouselOptions} totalSlides={slides.length}>
        <Slider className="sliderComp">{slides}</Slider>
        <DotGroup />
      </CarouselProvider>
    </section>
  )
}
