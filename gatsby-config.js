module.exports = {
  siteMetadata: {
    title: "HCK2",
    author: "HCK2",
    description: "HCK2",
    siteUrl: "https://hck2.com",
    address: "Vitruvian Park\n3875 Ponte Ave.\nSuite 420\nAddison, TX 75001",
    phone: "972.716.0500",
    menus: {
      mainNav: [],
      socialNav: [],
    },
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
        printRejected: true, // Print removed selectors and processed file names
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
    `gatsby-plugin-page-transitions`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        data: `@import "${__dirname}/src/styles/entry"`,
        useResolveUrlLoader: true,
      },
    },
    {
      resolve: `gatsby-source-googlemaps-static`,
      options: {
        key: `AIzaSyBHH4AWBt_2PXFV2w5IqS-Gjx8ifVXlDrQ`,
        center: `32.9355065,-96.8510314`,
      },
    },
  ],
}
