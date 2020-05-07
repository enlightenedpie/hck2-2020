import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import HtmlToReact from "html-to-react"
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
          url,
          childItems: { nodes: chilrens },
          ...rest
        } = noda
        const key = ((idx + 1) * 25 * Math.random()).toString(16)

        let theAtts = {
          key: key,
          className: []
            .concat(
              [xtraClass, "node--menuItem " + menuItemId + "__itemID_" + key],
              cssClasses
            )
            .join(" "),
          title: HTR.parse(title),
          to: url,
          href: url,
          rel: rel,
          ...rest,
        }

        if (url === "#") theAtts.onClick = e => e.preventDefault()

        let TheLink = url === "#" ? "a" : Link

        return (
          <TheLink {...theAtts}>
            {label}
            {chilrens.length > 0 && (
              <div>
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
