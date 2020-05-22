import React from "react"

import Layout from "../templates/layout"
import styles from "./leadership.module.sass"

import LeadershipCard from "../components/LeadershipCard"

// const LeadershipPage = ( bios ) => {
export default ({ pageContext: { bios } }) => {
  return (
    <Layout bodyClass="page-bio" seo={"{}"}>
      <section className={styles.intro}>
        <h1>Meet The Team</h1>
        <hr />
        <p>
          Wide-ranging experience. Proven expertise. An insatiable appetite for
          new insights and breakthrough solutions. All that, plus an easygoing
          manner that fuels collaboration among the team and enduring
          relationships with our clients. Come get acquainted with our
          leadership team.
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
