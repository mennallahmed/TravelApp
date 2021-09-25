import { img } from "..";

async function init (){

  //Global Variables
  const GeoNamesAPI_KEY="mennaallah";
  const weatherbitAPI_KEY="1fdf42455c844eea89c83db55c2cc95c";
  const PixabayAPI_KEY="23437454-7b2497e9ff571e64a6742ff2d";
  const countryAPI_KEY="62731e903c3ea4473179f162ea4da4cc";
  let Geourl = '';
  let weatherURL='';
  let currentWeatherURL="http://api.weatherbit.io/v2.0/current?";
  let dailyForecastURL="http://api.weatherbit.io/v2.0/forecast/daily?";
  let urlPixabay ='';
  let restCountriesURL='';
  let newCity='';

  //Get APIS data
  const getInfo = async (Geourl)=>{
    const res = await fetch(Geourl)
    try{
      const data = await res.json();
      console.log(data)
      return data;
    } 
    catch(error){
    console.log("error",error);
    }
  }

  // POST request to server
  const postData = async (url = '', data = {}) => {
    const response = await fetch(url,{
      method: 'POST',
      credentials:'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
      console.log("error", error);
    }
  }

  //Update the user interface with data
  const updateUI = async () => {
    const request = await fetch('http://localhost:8081/all');
    try {
      const allData = await request.json();
      console.log(allData);
      document.getElementById('city').innerHTML = `${newCity}`;
      document.getElementById('country').innerHTML = `${allData.country}`;
      document.getElementById('description').innerHTML = `${allData.description}`;
      document.getElementById('temprature').innerHTML = `${allData.temp}℃`;
      document.getElementById('currency').innerHTML = `${allData.currency}`;
      document.getElementById('region').innerHTML = `- ${allData.region}`;
      document.getElementById('language').innerHTML = `${allData.language}`; 
      document.getElementById('icon').setAttribute("src", `https://www.weatherbit.io/static/img/icons/${allData.icon}.png`);
      document.getElementById('image').setAttribute("src",`${allData.image}`);
      document.getElementById("result").style.display = "flex";

    }catch(error){
      console.log('error', error);
    }
  }

 //Event listener to print the trip info
 document.getElementById("printbtn").addEventListener('click',printP);
 async function printP(){
  window.print();
 } 
  
 document.getElementById('generate').addEventListener('click', handleSubmit);
 async function handleSubmit(event) {
  event.preventDefault()

  //Calculate Trip Duration
  const countDown = document.getElementById("travel-date").value;
  let countDownDate = new Date(countDown).getTime();
  // Get today's date and time
  let now = new Date().getTime();      
  // Find the distance between now and the count down date
  let distance = countDownDate - now;
  

  newCity = document.getElementById('name').value
  Geourl = `http://api.geonames.org/searchJSON?q=${newCity}&maxRows=1&username=${GeoNamesAPI_KEY}`; 

  const TripD=await Client.TripDuration();
  
  //Make call to GeoNames API
  const geoData =await getInfo(Geourl);
  const geoRes = await postData('http://localhost:8081/addGeo',{
    latitude: geoData.geonames[0].lat,
    longitude: geoData.geonames[0].lng,
    country: geoData.geonames[0].countryName,
  });

  if (distance< 604800000) {
  
   //Make call to Current Weather API If the trip is within a week
   console.log(distance);
   weatherURL= `${currentWeatherURL}lat=${geoData.geonames[0].lat}&lon=${geoData.geonames[0].lng}&key=${weatherbitAPI_KEY}`;
   const weatherData =await getInfo(weatherURL);
   const weatherRes = await postData('http://localhost:8081/addweather',{
    temp: weatherData.data[0].temp,
    description: weatherData.data[0].weather.description,
    icon: weatherData.data[0].weather.icon
   });
   console.log("Current Weather API") 
   console.log(weatherData);
   console.log(weatherRes);
  }
  else{
   //Make call to Weather Forecast API If the trip is within more than a week
   console.log(distance);
   weatherURL=`${dailyForecastURL}lat=${geoData.geonames[0].lat}&lon=${geoData.geonames[0].lng}&key=${weatherbitAPI_KEY}`;
   const weatherData =await getInfo(weatherURL);
   const weatherRes = await postData('http://localhost:8081/addweather',{
    temp: weatherData.data[14].high_temp,
    description: weatherData.data[14].weather.description,
    icon: weatherData.data[14].weather.icon
   });
   console.log("Forecast API")  
   console.log(weatherData);
   console.log(weatherRes);
  }
  
  //Make call to Pixbay API 
  urlPixabay=`https://pixabay.com/api/?key=${PixabayAPI_KEY}&q=${newCity}&category=travel&image_type=photo`;
  const pixData =await getInfo(urlPixabay);
  const pixRes = await postData('http://localhost:8081/addPix',{
    image: pixData.hits[0].webformatURL
  });

  //Make call to RestCountries API 
  //restCountriesURL=`https://restcountries.eu/rest/v2/name/${geoData.geonames[0].countryName}`; 
  restCountriesURL=`https://api.countrylayer.com/v2/name/${geoData.geonames[0].countryName}?access_key=${countryAPI_KEY}&FullText=false`; 
  const restData =await getInfo(restCountriesURL);
  const restRes = await postData('http://localhost:8081/addCountry',{
    currency: restData[0].currencies[0].name,
    region: restData[0].subregion,
    language: restData[0].languages[0].name
  });
  await updateUI();
    
  
 }


}


export { init }
