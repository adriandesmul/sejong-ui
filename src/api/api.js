function formatPayload(payload) {
  var formattedPayload = ''
  for (var key in payload) {
    formattedPayload += encodeURIComponent(key)
    formattedPayload += '='
    formattedPayload += encodeURIComponent(payload[key])
    formattedPayload += '&'
  }
  return formattedPayload;
}

function post(route, payload, cb) {
  console.log(route, payload, formatPayload(payload))

  var token = localStorage.getItem('loginToken');
  if (!token) { return; }

  fetch(API_URL + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': 'Bearer ' + token
    },
    body: formatPayload(payload)
  }).then((results) => {
    console.log(results)
    cb(results.status)
  })
}

module.exports = {
  post: post
}
