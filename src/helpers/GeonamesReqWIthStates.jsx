import axios from 'axios';

const fetchCitiesByState = async (countryCode, stateCode) => {
  try {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", process.env.REACT_APP_API_KEY);

    var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
    };

    const res = fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, requestOptions)
    .then(response => response.json())
    .then(jsonres => jsonres.map((x) => {
      return {
        value: x.name,
        label: x.name,
      }
    }))
    .catch(error => error);
    return res;
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    return [];
  }
};

export default fetchCitiesByState;
