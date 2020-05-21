import React, { useState } from "react"
import Button from "../../Button"

import styles from "./newsletter.module.sass"

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default () => {
  let [subd, updSubd] = useState(false)
  let [state, setState] = useState({})

  setState = e => Object.assign(state, { [e.target.name]: e.target.value })

  return (
    <div>
      {subd ? (
        <span>Thx bro!</span>
      ) : (
        <form
          name="hck2Newsletter"
          className={styles.newsletterForm}
          onSubmit={e => {
            fetch("/", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: encode({ "form-name": "hck2Newsletter", ...state }),
            })
              .then(() => {
                updSubd(true)
              })
              .catch(err => alert(err))
            e.preventDefault()
          }}
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input
            placeholder="Join our mailing list!"
            type="email"
            name="signupEmail"
            onChange={setState}
          />
          <input type="hidden" name="form-name" value="hck2Newsletter" />
          <Button color="orange" size="sm" type="submit">
            Submit
          </Button>
        </form>
      )}
    </div>
  )
}
