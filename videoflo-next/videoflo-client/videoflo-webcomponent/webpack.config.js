const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const glob = require("glob")

    module.exports = {
      mode: "production",
      entry: {
        "bundle.js": glob.sync("build/static/js/*.js").map(f => path.resolve(__dirname, f)),
      },
      output: {
        path: path.resolve(__dirname, "build"),
        filename: "static/js/bundle.js",
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      plugins: [new UglifyJsPlugin()],
    }