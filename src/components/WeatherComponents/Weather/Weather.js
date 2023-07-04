import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherForm from '../WeatherForm/WeatherForm';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  /*useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // Substitua pela sua própria chave de API
      const location = 'London'; // Substitua pela localização desejada

      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);*/

  /*if (!weatherData) {
    return <div>Loading...</div>;
  }*/

  return (
    <div>
      <WeatherForm />
    </div>
  );
};

export default Weather;

/*
      <h2>{weatherData.location.name}</h2>
      <img src={ weatherData.current.condition.icon } alt='weatherIcon' />
      <p>Temperature: {weatherData.current.temp_c}°C</p>
      <p>Humidity: {weatherData.current.humidity}%</p>*/