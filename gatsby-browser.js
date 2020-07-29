const { detect } = require("detect-browser")
const browser = detect()
const { v4: uuid } = require("uuid")

exports.onClientEntry = () => {
  if (window.location.pathname === "/unsupported.html") return false
  if (browser.name === "ie") window.location.replace("/unsupported.html")

  let tid_e = localStorage.getItem("tid_e")

  console.log(tid_e)

  localStorage.setItem("tid_e", tid_e || uuid())
}

exports.registerServiceWorker = () => true
