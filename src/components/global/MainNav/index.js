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
        return (
          <Link
            {...rest}
            className={[]
              .concat(
                [
                  xtraClass,
                  "node--menuItem " +
                    menuItemId +
                    "__itemID_" +
                    btoa((idx + 1) * 25 * Math.random()),
                ],
                cssClasses
              )
              .join(" ")}
            rel={rel}
            to={noda.url}
            key={idx * 25 * Math.random()}
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
