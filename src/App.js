import './App.css';
import { useState, useEffect } from 'react';
import Search from './components/search/index.js';
import Button from './components/button/index.js';
import rain from './assets/images/rain.png';
import clouds from './assets/images/clouds.png';
import sun from './assets/images/sun.png';
import smoke from './assets/images/smoke.png'
import haze from './assets/images/haze.png'


function App() {
  const [data, dataWeather] = useState({})
  const [searchValue, setValue] = useState("")
  useEffect(() => {

    // Location base API
    navigator.geolocation.getCurrentPosition((location) => {
      const latitude = location.coords.latitude
      const longitude = location.coords.longitude
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=37d7833700d7008543f2669edb680a79&units=metric`)
        .then(response => response.json())
        .then(json => {
          dataWeather(json)
        })
    })
  }, [])

  //search base API
  const manualLocation = () => {
    let arr = searchValue;
    if (searchValue) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${arr}&appid=37d7833700d7008543f2669edb680a79&units=metric`)
        .then(response => response.json())
        .then(json => {
          dataWeather(json)
        })
      setValue("")
    }
  }

  const themeClass = (weather) => {
    let check = `listItem ${weather === "Clear" ? "" : weather === "Clouds" ? "clouds" : weather === "Smoke" ?
      "smoke" : weather === "Rain" ? "rain" : weather === "Haze" ? "haze" : ""}`
    return check;
  }

  let { main, name } = data;
  let weather = data.weather?.map((v, i) => { return v.main });


  if (weather) {
    weather = weather.pop()
  }

return (
    <div className="divBody">
      <div className="mainDiv">
        <div className="searchBox">
          <Search className="inputField" value={searchValue} onChange={(i) => setValue(i.target.value)} type="text"
            placeholder="Enter City Name" />
          <Button className="searchBtn" onClick={manualLocation}>Search</Button>
        </div>
        <h1>{name || "Not found"}</h1>
        <img className="weatherIcon" src={`${weather === "Clear" ? sun : weather === "Clouds" ? clouds : weather === "Smoke" ?
          smoke : weather === "Rain" ? rain : weather === "Haze" ? haze : ""}`} alt="" />
        <ul>
          <li className={themeClass(weather)}>Temperature: {Math.floor(main?.temp) || "not found"}</li>
          <li className={themeClass(weather)}>Humidity: {Math.floor(main?.humidity) || "not found"}</li>
          <li className={themeClass(weather)}>Feels_like: {Math.floor(main?.feels_like) || "not found"}</li>
          <li className={themeClass(weather)}>Weather: {weather || "not found"}</li>
        </ul>
      </div>
    </div>
  )
}

export default App;