import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import HtmlToReact from "html-to-react"
import _ from "lodash"
import "./mainnav.module.sass"

const mainQuery = graphql`
  query {
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
                  menuItemId
                  target
                  title
                  url
                  description
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

const HTR = new HtmlToReact.Parser()

const MainNav = ({ mainNav, xtraClass }) => {
  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      onClick={e => e.stopPropagation()}
    >
      {mainNav.map((noda, idx) => {
        let {
          cssClasses,
          label,
          linkRelationship: rel,
          menuItemId,
          title,
          childItems,
          ...rest
        } = noda
        const key = ((idx + 1) * 25 * Math.random()).toString(16)
        return (
          <Link
            {...rest}
            title={HTR.parse(title)}
            className={[]
              .concat(
                [xtraClass, "node--menuItem " + menuItemId + "__itemID_" + key],
                cssClasses
              )
              .join(" ")}
            rel={rel}
            to={noda.url}
            key={key}
          >
            {label}
          </Link>
        )
      })}
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
        />
      )}
    />
  )
}
