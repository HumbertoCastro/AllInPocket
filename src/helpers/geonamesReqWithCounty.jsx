import { CapacitorHttp } from '@capacitor/core';

const fetchStatesByCountry = async (countryCode) => {

  try {
    //const headers = new Headers();
    //headers.append("X-CSCAPI-KEY", process.env.REACT_APP_API_KEY);

    const options = {
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      headers: {"X-CSCAPI-KEY": process.env.REACT_APP_API_KEY},
      params: { size: 'XL' },
    };

      
    const response = await CapacitorHttp.get(options);
    return response.data.map((x) => {
      return {
        value: x.iso2,
        label: x.name,
      }
    });
  } catch (error) {
    console.error('Erro ao buscar estados:', error);
    return [];
  }
};

export default fetchStatesByCountry;
