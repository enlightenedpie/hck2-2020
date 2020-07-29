import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import styles from "./sharer.module.sass"

const ShareBug = ({ url = "https://www.hck2.com" }) => {
  let query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          shares {
            label
            icon
            link
            color
          }
        }
      }
    }
  `)

  let {
    site: {
      siteMetadata: { shares },
    },
  } = query

  return (
    <aside className={styles.sharer}>
      {shares.map(share => (
        <a
          title={"Share on " + share.label}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: share.color }}
          href={share.link + encodeURI(url)}
        >
          <i className={"fab fa-" + share.icon}></i>
        </a>
      ))}
    </aside>
  )
}

export default ShareBug
