<script setup lang="ts">
interface Props {
  mediaId: number | string;
  mediaType: 'movie' | 'tv';
  title: string;
  imgUrl: string;
  voteAverage: number;
}

defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="`/trending/${mediaType}/${mediaId}`"
    class="block bg-[#1f1f1f] rounded-lg shadow group hover:shadow-lg transition-shadow duration-200 overflow-hidden shadow-gray-900/50"
  >
    <div class="aspect-[2/3] overflow-hidden">
      <img
        :src="imgUrl"
        :alt="title"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-120 transition-transform duration-500"
      >
    </div>

    <div class="p-2 text-center">
      <h3 class="text-sm mb-1 lg:text-base truncate">{{ title }}</h3>
      <p class="text-xs text-gray-400 ">⭐ {{ voteAverage.toFixed(1) }}</p>
    </div>

    <slot />
  </NuxtLink>
</template>
