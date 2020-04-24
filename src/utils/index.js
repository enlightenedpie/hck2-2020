export const kebabToCamel = item =>
  item
    .split("-")
    .map((item, ii) =>
      ii ? item.charAt(0).toUpperCase() + item.substr(1).toLowerCase() : item
    )
    .join("")
