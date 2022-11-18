<script setup>
import CityPageAsync from '@/pages/CityPageAsync.vue';
import CityPageSkeleton from '@/components/CityPageSkeleton.vue';
</script>
<template>
  <div>
    <Suspense>
      <CityPageAsync />
      <template #fallback>
        <CityPageSkeleton />
      </template>
    </Suspense>
  </div>
</template>
