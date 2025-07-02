<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const tab = ref<'movie' | 'tv'>(route.query.tab === 'tv' ? 'tv' : 'movie');
const page = ref<number>(Number(route.query.page || 1));

const { getTrending } = useTMDB();

const { data: items, pending } = await useAsyncData(() =>
  getTrending(tab.value, page.value),
{ watch: [tab, page] },
);

watch(tab, () => {
  router.push({ query: { tab: tab.value, page: 1 } });
  page.value = 1;
});
watch(page, p => router.push({ query: { tab: tab.value, page: p } }));

const totalPages = computed(() => items.value?.total_pages || 1);
</script>

<template>
  <div class="flex flex-col w-full gap-6">
    <!-- Tabs -->
    <AnimatedTabs
      v-model="tab"
      :options="[
        { value: 'movie', label: 'Movies' },
        { value: 'tv', label: 'TV Shows' },
      ]"
    />

    <div
      v-if="pending"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
    >
      <SkeletonCard
        v-for="n in 10"
        :key="n"
      />
    </div>

    <!-- Grid -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
    >
      <MovieCard
        v-for="m in items.results"
        :key="m.id"
        :media-id="m.id"
        :media-type="tab"
        :title="m.title || m.name"
        :img-url="`https://image.tmdb.org/t/p/w300/${m.poster_path}`"
        :vote-average="m.vote_average"
      />
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="flex justify-center gap-2 mt-4"
    >
      <BaseButton
        variant="secondary"
        :disabled="page <= 1"
        @click="page--"
      >
        Prev
      </BaseButton>

      <span class="px-4 py-1">{{ page }} / {{ totalPages }}</span>

      <BaseButton
        variant="secondary"
        :disabled="page >= totalPages"
        @click="page++"
      >
        Next
      </BaseButton>
    </div>
  </div>
</template>
