<script setup lang="ts">
const route = useRoute();
const { getDetails } = useTMDB();
const { data } = await useAsyncData(() =>
  getDetails(route.params.mediaType as string, route.params.mediaId as string),
);

const { uid } = useCurrentUser();
const { addBookmark } = useBookmarks();

const loading = ref(false);

const handleAdd = async () => {
  if (!uid.value) return navigateTo(`/login?redirect=${encodeURIComponent(route.fullPath)}`);
  loading.value = true;

  try {
    await addBookmark({
      mediaId: data.value.id,
      mediaType: route.params.mediaType,
      title: data.value.title || data.value.name,
      poster_path: data.value.poster_path,
      vote_average: data.value.vote_average,
    });

    await navigateTo('/bookmarks');
  } catch (error) {
    console.error('Failed to add bookmark:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <article class="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 md:mt-6">
    <img
      :src="`https://image.tmdb.org/t/p/w500/${data.poster_path}`"
      :alt="data.title || data.name"
      loading="lazy"
      class="w-full rounded"
    >
    <div>
      <h1 class="text-2xl font-bold mb-2">
        {{ data.title || data.name }}
      </h1>
      <p class="text-gray-300 mb-4">
        {{ data.overview }}
      </p>
      <p class="mb-2">
        ⭐ {{ data.vote_average.toFixed(1) }} · {{ data.release_date || data.first_air_date }}
      </p>

      <BaseButton
        variant="danger"
        class="mt-5"
        :disabled="loading"
        @click="handleAdd"
      >
        Add to bookmarks
      </BaseButton>
    </div>
  </article>
</template>
