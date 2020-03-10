import React from "react"

import Header from "../components/global/Header"
import Footer from "../components/global/Footer"

export default ({ title, children, ...props }) => {
  return (
    <>
      <Header {...props} />
      <main id="node--content-wrapper" className="site-main">
        {children}
      </main>
      <Footer {...props} />
    </>
  )
}
