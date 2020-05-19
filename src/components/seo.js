import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import _ from "lodash"
import { useStaticQuery, graphql } from "gatsby"

function SEO({
  doctitle: title,
  og_title,
  tw_title,
  description,
  og_description,
  tw_description,
  bodyClass,
  lang,
  meta,
  keywords,
  author,
  canonical,
}) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            separator
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || siteMetadata.description

  bodyClass = [bodyClass, "hck2--node"].join(" ")

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      bodyAttributes={{
        class: bodyClass,
      }}
      title={_.unescape(title)}
      titleTemplate={`%s ${siteMetadata.separator} ${siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: og_title || title,
        },
        {
          property: `og:description`,
          content: og_description || metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author || siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: tw_title || title,
        },
        {
          name: `twitter:description`,
          content: tw_description || metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;500;800&family=Roboto:wght@300;700"
        rel="stylesheet"
      />
      <link rel="canonical" href={canonical || siteMetadata.siteUrl} />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO
