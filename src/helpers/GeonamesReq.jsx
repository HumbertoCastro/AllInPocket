import axios from 'axios';

const geonamesUsername = 'humbertocastro';
const baseUrl = 'http://api.geonames.org';

const fetchCountryNames = async () => {
  try {
    const response = await axios.get(`${baseUrl}/countryInfoJSON`, {
      params: {
        username: geonamesUsername,
      },
    });
    // Processar os resultados para extrair apenas os nomes dos países
    const countryNames = response.data.geonames.map(({ countryName }) => {
      return {
        value: countryName,
        label: countryName,
      }
    });

    console.log(countryNames);
    return countryNames;
  } catch (error) {
    console.error('Erro ao buscar nomes dos países:', error);
    return [];
  }
};

export default fetchCountryNames;
