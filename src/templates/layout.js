import React from "react"
import PageTransition from "gatsby-plugin-page-transitions"
import SEO from "../components/seo"
import Header from "../components/global/Header"
import Footer from "../components/global/Footer"

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
