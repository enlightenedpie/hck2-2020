import React from "react"

export default ({
  title,
  altText,
  sourceUrl,
  mimeType,
  srcSet,
  sizes,
  ...rest
}) => (
  <picture {...rest}>
    <source type={mimeType} srcSet={srcSet} />
    <img title={title} alt={altText} src={sourceUrl} />
  </picture>
)
