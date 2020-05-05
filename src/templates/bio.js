import React from "react"

import Layout from "../templates/layout"
import SVG from "../components/SVG"
import styles from "./bio.module.sass"

const BioPage = props => {
  return (
    <Layout bodyClass="page-bio" {...props} seo={"{}"}>
      <div className={styles.temp_spacer}></div>
      <section className={styles.content}>
        <div className={[styles.column, styles.left].join(" ")}>
          <div className={[styles.image_container, styles.green].join(" ")}>
            <div
              className={styles.image}
              style={{
                backgroundImage: "url(https://picsum.photos/600/600)",
              }}
            ></div>
          </div>
          <div className={[styles.water_cooler, styles.desktop].join(" ")}>
            <div className={styles.cooler_icon}>
              <SVG.creative className={styles.icon} />
            </div>
            <div className={styles.cooler_copy}>
              <h2 className={styles.green}>Hanging at the water cooler</h2>
              <p>
                <strong>Weirdest thing you've ever eaten?</strong>
              </p>
              <p>Sweetbreads. Not sweet. And Definitely not bread.</p>
              <br />
              <p>
                <strong>Weirdest thing you've ever eaten?</strong>
              </p>
              <p>Sweetbreads. Not sweet. And Definitely not bread.</p>
              <br />
              <p>
                <strong>Weirdest thing you've ever eaten?</strong>
              </p>
              <p>Sweetbreads. Not sweet. And Definitely not bread.</p>
              <br />
            </div>
          </div>
        </div>
        <div className={[styles.column, styles.right].join(" ")}>
          <h1 className={styles.green}>David Carr</h1>
          <h2 className={styles.gray}>Supereme Leader</h2>
          <hr />
          <div className={styles.main_copy}>
            <p>
              <strong>
                Tingling of the spine vastness is bearable only through love
                citizens of distant epochs dream of the mind's eye star stuff
                harvesting star light billions upon billions? Globular star
                cluster kindling the energy hidden in matter globular star
                cluster rich in heavy atoms great turbulent clouds something
                incredible is waiting to be known.
              </strong>
            </p>
            <p>
              Vangelis star stuff harvesting star light not a sunrise but a
              galaxyrise dream of the mind's eye extraplanetary Drake Equation.
              Citizens of distant epochs rich in heavy atoms extraordinary
              claims require extraordinary evidence emerged into consciousness
              courage of our questions cosmic fugue. Two ghostly white figures
              in coveralls and helmets are soflty dancing paroxysm of global
              death Euclid gathered by gravity brain is the seed of intelligence
              preserve and cherish that pale blue dot.
            </p>
            <p>
              White dwarf worldlets consciousness made in the interiors of
              collapsing stars hundreds of thousands light years. Permanence of
              the stars concept of the number one take root and flourish from
              which we spring a very small stage in a vast cosmic arena Drake
              Equation. A still more glorious dawn awaits as a patch of light
              the only home we've ever known courage of our questions bits of
              moving fluff descended from astronomers.
            </p>
          </div>
          <div className={styles.quote}>
            <h2 className={styles.orange}>Favorite Quote</h2>
            <blockquote>
              billions upon billions upon billions upon billions upon billions
              upon billions upon billions.
            </blockquote>
            <p>- Carl Sagan</p>
          </div>
          <div className={[styles.water_cooler, styles.mobile].join(" ")}>
            <div className={styles.cooler_icon}>
              <SVG.creative className={styles.icon} />
            </div>
            <div className={styles.cooler_copy}>
              <h2 className={styles.green}>Hanging at the water cooler</h2>
              <p>
                <strong>Weirdest thing you've ever eaten?</strong>
              </p>
              <p>Sweetbreads. Not sweet. And Definitely not bread.</p>
              <br />
              <p>
                <strong>Weirdest thing you've ever eaten?</strong>
              </p>
              <p>Sweetbreads. Not sweet. And Definitely not bread.</p>
              <br />
              <p>
                <strong>Weirdest thing you've ever eaten?</strong>
              </p>
              <p>Sweetbreads. Not sweet. And Definitely not bread.</p>
              <br />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default BioPage
