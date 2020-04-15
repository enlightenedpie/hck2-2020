import React, { useState } from "react"
import Layout from "../templates/layout"
import styles from "./contact.module.sass"

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const ContactPage = props => {
  let [subd, updSubd] = useState(false)
  let [state, setState] = useState({})

  setState = e => Object.assign(state, { [e.target.name]: e.target.value })

  return (
    <Layout {...props} title={"contact page"}>
      <div className={[styles.container_fluid, styles.bg_blue].join(" ")}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={[styles.col_12, styles.intro].join(" ")}>
              <h1>CONTACT US</h1>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                egestas ornare nunc at ullamcorper. Suspendisse potenti. Aliquam
                hendrerit ex ex, a sagittis odio placerat ut. Nunc vel pulvinar
                velit. Pellentesque habitant morbi tristique senectus et netus
                et malesuada fames ac turpis egestas. Ut nulla quam, venenatis
                ac ullamcorper eu, egestas at eros. Aenean sit amet tristique
                lorem.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={[styles.container_fluid, styles.bg_white].join(" ")}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div
              className={[
                styles.col_12,
                styles.col_md_6,
                styles.border_right,
              ].join(" ")}
            >
              {subd ? (
                <span>Thx bro!</span>
              ) : (
                <form
                  name="hck2contact"
                  className={styles.newsletterForm}
                  onSubmit={e => {
                    fetch("/", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      body: encode({ "form-name": "hck2contact", ...state }),
                    })
                      .then(() => {
                        console.log("submitted")
                        updSubd(true)
                      })
                      .catch(err => alert(err))
                    e.preventDefault()
                  }}
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                >
                  <div className={styles.form_group}>
                    <label htmlFor="first_name">
                      First Name<sup>*</sup>
                    </label>
                    <input type="text" name="first_name" />
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="last_name">
                      Last Name<sup>*</sup>
                    </label>
                    <input type="text" name="last_name" />
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="type">
                      Inquiry Type<sup>*</sup>
                    </label>
                    <div className={styles.select_wrapper}>
                      <select name="type">
                        <option value="general">General Information</option>
                        <option value="rfp">Request for Proposal</option>
                        <option value="career">Career Opportunities</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="organization">
                      Organization<sup>*</sup>
                    </label>
                    <input type="text" name="organization" />
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="email">
                      Email<sup>*</sup>
                    </label>
                    <input type="email" name="email" />
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="phone">Phone</label>
                    <input type="phone" name="phone" />
                  </div>

                  <div className={styles.form_group}>
                    <label htmlFor="comments">Question / Comments</label>
                    <textarea name="comments"></textarea>
                    <p className={styles.small}>*Required</p>
                  </div>

                  <input type="hidden" name="form-name" value="hck2contact" />
                  <div className={styles.form_group}>
                    <input type="submit" value="SUBMIT" />
                  </div>
                </form>
              )}
            </div>
            <div className="col-12 col-md-6">
              <h2>LOCATION</h2>
              <p>We are located in Vitruvian Park</p>
              <p>3875 Ponte Ave. Suite 420</p>
              <p>972.716.0500</p>
              <a href="#">DOWNLOAD DIRECTIONS</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// export default ContactPage

const mapQuery = graphql`
  query {
    staticMap {
      childFile {
        childImageSharp {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

// export default ({ location, ...rest }) => {
//   return (
//     <StaticQuery
//       query={indexQuery}
//       render={query => <FrontPage location={location} {...query} {...rest} />}
//     />
//   )
// }
