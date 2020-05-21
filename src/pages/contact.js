import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import parse from "html-react-parser"
import Layout from "../templates/layout"
import Button from "../components/Button"
import styles from "./contact.module.sass"

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const ContactPage = ({
  props,
  staticMap,
  wpquery: {
    pages: { nodes: pages },
  },
}) => {
  let [subd, updSubd] = useState(false)
  let [state, setState] = useState({})

  setState = e => Object.assign(state, { [e.target.name]: e.target.value })

  return (
    <Layout {...props} seo={pages[0].seo}>
      <div className={styles.contactIntro}>
        <div>
          <h1>{pages[0].title}</h1>
          <div-spacer-white />
          {parse(pages[0].content)}
        </div>
      </div>
      <section className={styles.contactContent}>
        <div className={styles.borderSep}>
          <h2>Contact Us</h2>
          {subd ? (
            <span>
              Thank you for reaching out. Someone will get back with you
              shortly!
            </span>
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
                <input required type="text" name="first_name" />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="last_name">
                  Last Name<sup>*</sup>
                </label>
                <input required type="text" name="last_name" />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="type">
                  Inquiry Type<sup>*</sup>
                </label>
                <div className={styles.select_wrapper}>
                  <select name="type" required>
                    <option selected disabled>
                      Choose A Subject...
                    </option>
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
                <input required type="text" name="organization" />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="email">
                  Email<sup>*</sup>
                </label>
                <input required type="email" name="email" />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="phone">Phone</label>
                <input required type="phone" name="phone" />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="comments">Question / Comments</label>
                <textarea required name="comments"></textarea>
              </div>

              <legend className={styles.small}>*Required</legend>

              <input type="hidden" name="form-name" value="hck2contact" />
              <div className={styles.form_group}>
                <Button type="submit" size="sm" color="orange">
                  submit
                </Button>
              </div>
            </form>
          )}
        </div>
        <div className={styles.location}>
          <h2>Location</h2>
          <a href={staticMap.mapUrl} target="_blank">
            <Img
              className={[styles.map, "square"].join(" ")}
              alt="Google Map image of HCK2 location"
              {...staticMap.childFile.childImageSharp}
            />
          </a>
          <p>We are located in Vitruvian Park</p>
          <p>3875 Ponte Ave. Suite 420</p>
          <p>Addison, TX 75001</p>
          <p>
            <a href="tel:972.716.0500">972.716.0500</a>
          </p>
          <a target="_blank" href="/assets/docs/HCK2-Driving-Directions.pdf">
            <Button size="sm" color="green">
              Download Directions
            </Button>
          </a>
        </div>
      </section>
    </Layout>
  )
}

// export default ContactPage

const mapQuery = graphql`
  query {
    wpquery {
      pages(where: { id: 729 }) {
        nodes {
          uri
          seo
          content
          title
        }
      }
    }
    staticMap {
      childFile {
        childImageSharp {
          fluid(maxWidth: 700, srcSetBreakpoints: [576], quality: 80) {
            base64
            src
            srcSet
          }
        }
      }
      mapUrl
    }
  }
`

export default ({ location, ...rest }) => {
  return (
    <StaticQuery
      query={mapQuery}
      render={query => <ContactPage location={location} {...query} {...rest} />}
    />
  )
}
