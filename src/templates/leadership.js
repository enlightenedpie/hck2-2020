import React from "react"

import Layout from "../templates/layout"
import styles from "./leadership.module.sass"

import LeadershipCard from "../components/LeadershipCard"

// const LeadershipPage = ( bios ) => {
export default ({ pageContext: { bios } }) => {
  console.log(bios)
  return (
    <Layout bodyClass="page-bio" seo={"{}"}>
      <section className={styles.intro}>
        <h1>The HCK2 Leadership Team</h1>
        <hr />
        <p>
          Meet our executive leadership team. International agencies and
          boutiques. Fortune 500 and start-ups. Government and non-profits. We
          represent experience - and some good stories too - from all and draw
          upon this experience to guide and inspire.
        </p>
      </section>
      <section className={styles.container}>
        <div className={styles.list}>
          {bios.map((bio, i) => {
            let splitTitle = bio.title.split("|")
            return (
              <LeadershipCard
                link={"/" + bio.slug}
                image={
                  !!bio.featuredImage
                    ? bio.featuredImage.sourceUrl
                    : "https://admin.hck2.com/app/uploads/2020/04/Generic-Profile-Placeholder-v3.png"
                }
                name={splitTitle[0]}
                title={!!splitTitle[1] ? splitTitle[1] : ""}
              />
            )
          })}
        </div>
      </section>
    </Layout>
  )
}

// export default LeadershipPage
