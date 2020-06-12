export const kebabToCamel = item =>
  item
    .split("-")
    .map((item, ii) =>
      ii ? item.charAt(0).toUpperCase() + item.substr(1).toLowerCase() : item
    )
    .join("")

export const stripSite = link =>
  link ? link.replace("https://www.hck2.com/", "") : ""

export const imageDefaults = {
  style: { position: "", overflow: "" },
  imgStyle: {
    position: "",
    top: "",
    left: "",
    objectPosition: "",
    objectFit: "",
    height: "",
    width: "",
  },
}

export const defPost = {
  title: "",
  excerpt: "",
  uri: "",
  featuredImage: null,
}

export const breakPoints = [1600, 1366, 1024, 768, 576]
