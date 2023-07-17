import React, { useContext, useEffect, useState } from 'react';
import fetchCountryNames from '../../../helpers/GeonamesReq';
import fetchStatesByCountry from '../../../helpers/geonamesReqWithCounty';
import fetchCitiesByState from '../../../helpers/GeonamesReqWIthStates';
import pocketContext from '../../../context/pocketContext';
import Loading from '../../Inputs/Loading/Loading';

const WeatherForm = ({callback, setLoad}) => {
  const {
    theme,
  } = useContext(pocketContext);

  const [country, setCountry] = useState(null);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [countryOptions, setCountrys] = useState(null);
  const [showStates, setShowStates] = useState(false);
  const [stateOptions, setStateOptions] = useState(null);
  const [showCities, setShowCities] = useState(false);
  const [citiesOptions, setCitiesOptions] = useState(null);

  async function handleCountryChange({ target: { value } }) {
    setShowCities(false);
    setShowStates(false);
    setCountry(value);
    setLoad(true);
    console.log(value);
    const res = await fetchStatesByCountry(value);
    setLoad(false);
    console.log(res)
    setStateOptions(res);
    setShowStates(true);
  };

  async function handleCityChange({ target: { value } }) {
    setCity(value);
    console.log(value);
  }

  async function handleStateChange({ target: { value } }) {
    setShowCities(false);
    setState(value);
    setLoad(true);
    const res = await fetchCitiesByState(country, value);
    setLoad(false);
    setCitiesOptions(res);
    setShowCities(true);
  };
  async function fetchData() {
    setLoad(true);
    const res = await fetchCountryNames();
    setLoad(false);
    setCountrys(res);
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      callback(city);
    }}>
      {
        countryOptions ? (
          <>
            <div className='scale-in-center select-div colunm s-btw'>
              <label style={ { color: theme.textColor } }>Country:</label>
              <select onChange={handleCountryChange} className='select-cep' style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
                <option value=''>Select Country</option>
                {
                  countryOptions.map(({ value, label }) => (<option value={ value }>{ label }</option>))
                }
              </select>
            </div>
            {
              showStates ? 
              <div className='scale-in-center select-div colunm s-btw'>
                <label style={ { color: theme.textColor } }>State:</label>
                <select onChange={handleStateChange} className='select-cep' style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
                <option value=''>Select State</option>
                  {
                    stateOptions.map(({ value, label }) => (<option value={ value }>{ label }</option>))
                  }
                </select>
              </div> : null
            }
            {
              showCities ? 
              <div className='scale-in-center select-div colunm s-btw'>
                <label style={ { color: theme.textColor } }>City:</label>
                <select onChange={handleCityChange} className='select-cep' style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
                <option value=''>Select City</option>
                  {
                    citiesOptions.map(({ value, label }) => (<option value={ value }>{ label }</option>))
                  }
                </select>
              </div> : null
            }
            {
              city && country && state ? <button
                type="submit"
                className='btn-search scale-in-center'
                style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
              >Fetch Weather</button> : null
            }
          </>
          ) : <Loading />
      }
    </form>
  );
};

export default WeatherForm;
