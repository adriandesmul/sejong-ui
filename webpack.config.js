const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const htmlPlugin = new htmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html'
})

const API_URL = {
  local: JSON.stringify('http://localhost:3000')
}
var environment = (process.env.NODE_ENV == 'local') ? 'production' : 'local'

module.exports = {
  entry: './src/index.js',
  watch: true,
  plugins: [
    htmlPlugin,
    new webpack.DefinePlugin({
      'API_URL': API_URL[environment]
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  }
}
