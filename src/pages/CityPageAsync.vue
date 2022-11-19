<script setup>
import { useRoute, useRouter } from 'vue-router';
import { uid } from 'uid';

import { openWeatherAPI } from '@/api/openWeatherAPI.js';
import { useLocalStorage } from '@/composables/useLocalStorage.js';
import {
  getCurrentTime,
  currentDate,
  currentTime,
  currentHour,
} from '@/utils/calcTime.js';

const route = useRoute();

const router = useRouter();

const { value: savedCities, setItem: setCities } =
  useLocalStorage('savedCities');

const getWeatherData = async () => {
  try {
    const { data: weatherData } = await openWeatherAPI.getWeatherData(
      route.query.lat,
      route.query.lon
    );
    // eslint-disable-next-line camelcase
    const { current, timezone_offset } = weatherData;

    weatherData.currentTime = getCurrentTime(current.dt, timezone_offset);

    weatherData.hourly.forEach(hourly => {
      hourly.currentTime = getCurrentTime(hourly.dt, timezone_offset);
    });
    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

const removeCity = () => {
  const updatedCities = savedCities.value.filter(
    city => city.city !== route.params.city && city.state !== route.params.state
  );
  setCities(updatedCities);
  router.push({
    name: 'home',
  });
};

const addCity = () => {
  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lon: route.query.lon,
    },
  };

  savedCities.value.push(locationObj);
  setCities(savedCities.value);

  const query = structuredClone(route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const roundTemp = temp => Math.round(temp);

const isSavedCity = () => {
  return savedCities.value.find(
    city => city.city === route.params.city && city.state === route.params.state
  );
};

const weatherData = await getWeatherData();
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <div
      v-if="!isSavedCity()"
      class="p-4 w-full text-center border bg-base-300"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city
      </p>
    </div>

    <div class="relative flex flex-col items-center text-white py-12">
      <div
        class="text-2xl absolute block -right-8 top-6 rounded-full px-2 py-1 cursor-pointer animate-pulse"
      >
        <i
          v-if="isSavedCity()"
          @click="removeCity()"
          class="fa-solid fa-trash duration-150 hover:text-error"
        ></i>
        <i
          v-else
          @click="addCity()"
          class="fa-solid fa-plus duration-150 hover:text-success"
        ></i>
      </div>

      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{ currentDate(weatherData.currentTime) }}
        {{ currentTime(weatherData.currentTime) }}
      </p>
      <p class="text-8xl mb-4">
        {{ roundTemp(weatherData.current.temp) }}&deg;C
      </p>
      <p class="text-xl">
        Thermal sensation {{ roundTemp(weatherData.current.feels_like) }}&deg;C
      </p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        :alt="weatherData.current.weather[0].description"
      />
    </div>

    <hr class="w-8/12 max-w-screen-md border border-success/20" />

    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8">
        <h2 class="text-3xl text-center sm:text-start mb-4">Hourly weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-2 items-center mb-2"
          >
            <p class="whitespace-nowrap text-lg">
              {{ currentHour(hourData.currentTime) }}
            </p>
            <img
              class="object-cover w-[50px] h-auto"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="whitespace-nowrap capitalize">
              {{ hourData.weather[0].description }}
            </p>
            <p class="text-xl">{{ roundTemp(hourData.temp) }} &deg;C</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="w-8/12 max-w-screen-md border border-success/20" />

    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8">
        <h2 class="text-3xl text-center sm:text-start mb-4">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center px-4 text-lg"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString('en-us', {
                weekday: 'long',
              })
            }}
          </p>
          <img
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
            class="w-[75px] object-cover"
          />
          <div
            class="flex flex-col sm:flex-row gap-2 justify-end sm:flex-1 ml-2"
          >
            <p class="text-end">H: {{ roundTemp(day.temp.max) }}</p>
            <p class="text-end">L: {{ roundTemp(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icons-enter-from,
.icons-leave-to {
  opacity: 0;
}
</style>
