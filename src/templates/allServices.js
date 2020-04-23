import React from "react"
import HtmlToReact from "html-to-react"
import { Link } from "gatsby"

import Layout from "./layout"
import Button from "../components/Button"
import Services6040 from "../components/Services6040"

import styles from "./allServices.module.sass"

const HTR = new HtmlToReact.Parser()

export default ({ pageContext: page }) => {
  let { seo, content, title, featuredImage } = page

  seo = JSON.parse(seo)

  return (
    <Layout seo={seo} title={title || "work page"}>
      <section className={styles.asIntro}>
        <div>
          <h1>{title}</h1>
          <div-spacer />
          {HTR.parse(content)}
          <Link to="/contact">
            <Button color="white">Request A Proposal</Button>
          </Link>
        </div>
      </section>
      <Services6040 />
    </Layout>
  )
}
