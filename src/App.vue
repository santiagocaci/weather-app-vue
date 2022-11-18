<script setup>
import TheHeader from '@/components/TheHeader.vue';
// import {routerview} from 'vue-router'
</script>

<template>
  <div
    class="flex flex-col min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-300"
  >
    <TheHeader />
    <router-view v-slot="{ Component }">
      <transition
        name="page"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
