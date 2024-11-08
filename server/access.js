var request = require("request");
clientID = "da242d57822840bfa608a886cab39c21";
clientSecret = "22d1da2c44ad4b2985fa939855171d07";

var options = {
  method: "POST",
  url: "https://oauth.fatsecret.com/connect/token",
  method: "POST",
  auth: {
    user: clientID,
    password: clientSecret,
  },
  headers: { "content-type": "application/x-www-form-urlencoded" },
  form: {
    grant_type: "client_credentials",
    scope: "basic",
  },
  json: true,
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
