<script setup>
import { useRoute } from 'vue-router';
import { openWeatherAPI } from '@/api/openWeatherAPI.js';
import { getCurrentTime } from '@/utils/calcTime.js';

const route = useRoute();
const { query } = route;

const getWeatherData = async () => {
  try {
    const { data: weatherData } = await openWeatherAPI.getWeatherData(
      query.lat,
      query.lon
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

const weatherData = await getWeatherData();

const currentDate = () =>
  new Date(weatherData.currentTime).toLocaleDateString('es-ar', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
  });

const currentTime = () =>
  new Date(weatherData.currentTime).toLocaleTimeString('es-AR', {
    timeStyle: 'short',
  });

const currentHour = hour =>
  new Date(hour).toLocaleTimeString('en-us', { hour: '2-digit' });

const roundTemp = temp => Math.round(temp);
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <div
      v-if="route.query.preview"
      class="p-4 w-full text-center border bg-base-300"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city
      </p>
    </div>

    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">{{ currentDate() }} {{ currentTime() }}</p>
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
        <h2 class="text-3xl mb-4">Hourly weather:</h2>
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
        <h2 class="text-3xl mb-4">7 Day Forecast:</h2>
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
          <div class="flex gap-2 justify-end flex-1">
            <p>H: {{ roundTemp(day.temp.max) }}</p>
            <p>L: {{ roundTemp(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
