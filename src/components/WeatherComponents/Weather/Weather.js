import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import WeatherForm from '../WeatherForm/WeatherForm';
import WeatherCard from '../WeatherCard/WeatherCard';
import { mockFutureWeather, weatherFake } from '../../../helpers/mockWeather';
import '../weather.css'
import Loading from '../../Inputs/Loading/Loading';
import pocketContext from '../../../context/pocketContext';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    fetchDataWeather, 
    setFetchData,
  } = useContext(pocketContext);

  const fetchData = async (location) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=yes&alerts=yes`);
      setWeatherData(response.data);
      setFetchData(response.data);
      setLoading(false);
    } catch (error) {
    }
  };

  const handleClick = (city) => {
    fetchData(city);
    setLoading(true);
  };

  return (
    <div>
    <WeatherForm callback={ handleClick } setLoad={ setLoading } />
      {
        !fetchDataWeather ? 
        <>
          {
            weatherData ? <WeatherCard weatherData={ weatherData } /> : null
          }
          {
            loading ? <Loading /> : null
          }
        </> : <WeatherCard weatherData={ fetchDataWeather } />
      }
    </div>
  );
};

export default Weather;