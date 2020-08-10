const path = require("path")
const fs = require("fs")

var years = fs.readFile(
  path.resolve(__dirname) + "/store/years.json",
  (err, data) => {
    console.log(err, data)
    if (err) throw err
    return data
  }
)

exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ years }),
  })
}
