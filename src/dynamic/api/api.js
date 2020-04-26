function formatPayload(payload) {
  var formattedPayload = "";
  for (var key in payload) {
    formattedPayload += encodeURIComponent(key);
    formattedPayload += "=";
    formattedPayload += encodeURIComponent(payload[key]);
    formattedPayload += "&";
  }
  return formattedPayload;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function get(route, cb) {
  console.log("GET: " + route);
  var token = localStorage.getItem("loginToken");
  if (!token) {
    cb(true, null);
    return;
  }

  fetch(API_URL + route, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  })
    .then((results) => {
      console.log(route, results.status);
      if (results.status === 401) {
        localStorage.removeItem("loginToken");
        window.location.reload();
        return;
      }
      if (!(results.status === 200 || results.status === 201)) {
        console.log("Retrying");
        return sleep(5000).then(() => get(route, cb));
      }
      if (route.indexOf("export") !== -1 && results.status === 200) {
        return results.blob();
      } else {
        if (results.status === 201) return null;
        return results.json();
      }
    })
    .then((data) => {
      cb(false, data);
    });
}

function post(route, payload, cb) {
  var token = localStorage.getItem("loginToken");
  if (!token) {
    cb(true, null);
    return;
  }

  fetch(API_URL + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: "Bearer " + token,
    },
    body: formatPayload(payload),
  })
    .then((res) => {
      if (res.status !== 200) {
        cb(res.status, res.text());
        return null;
      }
      return res.text();
    })
    .then((results) => {
      if (!results) {
        cb(500);
        return;
      }
      cb(200, results);
    });
}

function post_unsecure(route, payload, cb) {
  let err = false;

  fetch(API_URL + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formatPayload(payload),
  })
    .then((results) => {
      if (results.status !== 200) {
        err = true;
      }
      return results.text();
    })
    .then((data) => {
      cb(err, data);
    });
}

module.exports = {
  get: get,
  post: post,
  post_unsecure: post_unsecure,
};
