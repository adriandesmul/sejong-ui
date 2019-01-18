const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Nunjucks = require('nunjucks');
const mkdirp = require('mkdirp');
const watch = require('watch');

Nunjucks.configure({noCache: true})

const API_URL = {
  local: JSON.stringify('http://localhost:3000'),
  prod: JSON.stringify('https://api.sejongculturalsociety.info')
}

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

module.exports = {
  entry: ['./src/index.js'],
  plugins: [
    new htmlWebpackPlugin({
      template: './src/dynamic/index.html',
      filename: './writing/competition/index.html'
    }),
    new webpack.DefinePlugin({
      'API_URL': API_URL['prod']
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    after: (app, server) => {
      watch.createMonitor('./src', (monitor) => {
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
  },
  module: {
    rules: [
      {
        test: /\.?css$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'resolve-url-loader',
            options: {
              root: ''
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }, {
        test: /\.(eot|woff|woff2|ttf|jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath(url, resourcePath, context) {
                const relativePath = path.relative(context, resourcePath);
                const newPath = relativePath.split(path.normalize('src/'))[1]
                return newPath
              }
            }
          }
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
