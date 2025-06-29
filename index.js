let lat = 0
let long =0

let searchInput=document.getElementById('searchLocationInput');
let searchBtn=document.getElementById('searchBtn');



function getCurrentUserCoordinates() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      getCurrentWeather(`${lat},${long}`);
      getThreeDaysForecast(`${lat},${long}`);
    },
    function () {//San Francisco's latitude and longtitude by default
      lat = Number(37.77493);
      long = Number(-122.41942);
      getCurrentWeather(`${lat},${long}`);
      getThreeDaysForecast(`${lat},${long}`);
      
    }
  );
}
async function getCurrentWeather(q){
 
   try{
    const response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7eaed01f06254803bc8224352252006&q=${q}&days=4`);
    const data=await response.json();
    let date=new Date(`${data.current.last_updated}`);
  
    
    
   

   
    document.getElementById('countryName').innerHTML=` <h1 class="country-name display-3 fw-medium" >
             ${data.location.region}
            </h1>
            <p class="date" id="date">${date.toLocaleDateString('en-US',{weekday:'long'})}, ${date.toLocaleDateString('en-us',{month:'long'})} ${date.getDate()}</p>`;
   
    document.getElementById('currentWeatherCard').innerHTML=`
    <div
                class="weather-card bg-card p-5 rounded-5 col-12 col-md-6 shadow"
              >
                <span
                  class="bg-day text-center text-white rounded-pill p-2 mb-2"
                  >TODAY</span
                >
                <div>
                  <img
                    src="${data.current.condition.icon}"
                    alt="weather-condtion"
                    class="weather-cond-img w-100"
                  />
                </div>
                <h2
                  class="tempreture fs-2 text-white text-center position-relative"
                >
                  ${data.current.temp_c} <span class="fs-6 position-absolute top-0">o</span>
                  <span class="fs-2 d-inline-block ms-2">C</span>
                </h2>
                <ul class="list-unstyled mt-2 text-white">
                  <li>
                    <i class="fa-solid fa-wind fs-4 text-white ms-2 mx-2"></i
                    >${data.current.wind_kph} km/h
                  </li>
                  <li>
                    <i
                      class="fa-solid fa-umbrella fs-4 text-white mt-2 mx-2"
                    ></i
                    >${data.current.cloud}%
                  </li>
                </ul>
              </div>
    `;
    
 
    }catch{
  document.getElementById('alertLocation').classList.replace("d-none","d-flex");
   }

    
    
}

async function getThreeDaysForecast(q){
   try{
     const response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7eaed01f06254803bc8224352252006&q=${q}&days=4`);
    const data=await response.json();
    
    
     
    let cartona=``;
    for(let i=1;i<data.forecast.forecastday.length;i++){
       let date=new Date(`${data.forecast.forecastday[i].date}`);
     
       
        cartona=cartona+`
         <div class="inner col-md-4 p-5">
 
          <div class="weather-card bg-nextdays p-5 rounded-5 shadow card-hover">
                <span id="weatherDay"
                  class="bg-day text-center text-white rounded-pill p-2 mb-2"
                  >${date.toLocaleDateString('en-US',{weekday:'long'})}</span
                >
                <div>
                  <img
                    src="${data.forecast.forecastday[i].day.condition.icon}"
                    alt="weather-condtion"
                    class="weather-cond-img w-100"
                  />
                </div>
                <h2
                  class="tempreture fs-2 text-black text-center position-relative"
                >
                ${data.forecast.forecastday[i].day.avgtemp_c} <span class="fs-6 position-absolute top-0">o</span>
                  <span class="fs-2 d-inline-block ms-2">C</span>
                </h2>
                <ul class="list-unstyled mt-2 text-black">
                  <li>
                    <i class="fa-solid fa-wind fs-4 text-black ms-2 mx-2"></i
                    >${data.forecast.forecastday[i].day.maxwind_kph} km/h
                  </li>
                  <li>
                    <i
                      class="fa-solid fa-umbrella fs-4 text-black mt-2 mx-2"
                    ></i
                    >${data.forecast.forecastday[1].day.daily_chance_of_rain}%
                  </li>
                </ul>
              </div>
        </div>
        `;
      
        
    }
    document.getElementById('row').innerHTML=cartona;}
   catch{
  document.getElementById('row').innerHTML=`
           <div id="alertLocation" class="alert alert-danger " role="alert">
 location not identfied , try again later!
</div>
  `;
   }
     
}

searchBtn.addEventListener('click',function(e){
  e.preventDefault();
   document.getElementById("alertLocation").classList.replace('d-flex','d-none');
   if(searchInput.value.trim()==``){
 getCurrentWeather(`${lat},${long}`);
      getThreeDaysForecast(`${lat},${long}`);
   }else{
getCurrentWeather(searchInput.value);
getThreeDaysForecast(searchInput.value);
   }
});

//Get User Location and forecast
 getCurrentUserCoordinates();


  

