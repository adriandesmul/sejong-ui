const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const API_URL = {
  local: JSON.stringify('http://localhost:3000')
}
var environment = (process.env.NODE_ENV == 'local') ? 'production' : 'local'

const indexPlugin = new htmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html'
});

var htmlFiles = [];

function fromDir(startPath, filter) {
  console.log('Looking at dir: ' + startPath);

  if (!fs.existsSync(startPath)) {
    console.log("Dir doesn't exist: " + startPath);
    return;
  }

  var files = fs.readdirSync(startPath);

  files.forEach((file) => {
    console.log(file)
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter);
    } else if (filename.indexOf(filter) >= 0) {
      htmlFiles.push(filename);
    }

  })
}

fromDir('./src/static', '.ejs');
const staticPlugins = htmlFiles.map((file) => {
  return new htmlWebpackPlugin({
    template: file,
    filename: file.split(path.normalize('./src/static'))[1]
  })
})

let htmlPlugins = [indexPlugin].concat(staticPlugins).concat([new webpack.DefinePlugin({
  'API_URL': API_URL[environment]
})])
console.log(htmlPlugins)

module.exports = {
  entry: './src/index.js',
  watch: true,
  plugins: htmlPlugins,
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
        test: /\.?css$/,
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
