import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"

import SVG from "../SVG"
import Newsletter from "./Newsletter"
import MainNav from "./MainNav"
import SocialNav from "./SocialNav"

import styles from "./footer.module.sass"

const footerQuery = graphql`
  query {
    site {
      siteMetadata {
        address
        phone
      }
    }
  }
`

const Footer = ({ siteMetadata }) => {
  let { address, phone } = siteMetadata

  return (
    <>
      <footer className={styles.siteFooter}>
        <div className={styles.left}>
          <nav id="footernav" className={null}>
            <h4>Navigate</h4>
            <div>
              <MainNav />
              <Link to={"/contact"}>contact us</Link>
            </div>
          </nav>
          <div className={styles.hrContainer}>
            <hr />
          </div>
          <div>
            <h4>Contact Us</h4>
            <div>
              <a href={"tel:" + phone.replace(/\.+/g, "")}>{phone}</a>
              <address>{address}</address>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.logo}>
            <Link to={`/`}>
              <SVG.logo />
            </Link>
          </div>
          <div>
            <h4>Stay Connected</h4>
            <Newsletter />
            <SocialNav xtraClass={styles.snFooter} />
          </div>
        </div>
        <copy-right>
          &copy; {new Date().getFullYear()} HCK2 Partners, All Rights Reserved.
        </copy-right>
      </footer>
    </>
  )
}

export default props => {
  return (
    <StaticQuery
      query={footerQuery}
      render={data => <Footer {...data.site} />}
    />
  )
}
