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
      {typeof children == "object" ? (
        <>{children}</>
      ) : (
        <img type={mimeType} alt={altText} src={sourceUrl} {...rest} />
      )}
    </picture>
  )
}
