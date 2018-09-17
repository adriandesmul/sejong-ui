const path = require('path');
const fs = require('fs');

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

fromDir('./src/static', '.html');
htmlFiles.map((file) => {
  console.log('test--');
  console.log(file.split(path.normalize('./src/static')))
})
console.log(path.normalize('./src/static'))
console.log(htmlFiles);
