import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
  },
});

const getWeatherData = async (lat, lon) => {
  const weatherData = await instance({
    url: 'onecall',
    params: {
      lat,
      lon,
      units: 'metric',
    },
  });
  return weatherData;
};

export const openWeatherAPI = { getWeatherData };
