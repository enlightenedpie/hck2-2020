import React, { useState } from "react"
import Button from "../../Button"

import styles from "./newsletter.module.sass"

export default () => {
  let [subd, updSubd] = useState(false)

  updSubd = () => {}
  return (
    <div>
      <form className={styles.newsletterForm} onSubmit={null}>
        <input type="text" />
        <Button color="orange" size="sm" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}
