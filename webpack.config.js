const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Nunjucks = require('nunjucks');
const mkdirp = require('mkdirp');
const watch = require('watch');

Nunjucks.configure({noCache: true})

const API_URL = {
  local: JSON.stringify('http://localhost:3000')
}

var environment = (process.env.NODE_ENV == 'local') ? 'local' : 'production'

var htmlFiles = [];

function fromDir(startPath, filter, arr) {

  if (!fs.existsSync(startPath)) {
    return;
  }

  var files = fs.readdirSync(startPath);

  files.forEach((file) => {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter, arr);
    } else if (filename.indexOf(filter) >= 0) {
      arr.push(filename);
    }

  })
}

fromDir('./src/static', '.html', htmlFiles);
htmlFiles.map((file) => {
  console.log('Building: ', file)
  let compiledFile = Nunjucks.render(file);
  let saveTo = path.join('./dist',file.split(path.normalize('./src/static'))[1]);
  mkdirp.sync(path.dirname(saveTo))
  fs.writeFileSync(saveTo, compiledFile);
})

// FONT TRANSFER
var fontFiles = [];
fromDir('./src', '.eot', fontFiles);
fromDir('./src', '.woff', fontFiles);
fromDir('./src', '.woff2', fontFiles);
fromDir('./src', '.ttf', fontFiles);
fromDir('./src', '.css', fontFiles);

fontFiles.map((file) => {
  console.log('Building: ', file)
  let saveTo = path.join('./dist',file.split(path.normalize('./src'))[1]);
  mkdirp.sync(path.dirname(saveTo))
  fs.copyFileSync(file, saveTo);
})

// IMG TRANSFER
var imgFiles = [];
fromDir('./src', '.jpg', imgFiles);
fromDir('./src', '.gif', imgFiles);
fromDir('./src', '.png', imgFiles);

imgFiles.map((file) => {
  console.log('Building: ', file)
  let saveTo = path.join('./dist',file.split(path.normalize('./src'))[1]);
  mkdirp.sync(path.dirname(saveTo))
  fs.copyFileSync(file, saveTo);
})


if (environment == 'local') {
  watch.createMonitor('./src/static', (monitor) => {
    monitor.on('changed', () => {

      console.log("-- Update HTML --")

      htmlFiles = [];

      fromDir('./src/static', '.html', htmlFiles);
      htmlFiles.map((file) => {
        let compiledFile = Nunjucks.render(file);
        let saveTo = path.join('./dist',file.split(path.normalize('./src/static'))[1]);
        console.log(saveTo)
        mkdirp.sync(path.dirname(saveTo))
        fs.writeFileSync(saveTo, compiledFile);
      })

    })
  })
}

module.exports = {
  entry: './src/index.js',
  plugins: [
    new htmlWebpackPlugin({
      template: './src/dynamic/index.html',
      filename: './writing/competition/index.html'
    }),
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
