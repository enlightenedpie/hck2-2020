export const kebabToCamel = item =>
  item
    .split("-")
    .map((item, ii) =>
      ii ? item.charAt(0).toUpperCase() + item.substr(1).toLowerCase() : item
    )
    .join("")

export const stripSite = link =>
  link ? link.replace("https://hck2.com/", "") : ""

export const imageDefaults = {
  id: "",
  altText: "",
  sourceUrl: "",
  mimeType: "",
  srcSet: "",
}
