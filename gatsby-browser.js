const { detect } = require("detect-browser")
const browser = detect()

exports.onClientEntry = () => {
  if (window.location.pathname === "/unsupported.html") return false
  if (browser.name === "ie") window.location.replace("/unsupported.html")
}
