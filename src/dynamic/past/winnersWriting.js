const appDiv = document.getElementById('winnersWritingTable');

var xhr = new XMLHttpRequest();

xhr.onload = function() {
  	console.log(this.responseXML.content);
  	let content = this.responseXML.content;
  	appDiv.innerHTML = this.responseText;
}
xhr.open('GET', 'https://dev.sejongculturalsociety.info/writing/essay2019.html', true)
xhr.responseType = 'document';

xhr.send();
