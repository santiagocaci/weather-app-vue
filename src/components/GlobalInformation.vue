<script setup>
import CardInfo from '@/components/CardInfo.vue';

const props = defineProps({
  isLoadingData: { type: Boolean, default: true },
  newConfirmed: { type: Number, default: 0 },
  newDeaths: { type: Number, default: 0 },
  totalConfirmed: { type: Number, default: 0 },
  totalDeaths: { type: Number, default: 0 },
});
</script>

<template>
  <article class="mt-5">
    <h2 class="text-center text-2xl font-semibold text-neutral-content">
      Global Information
    </h2>
    <div
      v-if="!props.isLoadingData"
      class="w-4/6 py-5 mx-auto space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0"
    >
      <CardInfo :info="props.newConfirmed" title="New Confirmed" emoji="🤧" />

      <CardInfo :info="props.newDeaths" title="New Deaths" emoji="💀" />

      <CardInfo
        :info="props.totalConfirmed"
        title="Total Confirmed"
        emoji="🤒"
      />

      <CardInfo :info="props.totalDeaths" title="Total Deaths" emoji="☠" />
    </div>
  </article>
</template>
