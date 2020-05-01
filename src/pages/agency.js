import React from "react"

import Layout from "../templates/layout"
import Testimonials from "../components/Testimonials"
import SVG from "../components/SVG"
import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  ButtonNext,
  ButtonBack,
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"

import styles from "./agency.module.sass"

const WorkPage = props => {
  return (
    <Layout bodyClass="page-work" {...props} seo={"{}"}>
      <section className={styles.agency}>{""}</section>
      <section className={styles.intro}>
        <h1>Our Agency</h1>
        <p>
          Whether you're ready to launch a new company, take your existing
          enterprise to the next level or revitalize your brand to compete more
          effectively in today's market, you've come to the right place.
        </p>
      </section>
      <section className={styles.content}>
        <div className={styles.content_row}>
          <div className={styles.who_image}>
            <div className={styles.square}></div>
          </div>
          <div className={styles.who_copy}>
            <div className={styles.copy_container}>
              <h2 className={styles.blue}>Who We Are</h2>
              <hr />
              <p>
                HCK2 is a marketing communications agency that offers it all:
                Creative advertising, design and branding. SOcial media and
                digital communication. Public relations. Website creation. All
                rooted in proven brand strategy - and focused on delivering
                measurable results.
              </p>
              <p>
                Invite us to serve as an extension of your team and you'll get
                so much more than you ever imagined!
              </p>
            </div>
          </div>
        </div>
        <div className={[styles.content_row, styles.reversed].join(" ")}>
          <div className={styles.values_copy}>
            <div className={styles.copy_container}>
              <h2 className={styles.orange}>Our Values</h2>
              <hr />
              <p>
                Our own blend of Kool-Aid. The best thing about Kool-Aid is that
                it mixes well with anything.{" "}
                <a href="#">Growth, Charity, Integrity and Balance</a> are our
                flavors. Mix them together and our culture is formed. Sharing
                sunburns at the Ranger's Ballpark. Giving back to our generous
                community. Spending long weeks beside our work family. The
                Kool-Aid is served, on ice.
              </p>
              <a href="#" className={[styles.button, styles.orange].join(" ")}>
                Learn More
              </a>
            </div>
          </div>
          <div className={styles.values_icons}>
            <div className={styles.value_square}>
              <div>
                <SVG.creative />
                <h4>Growth</h4>
              </div>
            </div>
            <div className={styles.value_square}>
              <div>
                <SVG.creative />
                <h4>Charity</h4>
              </div>
            </div>
            <div className={styles.value_square}>
              <div>
                <SVG.creative />
                <h4>Integrity</h4>
              </div>
            </div>
            <div className={styles.value_square}>
              <div>
                <SVG.creative />
                <h4>Balance</h4>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content_row}>
          <div className={styles.leader_slider}>
            <div className={styles.square}></div>
            <CarouselProvider
              naturalSlideWidth={80}
              naturalSlideHeight={80}
              totalSlides={3}
              className={styles.slider_provider}
            >
              <Slider className={styles.slider}>
                <Slide index={0} className={styles.slide}>
                  <Image
                    src="https://picsum.photos/720/460"
                    hasMasterSpinner="true"
                    className={styles.slide_image}
                  />
                  <h4>David Carr</h4>
                  <p>Testing 1</p>
                </Slide>
                <Slide index={1} className={styles.slide}>
                  <Image
                    src="https://picsum.photos/720/460"
                    hasMasterSpinner="true"
                    className={styles.slide_image}
                  />
                  <h4>David Carr</h4>
                  <p>Testing 2</p>
                </Slide>
                <Slide index={2} className={styles.slide}>
                  <Image
                    src="https://picsum.photos/720/460"
                    hasMasterSpinner="true"
                    className={styles.slide_image}
                  />
                  <h4>David Carr ></h4>
                  <p>Testing 3 ></p>
                </Slide>
              </Slider>
              <ButtonBack className={styles.back}>
                <SVG.back />
              </ButtonBack>
              <ButtonNext className={styles.next}>
                <SVG.forward />
              </ButtonNext>
            </CarouselProvider>
          </div>
          <div className={styles.leader_copy}>
            <div className={styles.copy_container}>
              <h2 className={styles.green}>Our Leadership Team</h2>
              <hr />
              <p>
                Meet our executive leadership team. International agencies and
                boutiques. Fortune 500 and start-ups. Government and
                non-profits. We represent experience - and some good stories too
                - from all and draw upon this experience to guide and inspire.
              </p>
              <a href="#" className={[styles.button, styles.green].join(" ")}>
                Meet The Team
              </a>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </Layout>
  )
}

export default WorkPage

/* const indexQuery = graphql`
  query {
    wpquery {
      pages(where: { name: "front-page" }) {
        nodes {
          uri
          id
          seo
          contentData
        }
      }
    }
  }
`

export default ({ location, ...rest }) => {
  return (
    <StaticQuery
      query={indexQuery}
      render={query => <FrontPage location={location} {...query} {...rest} />}
    />
  )
} */
