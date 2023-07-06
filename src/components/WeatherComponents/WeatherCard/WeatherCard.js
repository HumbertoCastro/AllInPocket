import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import svgs from '../../../helpers/svg';
import pocketContext from '../../../context/pocketContext';


const WeatherCard = ({ weatherData }) => {
  const arrayHours = weatherData.forecast.forecastday[0].hour.map((x) => {
    const { chance_of_rain, temp_c, time } = x;
    return {
      rain: chance_of_rain,
      temp_c,
      icon: x.condition.icon,
      time: time.substr(time.length -5),
    }
  })

  const {
    theme,
  } = useContext(pocketContext);

  console.log(arrayHours);

  return (
    <>
    <div className='subs row s-evenly' >
      <div className='humidity scale-in-center' style={ { backgroundColor: theme.primaryColor, color: theme.textColor } }>
        {
          svgs.water()
        }
        <div>
          <p>
            {
              weatherData.current.humidity + '%'
            }
          </p>
          <p>humidity</p>
        </div>
      </div>
      <div className='humidity scale-in-center' style={ { backgroundColor: theme.primaryColor, color: theme.textColor } }>
        {
          svgs.wind()
        }
        <div>
          <p>
            {
              weatherData.current.wind_kph + 'km/h'
            }
          </p>
          <p>wind</p>
        </div>
      </div>
    </div>
    <div className='weather-div column s-evenly scale-in-center' style={ { backgroundColor: theme.primaryColor, color: theme.textColor } }>
      <h1>
        {
          weatherData.location.name
        }
      </h1>
      <p className='gray'>
        {
          `${weatherData.location.region}, ${weatherData.location.country}`
        }        
      </p>
      <h1>{ weatherData.current.condition.text }</h1>
      <img src={ weatherData.current.condition.icon } alt='condition img' />
      <div className='row temp-div'>
        <h1 className='temp'>
          {
            weatherData.current.temp_c + '°C'
          }
        </h1>
        <div className='line-v'></div>
        <h1 className='temp'>
          {
            weatherData.current.temp_f + '°F'
          }
        </h1>
      </div>
      {
        arrayHours.map((x) => {
          const { rain, temp_c, icon, time } = x;
          return (
            <div className='row s-evenly hourly-card'>
              <p>{ time }</p>
              <div className='img-div'>
                <img src={ icon } />
              </div>
              <h1>{ temp_c }°C</h1>
              <p>{ svgs.water() }{ rain }%</p>
            </div>
          )
        })
      }
    </div>
    </>
)};

WeatherCard.propTypes = {};

WeatherCard.defaultProps = {};

export default WeatherCard;
