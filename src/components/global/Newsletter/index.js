import React, { useState } from "react"
import Button from "../../Button"

import styles from "./newsletter.module.sass"

const nlSubmit = e => {
  e.preventDefault()
}

export default () => {
  let [subd, updSubd] = useState(false)

  updSubd = () => {}
  return (
    <div>
      <form
        name="hck2Newsletter"
        className={styles.newsletterForm}
        onSubmit={nlSubmit}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="email" name="signupEmail" />
        <input type="hidden" name="form-name" value="hck2Newsletter" />
        <Button color="orange" size="sm" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}
