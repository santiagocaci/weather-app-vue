<script setup>
import { onMounted, ref } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import GlobalInformation from '@/components/GlobalInformation.vue';

const isLoading = ref(true);
const countries = ref([]);
const date = ref('');
const global = ref({
  newConfirmed: 0,
  newDeaths: 0,
  totalConfirmed: 0,
  totalDeaths: 0,
});

async function fetchCovidData() {
  const response = await fetch('https://api.covid19api.com/summary');
  const data = await response.json();
  return data;
}

onMounted(async () => {
  // const data = await fetchCovidData();
  const { Countries, Date, Global } = await fetchCovidData();
  countries.value = Countries;
  date.value = Date;

  global.value.newConfirmed = Global.NewConfirmed;
  global.value.newDeaths = Global.NewDeaths;
  global.value.totalConfirmed = Global.TotalConfirmed;
  global.value.totalDeaths = Global.TotalDeaths;
  isLoading.value = false;
});
</script>

<template>
  <HeaderComponent />

  <GlobalInformation
    :is-loading-data="isLoading"
    :new-confirmed="global.newConfirmed"
    :new-deaths="global.newDeaths"
    :total-confirmed="global.totalConfirmed"
    :total-deaths="global.totalDeaths"
  />
  <!-- <div v-else>
    <progress class="progress w-56"></progress>
  </div> -->
</template>
