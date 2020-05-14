import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../templates/layout"
import Testimonials from "../components/Testimonials"
import Button from "../components/Button"
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

const AgencyPage = ({
  props,
  wpquery: {
    page: {
      seo,
      featuredImage: {
        altText: alt,
        imageFile: { childImageSharp },
      },
    },
    teamMembers: { nodes: teamMembers },
  },
}) => {
  console.log(childImageSharp)
  return (
    <Layout bodyClass="landing agency" {...props} seo={seo}>
      <section className={styles.agency}>
        <Img className={styles.imageContainer} {...childImageSharp} />
      </section>
      <section className={styles.intro}>
        <h1>Welcome to HCK2!</h1>
        <p>
          When you rely on HCK2 for your business communications, you get more
          than just an agency. You get the experience and insights of proven,
          award-winning professionals who have put their talents to work for
          organizations of every size and description. If you’re looking for a
          team with a track record of long-standing relationships and
          quantifiable results, we’re it.
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
              <div-spacer />
              <p>
                HCK2 is a marketing communications agency that offers it all:
                creative advertising, design and branding, social media and
                digital communication, public relations, & web and interactive
                creation. All rooted in proven brand strategy - and focused on
                delivering measurable results.
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
              <div-spacer />
              <p>
                While meeting deadlines is a fundamental requirement in our line
                of work, that's not what drives us at HCK2. We're united in
                embracing a culture that promotes giving back and paying it
                forward… continually expanding our knowledge and skills … going
                above and beyond to exceed expectations… all while understanding
                that our lives outside of work is what keeps us grounded, steady
                and ready to come back every day to give it our all.
              </p>
            </div>
          </div>
          <div className={styles.values_icons}>
            <div className={styles.value_square}>
              <div>
                <SVG.charity />
                <h4>Charitable Hearts</h4>
              </div>
            </div>
            <div className={styles.value_square}>
              <div>
                <SVG.knowledge />
                <h4>Knowledge Seekers</h4>
              </div>
            </div>
            <div className={styles.value_square}>
              <div>
                <SVG.ravingFans />
                <h4>Raving Fans</h4>
              </div>
            </div>
            <div className={styles.value_square}>
              <div>
                <SVG.balance />
                <h4>Balanced Life</h4>
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
              totalSlides={teamMembers.length}
              className={styles.slider_provider}
            >
              <Slider className={styles.slider}>
                {teamMembers.map((teamMember, i) => {
                  let splitTitle = teamMember.title.split("|")
                  return (
                    <Slide index={i} className={styles.slide}>
                      <Image
                        src={
                          !!teamMember.featuredImage
                            ? teamMember.featuredImage.sourceUrl
                            : "https://admin.hck2.com/app/uploads/2020/04/Generic-Profile-Placeholder-v3.png"
                        }
                        hasMasterSpinner="true"
                        className={styles.slide_image}
                      />
                      <h4>{splitTitle[0]}</h4>
                      <p>{!!splitTitle[1] ? splitTitle[1] : ""}</p>
                    </Slide>
                  )
                })}
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
              <div-spacer />
              <p>
                Meet our executive leadership team. International agencies and
                boutiques. Fortune 500 and start-ups. Government and
                non-profits. We represent experience - and some good stories too
                - from all and draw upon this experience to guide and inspire.
              </p>
              <Link to="/leadership">
                <Button color="green">Meet The Team</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </Layout>
  )
}

const agencyQuery = graphql`
  query {
    wpquery {
      page(id: "674", idType: DATABASE_ID) {
        id
        title
        seo
        content
        featuredImage {
          sourceUrl
          altText
          imageFile {
            childImageSharp {
              fluid(webpQuality: 100) {
                src
                srcWebp
                presentationHeight
                presentationWidth
                sizes
                srcSet
                srcSetWebp
              }
            }
          }
        }
      }
      teamMembers(
        first: 100
        where: { orderby: { field: TITLE, order: ASC } }
      ) {
        nodes {
          slug
          title
          featuredImage {
            sourceUrl
            srcSet
            uri
          }
        }
      }
    }
  }
`

export default ({ team, ...rest }) => {
  return (
    <StaticQuery
      query={agencyQuery}
      render={query => <AgencyPage team={team} {...query} {...rest} />}
    />
  )
}
