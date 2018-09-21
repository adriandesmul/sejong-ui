const path = require('path');
const fs = require('fs');
const Nunjucks = require('nunjucks');
const mkdirp = require('mkdirp');

var htmlFiles = [];

function fromDir(startPath, filter) {

  if (!fs.existsSync(startPath)) {
    return;
  }

  var files = fs.readdirSync(startPath);

  files.forEach((file) => {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter);
    } else if (filename.indexOf(filter) >= 0) {
      htmlFiles.push(filename);
    }

  })
}

fromDir('./src/static', '.html');
htmlFiles.map((file) => {
  let compiledFile = Nunjucks.render(file);
  let saveTo = path.join('./dist',file.split(path.normalize('./src/static'))[1]);
  mkdirp.sync(path.dirname(saveTo))
  fs.writeFileSync(saveTo, compiledFile);
})
