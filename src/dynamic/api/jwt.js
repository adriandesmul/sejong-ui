function decodeToken(token) {

  var loginToken = token || localStorage.getItem('loginToken');

  var userObj = {
    username: null,
    admin: null
  }

  if (loginToken) {
    var encodedDetails = loginToken.split('.')[1];
    var userDetails;

    try {
      userDetails = JSON.parse(atob(encodedDetails));
    } catch(error) {
      localStorage.clear();
    }

    if (!userDetails) { return userObj; }
    userObj.username = userDetails.user;
    userObj.admin = userDetails.admin;
  }

  return userObj;

}

module.exports = decodeToken;
