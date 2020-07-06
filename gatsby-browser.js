const { detect } = require("detect-browser")
const browser = detect()

exports.onClientEntry = () => {
  alert(browser.name)
}
