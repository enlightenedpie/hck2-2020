import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import parse from "html-react-parser"

import "./clacc.sass"

export default props => {
  const data = useStaticQuery(graphql`
    query {
      wpquery {
        tags(first: 500) {
          nodes {
            slug
            name
            caseStudies(first: 500, where: { status: PUBLISH }) {
              nodes {
                client
              }
            }
          }
        }
      }
    }
  `)

  let {
      wpquery: {
        tags: { nodes: tags },
      },
    } = data,
    collection = {},
    [active, setActive] = useState("")

  for (var i = 0; i < tags.length; i++) {
    if (active === "" && i === 0) {
      setActive(tags[0].slug)
      break
    }
    collection[tags[i].slug] = {
      name: tags[i].name,
      list: [],
    }
    tags[i].caseStudies.nodes.map(cs => {
      collection[tags[i].slug].list.push(cs.client)
      return cs
    })
  }

  return (
    <dl className="clacc">
      {Object.keys(collection).map((key, ind) => {
        return (
          <>
            <dt
              onClick={e => {
                setActive(key)
              }}
              className={active === key ? "active" : ""}
            >
              {parse(collection[key].name)}
            </dt>
            <dd>
              {collection[key].list.map(val => (
                <p>{val}</p>
              ))}
            </dd>
          </>
        )
      })}
    </dl>
  )
}
