import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    units: 'metric',
  },
});

const getWeatherData = async (lat, lon) => {
  const weatherData = await instance({
    url: 'onecall',
    params: {
      lat,
      lon,
    },
  });
  return weatherData;
};

const getCurrentWeather = async (lat, lon) => {
  const weatherData = await instance({
    url: 'weather',
    params: {
      lat,
      lon,
    },
  });
  return weatherData;
};

export const openWeatherAPI = { getWeatherData, getCurrentWeather };
