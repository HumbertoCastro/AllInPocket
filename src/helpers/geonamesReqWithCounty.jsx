import axios from 'axios';

const fetchStatesByCountry = async (countryCode) => {
  try {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "VHpUb0p0djBVWkZFODRGbTBxZFMzWjYxY2s1MDhrV2c3N0ZvT3IwaA==");

    var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
    };

    const res = fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, requestOptions)
    .then(response => response.json())
    .then(jsonres => jsonres.map((x) => {
      return {
        value: x.iso2,
        label: x.name,
      }
    }))
    .catch(error => error);
    return res;
  } catch (error) {
    console.error('Erro ao buscar estados:', error);
    return [];
  }
};

export default fetchStatesByCountry;
