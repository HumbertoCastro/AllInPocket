import axios from 'axios';

const geonamesUsername = 'humbertocastro';
console.log(process.env.GEONAMES_USERNAME)
const baseUrl = 'http://api.geonames.org';

const fetchCountryNames = async () => {
  try {
    console.log(process.env.GEONAMES_USERNAME)
    const response = await axios.get(`${baseUrl}/countryInfoJSON`, {
      params: {
        username: geonamesUsername,
      },
    });
    console.log(response);
    // Processar os resultados para extrair apenas os nomes dos países
    const countryNames = response.data.geonames.map(({ countryName, countryCode }) => {
      return {
        value: countryCode,
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
