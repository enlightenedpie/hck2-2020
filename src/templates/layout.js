import React from "react"
import PageTransition from "gatsby-plugin-page-transitions"
import SEO from "../components/seo"
import Header from "../components/global/Header"
import Footer from "../components/global/Footer"

export default ({ seo, children, ...props }) => {
  return (
    <PageTransition>
      <SEO {...seo} />
      <Header {...props} />
      <main id="node--content-wrapper" className="site-main">
        {children}
      </main>
      <Footer {...props} />
    </PageTransition>
  )
}
