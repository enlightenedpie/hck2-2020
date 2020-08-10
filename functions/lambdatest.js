const path = require("path")
const fs = require("fs")

var years = path.resolve("./store/years.json")

exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: fs.readFile(years, "utf8"),
  })
}
