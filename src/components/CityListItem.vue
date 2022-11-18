<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});

const roundTemp = temp => Math.round(temp);
</script>

<template>
  <div
    class="flex items-center py-5 px-3 bg-base-300 text-info-content rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1 gap-2">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3 class="">{{ city.state }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        {{ roundTemp(city.weather.main.temp) }}&deg;C
      </p>
      <div class="flex gap-2">
        <span>H: {{ roundTemp(city.weather.main.temp_max) }}</span>
        <span>M: {{ roundTemp(city.weather.main.temp_min) }}</span>
      </div>
    </div>
  </div>
</template>
