import React, { useEffect } from "react"
import { graphql, StaticQuery } from "gatsby"
import { library, dom } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import styles from "./socialnav.module.sass"

const socialQuery = graphql`
  query {
    wpquery {
      menus(where: { slug: "socialnav" }) {
        nodes {
          menuItems {
            nodes {
              cssClasses
              linkRelationship
              menuItemId
              url
              title
              label
            }
          }
        }
      }
    }
  }
`

const SocialNav = ({ socialNav, xtraClass, ...rest }) => {
  useEffect(() => {
    library.add(fab)
    dom.i2svg()
  })
  return (
    <nav className={[styles.socialNav, xtraClass].join(" ")}>
      {socialNav.map((noda, idx) => (
        <a href={noda.link} key={idx * 26}>
          <i className={"fab " + noda.label}></i>
        </a>
      ))}
    </nav>
  )
}

export default props => {
  return (
    <StaticQuery
      query={socialQuery}
      render={query => (
        <SocialNav
          {...props}
          socialNav={query.wpquery.menus.nodes[0].menuItems.nodes}
        />
      )}
    />
  )
}
