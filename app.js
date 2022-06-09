const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
  const city = req.body.cityName;
  const appid = "be70bccc5c395b543a85be6a7a02c085";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + appid;
  https.get(apiUrl, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const iconUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      console.log(weatherData.main.temp);
      console.log(weatherData.weather[0].description);
      res.write("<h1>The temperature in " + city + " is " + weatherData.main.temp + " degrees celcius.</h1>");
      res.write("<p>The weather is currently " + weatherData.weather[0].description + "</p>");
      res.write("<img src=" + iconUrl + "></img>");
      res.send();
    })
  })
})

app.listen(3000, function () {
  console.log("Server running on port 3000");
})