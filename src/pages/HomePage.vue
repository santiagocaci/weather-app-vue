<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { mapBoxAPI } from '@/api/mapBoxAPI.js';
import CityList from '@/components/CityList.vue';
import CityListItemSkeleton from '@/components/CityListItemSkeleton.vue';

const router = useRouter();

const searchQuery = ref('');
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const previewCity = searchResult => {
  const [city, state] = searchResult.place_name.split(', ');
  router.push({
    name: 'cityPage',
    params: {
      state,
      city,
    },
    query: {
      lon: searchResult.geometry.coordinates[0],
      lat: searchResult.geometry.coordinates[1],
      preview: true,
    },
  });
};

const getSearchResults = () => {
  queryTimeout.value = setTimeout(async () => {
    clearTimeout(queryTimeout.value);
    mapboxSearchResults.value = null;
    if (searchQuery.value === '') return;
    try {
      const result = await mapBoxAPI.getPlaceByName(searchQuery.value);
      mapboxSearchResults.value = result.data.features;
      searchError.value = false;
    } catch (error) {
      searchError.value = true;
      console.log(error.message);
    }
  }, 500);
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
        v-if="mapboxSearchResults || searchError"
        class="absolute bg-base-300 text-base-content w-full shadow-md py-1 px-4 top-[66px]"
      >
        <p v-if="searchError">
          <i class="fa-solid fa-triangle-exclamation text-error pr-2"></i>
          Sorry, something went wrong, pleace try again
        </p>
        <p v-if="!searchError && mapboxSearchResults.length === 0">
          <i class="fa-solid fa-circle-exclamation text-info pr-2"></i>
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="item in mapboxSearchResults"
            :key="item.id"
            @click="previewCity(item)"
            class="py-2 cursor-pointer"
          >
            {{ item.place_name }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityListItemSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>
