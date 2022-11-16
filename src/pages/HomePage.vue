<script setup>
import { ref } from 'vue';
import axios from 'axios';

const searchQuery = ref('');
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);

const getSearchResults = () => {
  queryTimeout.value = setTimeout(async () => {
    clearTimeout(queryTimeout.value);
    if (searchQuery.value !== '') {
      const result = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          searchQuery.value
        }.json?access_token=${import.meta.env.VITE_MAPBOX_APY_KEY}&type=place`
      );
      mapboxSearchResults.value = result.data.features;
      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};
</script>

<template>
  <main class="container">
    <div class="pt-4 mb-8 relative">
      <input
        v-model="searchQuery"
        @input="getSearchResults"
        type="text"
        placeholder="Search for city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:outline-none"
      />
      <ul
        v-if="mapboxSearchResults"
        class="absolute bg-base-300 text-base-content w-full shadow-md py-2 px-1 top-[66px]"
      >
        <li
          class="py-2 cursor-pointer"
          v-for="item in mapboxSearchResults"
          :key="item.id"
        >
          {{ item.place_name }}
        </li>
      </ul>
    </div>
  </main>
</template>
