import React, { useState } from 'react';

//Should be in .env file but this can be public for now. 
const apiKey = { 
  key: "26da5c73fe5e9d9f520565e4253a0ddb", 
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})

  const search = event => {
    if (event.key === 'Enter') { 
       fetch(`${apiKey.base}weather?q=${query}&units=metric&APPID=${apiKey.key}`)
      .then (res => res.json())
      .then (result => { 
        setQuery("");
        setWeather(result);
        console.log(result)
      }); 
    };
  };

  const dateBuilder = (date) => { 
    let months = ['January', "Februari", "March", "April", "May", "June", "July",
                  "August", "September", "Oktober", "November", "December"]; 
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]; 

    let day = days[date.getDay() - 1]; 
    let completeDate = date.getDate(); 
    let month = months[date.getMonth()]; 
    let year = date.getFullYear(); 

    return `${day} ${completeDate} ${month} ${year}`;
  }

  return (
    <div className= {(typeof weather.main != "undefined" ? (weather.main.temp <= 5 ? "app winter" : 
                      weather.main.temp < 12 && weather.main.temp > 5 ? "app authumn" :
                      weather.main.temp > 12 && weather.main.temp < 20 ? "app spring" : 
                      "app summer") : 'app')} >
      <main>
        <div className = "search-box">
          <input 
          type="text"
          className ="search-bar"
          placeholder = "Search for city..."
          onChange = {event => setQuery(event.target.value)}
          value = {query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className ="location-box">
            <div className ="location">{weather.name}, {weather.sys.country}</div>
            <div className = "date">{dateBuilder(new Date())}</div>
          </div>
          <div className = "weather-box">
            <div className="temperature">{Math.floor(weather.main.temp)}℃</div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        </div>
       ) : ('')}
      </main>
    </div>
  );
}

export default App;
