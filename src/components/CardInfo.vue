<script setup>
const props = defineProps({
  info: { type: Number, default: 0 },
  title: { type: String, default: '' },
  emoji: { type: String, default: '' },
});
</script>

<template>
  <div
    class="w-auto rounded-2xl text-xl text-info-content text-center bg-info p-4 shadow-md shadow-info"
  >
    <h2 class="font-bold">{{ props.title }} {{ emoji }}</h2>
    <p class="">{{ props.info }}</p>
  </div>
</template>
