const path = require('path')

module.exports = {
  entry: {
    content: path.join(__dirname, "src", "index.js"),
    background: path.join(__dirname, "src", "background.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  }
}
