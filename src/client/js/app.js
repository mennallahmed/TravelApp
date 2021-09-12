function init (){

  const userName="mennaallah";
  let newCity='';
  let Geourl = '';
  let departing="";
  departing=document.getElementById("travel-date").value;
  let data = {};

  
 document.getElementById('generate').addEventListener('click', handleSubmit);
 function handleSubmit(event) {
   event.preventDefault()
    
    
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
/*const getApiKey = async () =>{
  const req = await fetch('http://localhost:8081/api');
  data = await req.json();
  apiKey = data.key;
  return apiKey;
}*/

  const getInfo= async (Geourl)=>{
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

  const updateUI = async () => {
    const request = await fetch('http://localhost:8081/all');
    try {
      const allData = await request.json();
      console.log(allData);
      document.getElementById('agreement').innerHTML = `Latitude: ${allData.latitude}`;
      document.getElementById('subjectivity').innerHTML = `Longitude: ${allData.longitude}`;
      document.getElementById('confidence').innerHTML = `Country: ${allData.country}`;
    }catch(error){
      console.log('error', error);
    }
  }

  newCity = document.getElementById('name').value
  Geourl = `http://api.geonames.org/searchJSON?q=${newCity}&maxRows=1&username=${userName}`; 
  
  Client.TripDuration();
  getInfo(Geourl)
  .then((data) => {
  postData('http://localhost:8081/addText',{
      latitude: data.geonames[0].lat,
      longitude: data.geonames[0].lng,
      country: data.geonames[0].countryName,})
  })
  .then(() => updateUI());

 }

}


export { init }
