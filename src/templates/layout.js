import React from "react"
import PageTransition from "gatsby-plugin-page-transitions"
import { ParallaxProvider } from "react-scroll-parallax"
import Header from "../components/global/Header"
import Footer from "../components/global/Footer"

export default ({ title, children, ...props }) => {
  return (
    <ParallaxProvider>
      <PageTransition>
        <Header {...props} />
        <main id="node--content-wrapper" className="site-main">
          {children}
        </main>
        <Footer {...props} />
      </PageTransition>
    </ParallaxProvider>
  )
}
