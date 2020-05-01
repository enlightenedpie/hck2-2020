import React from "react"

import Layout from "../templates/layout"
import styles from "./leadership.module.sass"

import LeadershipCard from "../components/LeadershipCard"

const LeadershipPage = props => {
  return (
    <Layout bodyClass="page-bio" {...props} seo={"{}"}>
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
          <LeadershipCard
            link="/bio"
            image="https://picsum.photos/600/600"
            name="Heather Capps"
            title="President + CEO"
          />
          <LeadershipCard
            link="/bio"
            image="https://picsum.photos/601/600"
            name="Heather Capps"
            title="President + CEO"
          />
          <LeadershipCard
            link="/bio"
            image="https://picsum.photos/602/600"
            name="Heather Capps"
            title="President + CEO"
          />
          <LeadershipCard
            link="/bio"
            image="https://picsum.photos/603/600"
            name="Heather Capps"
            title="President + CEO"
          />
          <LeadershipCard
            link="/bio"
            image="https://picsum.photos/604/600"
            name="Heather Capps"
            title="President + CEO"
          />
          <LeadershipCard
            link="/bio"
            image="https://picsum.photos/605/600"
            name="Heather Capps"
            title="President + CEO"
          />
          <LeadershipCard
            link="/bio"
            image="https://picsum.photos/606/600"
            name="Heather Capps"
            title="President + CEO"
          />
          <LeadershipCard
            link="/bio"
            image="https://picsum.photos/607/600"
            name="Heather Capps"
            title="President + CEO"
          />
          <LeadershipCard
            link="/bio"
            image="https://picsum.photos/608/600"
            name="Heather Capps"
            title="President + CEO"
          />
          <LeadershipCard
            link="/bio"
            image="https://picsum.photos/609/600"
            name="Heather Capps"
            title="President + CEO"
          />
        </div>
      </section>
    </Layout>
  )
}

export default LeadershipPage
