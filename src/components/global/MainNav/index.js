import React, { useEffect, useState } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import parse from "html-react-parser"
import styles from "./mainnav.module.sass"
import { library, dom } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"

const mainQuery = graphql`
  query {
    site {
      siteMetadata {
        address
        phone
      }
    }
    wpquery {
      menus(where: { slug: "mainnav" }) {
        nodes {
          menuItems {
            nodes {
              cssClasses
              linkRelationship
              menuItemId
              url
              title
              label
              childItems {
                nodes {
                  label
                  linkRelationship
                  target
                  title
                  url
                  cssClasses
                }
              }
            }
          }
        }
      }
    }
  }
`

const MainNav = ({
  inFooter = false,
  site: {
    siteMetadata: { address, phone },
  },
  mainNav,
  xtraClass,
}) => {
  useEffect(() => {
    library.add(fas)
    dom.i2svg()
  })

  let [active, setActive] = useState("")

  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      onClick={e => e.stopPropagation()}
      className={inFooter ? "inFooter" : ""}
    >
      {mainNav.map((noda, idx) => {
        let {
          cssClasses,
          label,
          linkRelationship: rel,
          menuItemId,
          title,
          url,
          childItems: { nodes: chilrens },
          ...rest
        } = noda
        const key = ((idx + 1) * 25 * Math.random()).toString(16)

        let theAtts = {
          key: key,
          className: []
            .concat(
              [
                chilrens.length > 0 ? "hasSubnav" : null,
                active === title ? "active" : null,
                xtraClass,
                "node--menuItem " + menuItemId + "__itemID_" + key,
              ],
              cssClasses
            )
            .join(" "),
          title: parse(title),
          to: url,
          href: url,
          rel: rel,
          activeClassName: "isActive",
          onClick: e => {
            if (window.innerWidth > 576 || chilrens.length == 0) return true

            if (active == title) return true

            setActive(title)

            e.preventDefault()
          },
          ...rest,
        }

        if (url === "#") theAtts.onClick = e => e.preventDefault()

        let TheLink = url === "#" ? "a" : Link

        return (
          <TheLink {...theAtts}>
            {label}
            {chilrens.length > 0 && (
              <div className={inFooter ? "desktop-hidden" : "subnav"}>
                <span>
                  {chilrens.map((chld, index) => {
                    let key2 = ((index + 1) * 25 * Math.random()).toString(16)
                    let {
                      cssClasses: cssClasses2,
                      label: label2,
                      linkRelationship: rel,
                      url: url2,
                      ...rust
                    } = chld
                    return (
                      <Link
                        key={key2}
                        {...rust}
                        to={url2}
                        className={cssClasses2.join(" ")}
                      >
                        {label2}
                      </Link>
                    )
                  })}
                </span>
              </div>
            )}
          </TheLink>
        )
      })}
      {!inFooter && (
        <address className={[styles.mobileInfo, "desktop-hidden"].join(" ")}>
          <p>
            <a href={"tel:" + phone}>
              <i class="fas fa-phone"></i>
              <span>{phone}</span>
            </a>
          </p>
          <p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=3875%20Ponte%20Ave.%2C%20Addison%2C%20Tx%2075001"
              target="_blank"
            >
              <i class="fas fa-map-marker-alt"></i>
              <span>{address}</span>
            </a>
          </p>
        </address>
      )}
    </nav>
  )
}

export default props => {
  return (
    <StaticQuery
      query={mainQuery}
      render={query => (
        <MainNav
          {...props}
          mainNav={query.wpquery.menus.nodes[0].menuItems.nodes}
          site={query.site}
        />
      )}
    />
  )
}
