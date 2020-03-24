function HCK2() {
  this._root = "utils"
}

HCK2.prototype = {
  html: {
    entities: {
      decode: str => {
        return str.replace(
          /&(.*?);/gm,
          (ent, match) =>
            ({
              "#8217": "'",
              "#8230": "…",
            }[match] || match)
        )
      },
    },
  },
}

export default new HCK2()
