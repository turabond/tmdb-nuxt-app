<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const { items, loading, removeBookmark } = useBookmarks();

const handleRemove = async (id: string | number) => {
  await removeBookmark(id);
};
</script>

<template>
  <div class="py-6">
    <h1 class="text-2xl font-bold mb-6 text-center">
      Your Bookmarks
    </h1>
    <!-- Loader -->
    <div
      v-if="loading"
      class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4"
    >
      <SkeletonCard
        v-for="n in 6"
        :key="n"
      />
    </div>

    <!-- Empty -->
    <div
      v-else-if="items.length === 0 && !loading"
      class="text-center text-gray-400"
    >
      No bookmarks yet.
    </div>

    <!-- List -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4"
    >
      <div
        v-for="b in items"
        :key="b.id"
        class="relative group"
      >
        <MovieCard
          :media-id="b.mediaId"
          :media-type="b.mediaType"
          :title="b.title"
          :img-url="`https://image.tmdb.org/t/p/w300/${b.poster_path}`"
          :vote-average="b.vote_average"
        />
        <BaseButton
          variant="danger"
          class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 px-2 py-1 text-xs"
          @click="handleRemove(b.id)"
        >
          Remove
        </BaseButton>
      </div>
    </div>
  </div>
</template>
