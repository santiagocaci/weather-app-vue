<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { ref } from 'vue';

const text = ref('');
const isVisible = ref(false);
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div class="test" v-cloak>
    <p>Message is: {{ text }}</p>
    <input v-model="text" />
    <div v-if="isVisible" class="box-one">Is visible!!!</div>
    <div v-else-if="!isVisible" class="box-two">Is not visible!!!</div>
    <button @click="isVisible = !isVisible">Toggle Visible</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.test {
  display: flex;
  flex-direction: column;
}
.box-one {
  background: #42b883aa;
}
.box-two {
  background: #646cffaa;
}

[v-cloack] {
  display: none;
}
</style>
