import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import WeatherForm from '../WeatherForm/WeatherForm';
import WeatherCard from '../WeatherCard/WeatherCard';
import '../weather.css'
import Loading from '../../Inputs/Loading/Loading';
import pocketContext from '../../../context/pocketContext';
import { CapacitorHttp } from '@capacitor/core';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    fetchDataWeather, 
    setFetchData,
  } = useContext(pocketContext);

  const fetchData = async (location) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const options = {
      url: `http://api.weatherapi.com/v1/forecast.json`,
      params: { size: 'XL', "key": apiKey, "q": location, "days": 1, "aqi": "yes", "alerts": "yes" },
    };
    try {  
      const response = await CapacitorHttp.get(options);
      setWeatherData(response.data);
      setFetchData(response.data);
      setLoading(false);
    } catch (error) {
    }
  };

  const handleClick = (city) => {
    setLoading(true);
    fetchData(city);
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