
import axios from 'axios';
import React, { useState } from 'react';


const Weather = () => {
  const[city,setCity] = useState('')
  const[weather,setWeather] = useState(null)
  const[error,setError] = useState('')

  const apiKey = 'a634410a737e1ce9c42e2f0fa383bc81'

  const fetchweather = async (city) => {
    try{
      const  response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      setWeather(response.data)
      setError('')
    }catch (error) {
    setError('City not found. Please try Again')
    setWeather(null)
  }
  }
  const submitHandler = (e) => {
    e.preventDefault();
    fetchweather(city);
  }
  return (
    <div className='weather-container'>
      <h1>Weather App</h1>
      <form onSubmit={submitHandler}>
        <input 
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter City"
        required
        />
        <button type='Submit'>Get Weather</button>
      </form>

      {error && <p>{error}</p>}
      {weather && 
      <div className='weather-info'>
        <h2>{weather.name}</h2>
        <h2>Temperature : {weather.main.temp}C</h2>
        <h2>Weather : {weather.weather[0].description}</h2>
        <h2>Humidity : {weather.main.humidity}%</h2>
        <h2>Wind Speed : {weather.wind.speed}m/s</h2>
      </div>
      }
    </div>
  );
};

export default Weather;


