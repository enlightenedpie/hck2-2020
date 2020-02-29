import React from "react"
import styles from "./button.module.sass"

export default ({ color = "default", size = "◊◊◊", children, ...rest }) => (
  <span className={[styles.btn, styles[size]].join(" ")}>
    <button {...rest} className={styles[color]}>
      {children || "button"}
    </button>
  </span>
)
