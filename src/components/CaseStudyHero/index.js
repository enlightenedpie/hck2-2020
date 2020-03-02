import React from "react"

import styles from "./caseyjones.module.sass"

export default ({ bg }) => (
  <div className={styles.caseStudy}>
    <div
      className={styles.scalar}
      style={{ backgroundImage: "url(" + bg + ")" }}
    ></div>
  </div>
)
