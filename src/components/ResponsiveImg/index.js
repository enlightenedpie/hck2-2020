import React from "react"

import styles from "./img.module.sass"

export default ({
  children,
  title,
  altText,
  sourceUrl,
  mimeType,
  srcSet,
  sizes,
  ...rest
}) => {
  return (
    <picture className={styles.respImg} {...rest}>
      <source type={mimeType} srcSet={srcSet} />
      {typeof children == "object" ? (
        <>{children}</>
      ) : (
        <img title={title} alt={altText} src={sourceUrl} />
      )}
    </picture>
  )
}
