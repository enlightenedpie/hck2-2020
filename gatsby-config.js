module.exports = {
  siteMetadata: {
    title: "HCK2 Marketing + Communications",
    author: "HCK2 Marketing + Communications",
    description: "HCK2 Marketing + Communications",
    siteUrl: "https://www.hck2.com",
    address: "3875 Ponte Ave.\nSuite 420\nAddison, TX 75001",
    phone: "972.716.0500",
    separator: "|",
  },
  plugins: [
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `Wpquery`,
        fieldName: `wpquery`,
        url: `https://admin.hck2.com/wp/graphql`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1360,
              withWebp: true,
              showCaptions: true,
              quality: 75,
              wrapperStyle: `margin: 7vw 0;`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        data: `@import "${__dirname}/src/styles/entry"`,
        useResolveUrlLoader: true,
        useMozJpeg: true,
      },
    },
    /* {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Roboto, BarlowCondensed"],
          urls: ["/assets/fonts/fonts.css"],
        },
      },
    }, */
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require("postcss-easy-import")(),
          require("postcss-custom-properties")({ preserve: false }),
          require("postcss-color-function")(),
          require("autoprefixer")({}),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: false, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        ignore: ["/ignored.css", "prismjs/", "/prism.css", "docsearch.js/"], // Ignore files/folders
        purgeOnly: ["components/", "/main.css", "bootstrap/"], // Purge only these files/folders
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `HCK2 Marketing + Communications`,
        short_name: `HCK2`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#e87722`,
        display: `minimal-ui`,
        icon: `static/assets/img/hck2-logo-square.png`,
        legacy: false,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-v2-plugin-page-transitions`,
      options: {
        transitionTime: 250,
      },
    },
    {
      resolve: `gatsby-source-googlemaps-static`,
      options: {
        key: `AIzaSyAAdvgg4M-WqLiOJ1tL2rWutnXw88WuTSQ`,
        center: `3875 Ponte Ave., Addison, Tx 75001`,
        zoom: `18`,
        size: `700`,
        markers: [
          {
            location: `3875 Ponte Ave, Addison, Tx 75001`,
            color: `0xE87722`,
            scale: `2`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: 1890904,
        sv: 6,
      },
    },
    /* {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-3953745-1",
        head: true,
        pageTransitionDelay: 250,
        defer: true,
        sampleRate: 5,
        siteSpeedSampleRate: 10,
      },
    }, */
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/`,
      },
    },
    `gatsby-plugin-sitemap`,
  ],
}
