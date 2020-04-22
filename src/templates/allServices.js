import React from "react"

import Layout from "./layout"

import styles from "../pages/work.module.sass"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout title={"work page"}>
      <section className={styles.work}>{"Expertise"}</section>
    </Layout>
  )
}
