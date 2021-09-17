import React, { useState } from 'react';

const apiKey = { 
  key: "26da5c73fe5e9d9f520565e4253a0ddb", 
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weater, setWeather] = useState({})

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

    let day = days[date.getDay()]; 
    let completeDate = date.getDate(); 
    let month = months[date.getMonth()]; 
    let year = date.getFullYear(); 

    return `${day} ${completeDate} ${month} ${year}`;
  }

  return (
    <div className="app">
      <main>
        <div className = "search-box">
          <input 
          type="text"
          className ="search-bar"
          placeholder = "Search..."
          onChange = {event => setQuery(event.target.value)}
          value = {query}
          onKeyPress={search}
          />
        </div>
        <div className ="location-box">
          <div className ="location">Sibculo, EU</div>
          <div className = "date">{dateBuilder(new Date())}</div>
        </div>
        <div className = "weather-box">
          <div className="temperature">15℃</div>
          <div className="weather">Sunny</div>
        </div>
      </main>
    </div>
  );
}

export default App;

//https://www.youtube.com/watch?v=GuA0_Z1llYU