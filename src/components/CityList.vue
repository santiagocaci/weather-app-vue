<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { openWeatherAPI } from '@/api/openWeatherAPI.js';
import CityListItem from '@/components/CityListItem.vue';

const savedCities = ref([]);
const router = useRouter();

const getCities = async () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'));

    const request = savedCities.value.map(({ coords }) => {
      return openWeatherAPI.getCurrentWeather(coords.lat, coords.lon);
    });

    const weatherData = await Promise.all(request);
    weatherData.forEach(
      (value, index) => (savedCities.value[index].weather = value.data)
    );
  }
};

await getCities();

const toCityPage = city => {
  router.push({
    name: 'cityPage',
    params: {
      state: city.state,
      city: city.city,
    },
    query: {
      lon: city.coords.lon,
      lat: city.coords.lat,
      id: city.id,
    },
  });
};
</script>

<template>
  <div
    v-for="city in savedCities"
    :key="city.id"
  >
    <CityListItem
      :city="city"
      @click="toCityPage(city)"
    />
  </div>

  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above
  </p>
</template>
