import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import SVG from "../SVG"
import MainNav from "./MainNav"
import SocialNav from "./SocialNav"
import Hamburger from "./Hamburger"

import styles from "./header.module.sass"
import "./mobilemenu.sass"
import "./header.sticky.sass"

const toggleMenu = (e, setToggled) => {
  document.body.classList.toggle("menu-open")
  return setToggled(document.body.classList.contains("menu-open"))
}

export default props => {
  let [toggled, setToggled] = useState(false)

  useEffect(() => {
    const attachOnScroll = () => {
      if (window.scrollY < 250) {
        document.documentElement.classList.remove("header-sticky")
        return false
      }

      document.documentElement.classList.add("header-sticky")
    }
    if (window.innerWidth > 1365)
      window.addEventListener("scroll", attachOnScroll)
  }, [])

  return (
    <header className={[styles.siteHeader, "siteHeader"].join(" ")}>
      <div
        className={[styles.headerMenu, "node--siteMenu"].join(" ")}
        onClick={e => toggleMenu(e, setToggled)}
      >
        <MainNav xtraClass={styles.slideLink} />
      </div>
      <div className={[styles.logoBox, "node--logoBox"].join(" ")}>
        <Link to={`/`}>
          <SVG.LogoNoText />
        </Link>
      </div>
      <SocialNav xtraClass={[styles.snHeader, "node--socialNav"].join(" ")} />
      <Hamburger
        toggled={toggled}
        toggleMenu={e => toggleMenu(e, setToggled)}
      />
    </header>
  )
}
