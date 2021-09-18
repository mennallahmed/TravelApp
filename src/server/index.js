const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
/*app.use(cors());
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})*/
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));
// Setup empty JS object
dataObject = {}

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin","*")
    res.send(mockAPIResponse)
})
  
// Respond with JS object
app.get('/all', function (req, res) {
    console.log(dataObject);
    res.send(dataObject)
  })

//post GeoNames data   
app.post('/addGeo', (req, res) => {
  dataObject["latitude"] = req.body.latitude;
  dataObject["longitude"] = req.body.longitude;
  dataObject["country"] = req.body.country;
  res.send(dataObject);
  });

//post Weather data 
app.post('/addweather', (req, res) => {
    dataObject["temp"] = req.body.temp;
    dataObject["description"] = req.body.description;
    dataObject["icon"] = req.body.icon;
    res.send(dataObject);
    });

//post pixabay data 
app.post('/addPix', (req, res) => {
  dataObject["image"] = req.body.image;
  res.send(dataObject);
  });  
  
//post RestCountries data 
app.post('/addCountry', (req, res) => {
  dataObject["currency"] = req.body.currency;
  dataObject["region"] = req.body.region;
  dataObject["language"] = req.body.language;
  console.log(dataObject);
  res.send(dataObject);
  });   

