import React, { useEffect } from "react"
import { Link } from "gatsby"

import SVG from "../SVG"
import MainNav from "./MainNav"
import SocialNav from "./SocialNav"
import Hamburger from "./Hamburger"

import styles from "./header.module.sass"
import "./mobilemenu.sass"
import "./header.sticky.sass"

const toggleMenu = () => document.body.classList.toggle("menu-open")

export default props => {
  useEffect(() => {
    const attachOnScroll = () => {
      if (window.scrollY < 450) {
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
      <menu
        className={styles.headerMenu + " node--siteMenu"}
        onClick={toggleMenu}
      >
        <MainNav xtraClass={styles.slideLink} />
      </menu>
      <div className={styles.logoBox}>
        <Link to={`/`}>
          <SVG.LogoNoText />
        </Link>
      </div>
      <SocialNav xtraClass={styles.snHeader} />
      <Hamburger toggleMenu={toggleMenu} />
    </header>
  )
}
