<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  block?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  block: false,
  disabled: false,
});
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    :class="[
      'px-4 py-2 rounded transition-colors font-medium text-sm cursor-pointer',
      {
        'w-full': props.block,
        'bg-primary text-white hover:bg-red-600': props.variant === 'primary',
        'bg-white text-black hover:bg-gray-200': props.variant === 'secondary',
        'bg-red-500 text-white hover:bg-red-700': props.variant === 'danger',
        'opacity-50 cursor-not-allowed': props.disabled,
      },
    ]"
  >
    <slot />
  </button>
</template>
