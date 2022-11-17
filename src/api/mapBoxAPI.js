import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
  params: {
    access_token: import.meta.env.VITE_MAPBOX_API_KEY,
  },
});

const getPlaceByName = async name => {
  const result = await instance({
    url: `${name}.json`,
    method: 'get',
    params: {
      types: 'place',
    },
  });

  return result;
};

export const mapBoxAPI = { getPlaceByName };
