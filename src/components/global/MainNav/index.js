import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
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
            }
          }
        }
      }
    }
  }
`

const MainNav = ({ mainNav, xtraClass }) => {
  return (
    <nav onClick={e => e.stopPropagation()}>
      {mainNav.map((noda, idx) => {
        let {
          cssClasses,
          label,
          linkRelationship: rel,
          menuItemId,
          ...rest
        } = noda
        const key = window.btoa((idx + 1) * 25 * Math.random())
        return (
          <Link
            {...rest}
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