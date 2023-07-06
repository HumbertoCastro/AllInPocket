import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import fetchCountryNames from '../../../helpers/GeonamesReq';
import fetchStatesByCountry from '../../../helpers/geonamesReqWithCounty';
import fetchCitiesByState from '../../../helpers/GeonamesReqWIthStates';
import pocketContext from '../../../context/pocketContext';
import Loading from '../../Inputs/Loading/Loading';

const WeatherForm = ({callback}) => {
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

  async function handleCountryChange({ value }) {
    setShowCities(false);
    setShowStates(false);
    setCountry(value);
    const res = await fetchStatesByCountry(value);
    console.log(res)
    setStateOptions(res);
    setShowStates(true);
  };

  async function handleCityChange({ value }) {
    setCity(value);
    console.log(value);
  }

  async function handleStateChange({ value }) {
    setShowCities(false);
    setState(value);
    const res = await fetchCitiesByState(country, value);
    setCitiesOptions(res);
    setShowCities(true);
  };
  async function fetchData() {
    const res = await fetchCountryNames();
    setCountrys(res);
  }

  async function fetchDataWithCountry (country) {

  }

  useEffect(() => {
    fetchData();
  }, [])

  console.log(typeof countryOptions);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      callback(city);
    }}>
      {
        countryOptions ? (
          <>
            <div className='scale-in-center'>
              <label style={ { color: theme.textColor } }>Country:</label>
              <Select options={countryOptions} onChange={handleCountryChange} />
            </div>
            {
              showStates ? 
              <div className='scale-in-center'>
                <label style={ { color: theme.textColor } }>State:</label>
                <Select options={stateOptions} onChange={handleStateChange} />
              </div> : null
            }
            {
              showCities ? 
              <div className='scale-in-center'>
                <label style={ { color: theme.textColor } }>City:</label>
                <Select options={citiesOptions} onChange={handleCityChange} />
              </div> : null
            }
            {
              city && country && state ? <button type="submit" className='btn-search scale-in-center'>Buscar Clima</button> : null
            }
          </>
          ) : <Loading />
      }
    </form>
  );
};

export default WeatherForm;
