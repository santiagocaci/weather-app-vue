<script setup>
defineProps({
  isModalOpen: { type: Boolean, default: false },
});

defineEmits(['closeModal']);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-box">
      <div
        v-show="isModalOpen"
        class="absolute z-20 w-full bg-black/30 h-screen top-0 left-0 flex justify-center px-8"
      >
        <Transition name="modal-content">
          <div
            class="p-6 bg-gradient-to-r from-base-100 via-base-200 to-base-300 rounded-xl self-start mt-32 max-w-screen-md"
            v-if="isModalOpen"
          >
            <slot />
            <div class="text-end mt-2">
              <button
                class="btn btn-success"
                @click.stop="$emit('closeModal')"
              >
                Close
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-box-enter-active,
.modal-box-leave-active {
  transition: opacity 0.5s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-box-enter-from,
.modal-box-leave-to {
  opacity: 0;
}

.modal-content-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-content-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-content-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-content-leave-to {
  transform: scale(0.8);
}
</style>
