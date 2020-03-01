import React, { useState } from "react"
import { Link } from "gatsby"

import Header from "../components/global/Header"
import Footer from "../components/global/Footer"

const Layout = ({ title, children, ...props }) => {
  const [toggleNav, setToggleNav] = useState(false)
  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
      <Header {...props} />
      <main id="node--content-wrapper" className="site-main">
        {children}
      </main>
      <Footer {...props} />
    </div>
  )
}

export default Layout
