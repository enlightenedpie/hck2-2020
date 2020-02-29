import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"

import SVG from "../SVG"
import Newsletter from "./Newsletter"

import styles from "./footer.module.sass"

const footerQuery = graphql`
  query {
    site {
      siteMetadata {
        address
        phone
      }
      menus {
        mainNav {
          label
          link
        }
      }
    }
  }
`

const Footer = ({ menus, siteMetadata }) => {
  let { mainNav, social } = menus,
    { address, phone } = siteMetadata
  return (
    <>
      <footer className={styles.siteFooter}>
        <div className={styles.left}>
          <nav id="footernav" className={null}>
            <h4>Navigate</h4>
            <div>
              {mainNav.map((node, idx) => (
                <Link to={node.link} key={idx * 25}>
                  {node.label}
                </Link>
              ))}
              <Link to={"/contact-us"}>contact us</Link>
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
          <div>
            <Link to={`/`}>
              <SVG.logo />
            </Link>
          </div>
          <div>
            <h4>Stay Connected</h4>
            <Newsletter />
            <nav>
              {social.map((node, idx) => (
                <a href={node.link} key={idx * 26}>
                  <i className={"fab fa-" + node.label}></i>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
      <copy-right>
        &copy; {new Date().getFullYear()} HCK2 Partners, All Rights Reserved.
      </copy-right>
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
