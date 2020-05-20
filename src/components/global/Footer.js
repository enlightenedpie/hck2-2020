import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"

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
          <nav
            role="navigation"
            aria-label="Footer"
            id="footernav"
            className={null}
          >
            <h5>Navigate</h5>
            <div>
              <MainNav inFooter={true} />
            </div>
          </nav>
          <div className={styles.hrContainer}>
            <hr />
          </div>
          <div>
            <h5>Contact Us</h5>
            <div>
              <OutboundLink href={"tel:" + phone.replace(/\.+/g, "")}>
                {phone}
              </OutboundLink>
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
            <h5>Stay Connected</h5>
            <Newsletter />
            <SocialNav xtraClass={styles.snFooter} />
            <div className={styles.endorsements}>
              <img
                alt="Women's Business Enterprise National Council"
                src="/assets/wben-org-header.png"
              />
              <img
                alt="State of Texas Historically Underutilized Business"
                src="/assets/hub.png"
              />
            </div>
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
