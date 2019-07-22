
document.getElementsByTagName('button').onclick = function() {
	document.getElementsByTagName('button').id = 'active';
}

var year = document.getElementById('active').name;
var xhr = new XMLHttpRequest();
xhr.onload = function() {
  	document.getElementById('winnersWritingTable').innerHTML = (this.responseText);
}
xhr.open('GET', 'http://localhost:8080/past/essay' + year + '.html', true)
xhr.responseType = '';
xhr.send();

console.log('JUST FUCKING WORK');
