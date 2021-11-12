require('dotenv').config();
const express = require('express'); 
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/weather/current/citystate/:city/:state', (req, res) => {
  try {
    axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city},${req.params.state}&appid=${process.env.WEATHER_API_KEY}`,
     {validateStatus: false})
    .then((apiRes)=> res.send(apiRes.data));
  } catch (err) {
    res.sendStatus(500);
  }
}); 

app.get('/weather/current/zip/:zipcode', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT ' + req.params.city + req.params.state });
}); 