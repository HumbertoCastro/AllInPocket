import { CapacitorHttp } from '@capacitor/core';

const fetchCitiesByState = async (countryCode, stateCode) => {
  try {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", process.env.REACT_APP_API_KEY);

    const options = {
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      headers: headers,
      params: { size: 'XL' },
    };

      
    const response = await CapacitorHttp.get(options);
    return response.data.map((x) => {
      return {
        value: x.name,
        label: x.name,
      }
    });
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    return [];
  }
};

export default fetchCitiesByState;
