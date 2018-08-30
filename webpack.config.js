const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new htmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html'
})

module.exports = {
  entry: './src/index.js',
  watch: true,
  plugins: [htmlPlugin],
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
