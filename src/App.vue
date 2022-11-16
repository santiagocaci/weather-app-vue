<script setup>
import TheHeader from '@/components/TheHeader.vue';
// import {routerview} from 'vue-router'
</script>

<template>
  <div
    class="flex flex-col min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-300"
  >
    <TheHeader />
    <router-view></router-view>
  </div>
</template>
