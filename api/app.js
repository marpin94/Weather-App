const express = require("express");
var request = require('request')
const app  = express();
const port = 5000;
require('dotenv').config()

app.get("/", (req,res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Listening on port ${port}`))

const key = process.env.API_KEY

app.get('/getWeather/:city', (req,res) => {
    const city = req.params.city
    request(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${key}`,
    function(error, response, body){
        if (!error && response.statusCode==200){
            var parsedBody=JSON.parse(body);
            var data = parsedBody['data']
            res.send({data});
        }
    })
})

