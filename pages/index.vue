<template>
  <div class="flex flex-1 flex-col gap-5 md:gap-8 text-center items-center justify-center">
    <h1 class="text-3xl md:text-5xl font-bold">
      Explore Popular Movies and TV Shows
    </h1>
    <p class="text-lg text-gray-300 max-w-2xl mx-auto">
      Powered by TMDB. Bookmark your favorites. Enjoy responsive, dark-mode ready UI.
    </p>
    <div class="flex flex-col md:flex-row justify-center gap-4">
      <BaseButton
        variant="danger"
        @click="navigateTo('/trending?tab=movie&page=1')"
      >
        View Trending Movies
      </BaseButton>
      <BaseButton
        variant="danger"
        @click="navigateTo('/trending?tab=tv&page=1')"
      >
        View Trending TV Shows
      </BaseButton>
      <BaseButton
        variant="danger"
        @click="navigateTo('/bookmarks')"
      >
        Bookmarks
      </BaseButton>
    </div>
  </div>
</template>
