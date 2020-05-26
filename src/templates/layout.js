import React from "react"
import { graphql } from "gatsby"
import PageTransition from "gatsby-v2-plugin-page-transitions"
import SEO from "../components/seo"
import Header from "../components/global/Header"
import Footer from "../components/global/Footer"

export const fluidFragment = graphql`
  fragment hck2FluidImage on ImageSharp {
    fluid(
      maxWidth: 1920
      srcSetBreakpoints: [1600, 1366, 1024, 768, 576]
      quality: 50
    ) {
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
`

export default ({ seo, bodyClass, children, ...props }) => {
  seo = JSON.parse(seo)
  return (
    <PageTransition>
      <SEO {...seo} bodyClass={bodyClass} />
      <Header {...props} />
      <main role="main" id="node--content-wrapper" className="site-main">
        {children}
      </main>
      <Footer {...props} />
    </PageTransition>
  )
}
