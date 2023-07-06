import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import WeatherForm from '../WeatherForm/WeatherForm';
import WeatherCard from '../WeatherCard/WeatherCard';
import { mockFutureWeather, weatherFake } from '../../../helpers/mockWeather';
import '../weather.css'
import Loading from '../../Inputs/Loading/Loading';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (location) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=yes&alerts=yes`);
      console.log(response);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (city) => {
    fetchData(city);
    setLoading(true);
  };

  return (
    <div>
      <WeatherForm callback={ handleClick } />
      {
        weatherData ? <WeatherCard weatherData={ weatherData } /> : null
      }
      {
        loading ? <Loading /> : null
      }
    </div>
  );
};

export default Weather;