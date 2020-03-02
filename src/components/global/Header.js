import React, { useEffect, useState } from "react"
import { Link, graphql, StaticQuery } from "gatsby"

import SVG from "../SVG"
import SocialNav from "./SocialNav"
import Hamburger from "./Hamburger"

import styles from "./header.module.sass"
import "./mobilemenu.sass"
import "./header.sticky.sass"

const headerQuery = graphql`
  query {
    site {
      siteMetadata {
        menus {
          mainNav {
            label
            link
          }
        }
      }
    }
  }
`

const toggleMenu = () => document.body.classList.toggle("menu-open")

const Header = ({ menus }) => {
  let { mainNav } = menus
  let [stHea, setStHea] = useState(false)

  useEffect(() => {
    const attachOnScroll = () => {
      if (window.scrollY < 400) {
        document.body.classList.remove("header-sticky")
        setStHea(false)
        return false
      }

      document.body.classList.add("header-sticky")
      setStHea(true)
    }
    if (window.innerWidth > 576)
      window.addEventListener("scroll", attachOnScroll)
  }, [])

  return (
    <header
      className={[styles.siteHeader, "siteHeader", stHea ? " sticky" : ""].join(
        " "
      )}
    >
      <menu
        className={styles.headerMenu + " node--siteMenu"}
        onClick={toggleMenu}
      >
        <nav onClick={e => e.stopPropagation()}>
          {mainNav.map((node, idx) => (
            <Link className={styles.slideLink} to={node.link} key={idx * 25}>
              {node.label}
            </Link>
          ))}
        </nav>
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

export default props => {
  return (
    <StaticQuery
      query={headerQuery}
      render={query => <Header {...query.site.siteMetadata} />}
    />
  )
}
