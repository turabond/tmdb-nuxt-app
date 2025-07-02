<script setup lang="ts">
interface TabOption { value: string; label: string }
interface Props {
  modelValue: string;
  options: TabOption[];
  className?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>();

const tabEls = ref<HTMLElement[]>([]);
const setTabRef = (el: HTMLElement | null, idx: number) => {
  if (el) tabEls.value[idx] = el;
};

/* reactive offset + width */
const left = ref(0);
const width = ref(0);

const recalc = () => {
  const idx = props.options.findIndex(o => o.value === props.modelValue);
  const el = tabEls.value[idx];
  if (el) {
    left.value = el.offsetLeft;
    width.value = el.offsetWidth;
  }
};

const resizeHandler = () => nextTick(recalc);

watch(() => props.modelValue, () => nextTick(recalc));
watch(() => props.options, () => nextTick(recalc));

onMounted(() => {
  nextTick(recalc);
  window.addEventListener('resize', resizeHandler, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler);
});
</script>

<template>
  <div
    class="relative select-none flex w-full lg:w-min"
    :class="className"
  >
    <button
      v-for="(o, i) in props.options"
      :key="o.value"
      :ref="el => setTabRef(el, i)"
      class="px-10 py-3 flex-1 text-center transition-colors cursor-pointer whitespace-nowrap"
      :class="[modelValue === o.value ? 'text-primary font-semibold' : 'text-gray-400', 'hover:text-white']"
      @click="emit('update:modelValue', o.value)"
    >
      {{ o.label }}
    </button>

    <span
      class="absolute bottom-0 h-0.5 bg-red-500 transition-all duration-300"
      :style="{ left: `${left}px`, width: `${width}px` }"
    />
  </div>
</template>
