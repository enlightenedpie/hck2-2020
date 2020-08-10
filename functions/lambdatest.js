const path = require("path")
const fs = require("fs")

var years = fs.readFile(
  path.resolve(__dirname) + "/store/years.json",
  (err, data) => {
    if (err) throw err
    console.log(data)
    return data
  }
)

exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: years,
  })
}
