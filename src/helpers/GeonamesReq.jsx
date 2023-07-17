import { CapacitorHttp } from '@capacitor/core';

const geonamesUsername = process.env.REACT_APP_GEONAMES_USERNAME;
const baseUrl = 'http://api.geonames.org';

const fetchCountryNames = async () => {
  const options = {
    url: `${baseUrl}/countryInfoJSON`,
    params: { username: geonamesUsername, },
  };
  try {
    const response = await CapacitorHttp.get(options);
    // Processar os resultados para extrair apenas os nomes dos países
    const countryNames = response.data.geonames.map(({ countryName, countryCode }) => {
      return {
        value: countryCode,
        label: countryName,
      }
    });
    return countryNames;
  } catch (error) {
    console.error('Erro ao buscar nomes dos países:', error);
    return [];
  }
};

export default fetchCountryNames;
