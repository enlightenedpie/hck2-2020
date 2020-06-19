import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import parse from "html-react-parser"
import Layout from "../templates/layout"
import Button from "../components/Button"
import styles from "./contact.module.sass"

const encode = data => {
  const formData = new FormData()
  for (var k in data) {
    if (k === "resume") {
      formData.append(k, data[k], data[k].name)
    } else {
      formData.append(k, data[k])
    }
  }
  return formData
}

const ContactPage = ({
  staticMap,
  wpquery: {
    pages: { nodes: pages },
  },
  ...props
}) => {
  let [subd, updSubd] = useState(false),
    [state, setState] = useState({}),
    [uploader, setUploader] = useState(false)

  setState = e =>
    Object.assign(state, {
      [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
    })

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
            <span
              style={{
                marginRight: "1rem",
                display: "block",
                lineHeight: 1.25,
              }}
            >
              Thank you for reaching out. Someone will get back with you
              shortly!
            </span>
          ) : (
            <form
              name="hck2contact"
              className={styles.newsletterForm}
              onSubmit={e => {
                let data = encode({ "form-name": "hck2contact", ...state })

                fetch("/", {
                  method: "POST",
                  headers: {
                    //"Content-Type": "multipart/form-data", //"application/x-www-form-urlencoded"
                  },
                  body: data,
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
                <input
                  required
                  type="text"
                  name="first_name"
                  onChange={setState}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="last_name">
                  Last Name<sup>*</sup>
                </label>
                <input
                  required
                  type="text"
                  name="last_name"
                  onChange={setState}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="inquiryType">
                  Inquiry Type<sup>*</sup>
                </label>
                <div className={styles.select_wrapper}>
                  <select
                    name="inquiryType"
                    required
                    onChange={e => {
                      setUploader(e.target.value === "career")
                      setState(e)
                    }}
                  >
                    <option selected disabled>
                      Choose A Subject...
                    </option>
                    <option value="General">General Information</option>
                    <option value="RFP">Request for Proposal</option>
                    <option value="career">Career Opportunities</option>
                  </select>
                </div>
              </div>

              <div className={styles.form_group}>
                <label htmlFor="organization">
                  Organization<sup>*</sup>
                </label>
                <input
                  required
                  type="text"
                  name="organization"
                  onChange={setState}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="email">
                  Email<sup>*</sup>
                </label>
                <input required type="email" name="email" onChange={setState} />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="phone">
                  Phone<sup>*</sup>
                </label>
                <input required type="phone" name="phone" onChange={setState} />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="comments">
                  Question / Comments<sup>*</sup>
                </label>
                <textarea
                  required
                  name="comments"
                  onChange={setState}
                ></textarea>
              </div>
              <div
                style={uploader ? { display: "block" } : { display: "none" }}
                className={styles.form_group}
              >
                <label htmlFor="file">Upload File</label>
                <input type="file" name="file" onChange={setState} />
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
