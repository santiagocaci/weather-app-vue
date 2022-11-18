<script setup>
import { ref } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import TheInfoContent from '@/components/TheInfoContent.vue';

const isModalActive = ref(null);

const toggleModal = () => (isModalActive.value = !isModalActive.value);

// const addCity = () => {
//   if (localStorage.getItem('savedCities')) {
//     savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
//   }
//   const locationObj = {
//     id: uid(),
//     state: route.params.state,
//     city: route.params.city,
//     coords: {
//       lat: route.query.lat,
//       lon: route.query.lon,
//     },
//   };

//   savedCities.value.push(locationObj);
//   localStorage.setItem('savedCities', JSON.stringify(savedCities.value));

//   const query = structuredClone(route.query);
//   delete query.preview;
//   query.id = locationObj.id;
//   router.replace({ query });
// };
</script>

<template>
  <header
    class="sticky top-0 z-10 bg-gradient-to-bl from-neutral to-base-100 shadow-md"
  >
    <nav
      class="container flex flex-row items-center gap-4 py-6 text-neutral-content"
    >
      <router-link to="/">
        <div class="flex items-center gap-3 text-2xl">
          <i class="fa-sharp fa-solid fa-sun"></i>
          <p>Weather App</p>
        </div>
      </router-link>

      <div class="flex gap-4 flex-1 justify-end">
        <i
          class="fa-sharp fa-solid fa-circle-info text-2xl cursor-pointer"
          @click="toggleModal"
        ></i>
      </div>

      <BaseModal
        :is-modal-open="isModalActive"
        @close-modal="toggleModal"
      >
        <TheInfoContent />
      </BaseModal>
    </nav>
  </header>
</template>
