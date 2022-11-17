<script setup>
import CityPageAsync from '@/pages/CityPageAsync.vue';
</script>
<template>
  <div>
    <Suspense>
      <CityPageAsync />
      <template #fallback>
        <p>loading...</p>
      </template>
    </Suspense>
  </div>
</template>
