import React from "react"
import styles from "./leadershipCard.module.sass"

export default props => (
  <div className={styles.card_container}>
    <a className={styles.card} href={props.link}>
      <div
        className={styles.image}
        style={{
          backgroundImage: "url(" + props.image + ")",
        }}
      ></div>
      <h4>{props.name}</h4>
      <p>{props.title}</p>
    </a>
  </div>
)
