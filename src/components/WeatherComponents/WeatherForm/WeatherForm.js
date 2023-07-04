import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import fetchCountryNames from '../../../helpers/GeonamesReq';

const WeatherForm = () => {
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [countryOptions, setCountrys] = useState(null);

  const handleCountryChange = selectedCountry => {
    setCountry(selectedCountry);
  };

  const handleCityChange = event => {
    setCity(event.target.value);
  };

  const handleStateChange = event => {
    setState(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Faça a requisição à API utilizando os valores selecionados ou digitados
    console.log('País:', country);
    console.log('Cidade:', city);
    console.log('Estado:', state);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetchCountryNames();
      setCountrys(res);
    }
    fetchData();
  }, [])

  console.log(typeof countryOptions);

  return (
    <form onSubmit={handleSubmit}>
      {
        countryOptions ? (
          <>
            <div>
              <label>País:</label>
              <Select options={countryOptions} onChange={handleCountryChange} />
            </div>
            <div>
              <label>Cidade:</label>
              <input type="text" value={city} onChange={handleCityChange} />
            </div>
            <div>
              <label>Estado:</label>
              <input type="text" value={state} onChange={handleStateChange} />
            </div>
            <button type="submit">Buscar Clima</button>
          </>
          ) : null
      }
    </form>
  );
};

export default WeatherForm;
