<script setup lang="ts">
const route = useRoute();
const email = ref('');
const password = ref('');
const emailError = ref('');
const passError = ref('');
const formError = ref('');
const loading = ref(false);
const { loginOrRegister } = useAuth();

const submit = async () => {
  emailError.value = /.+@.+\..+/.test(email.value) ? '' : 'Enter a valid email.';
  passError.value = password.value.length >= 6 ? '' : 'Password must be at least 6 characters.';

  if (emailError.value || passError.value) return;

  loading.value = true;
  const toUrl = route.query.redirect as string || '/trending';

  try {
    await loginOrRegister(email.value, password.value);
    await navigateTo(toUrl, { replace: true });
  } catch (e: unknown) {
    formError.value = (e instanceof Error && e.message) ? e.message : 'Login failed';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form
    class="max-w-md mx-auto bg-card pt-6 rounded-lg space-y-6 min-w-full md:min-w-md"
    @submit.prevent="submit"
  >
    <h2 class="text-2xl font-semibold text-center">
      Sign In
    </h2>

    <div class="space-y-1">
      <label
        for="email"
        class="block text-sm font-medium"
      >Email</label>
      <input
        id="email"
        v-model.trim="email"
        type="email"
        placeholder="you@example.com"
        :aria-invalid="!!emailError"
        class="w-full p-2 rounded bg-neutral-800 text-white placeholder-gray-400 border border-transparent outline-none focus:ring-2 "
        :class="{ 'border-red-500 ring-red-500 ring-2': emailError }"
      >
      <p
        v-if="emailError"
        class="text-red-500 text-sm"
      >
        {{ emailError }}
      </p>
    </div>

    <div class="space-y-1">
      <label
        for="password"
        class="block text-sm font-medium"
      >Password</label>
      <input
        id="password"
        v-model.trim="password"
        type="password"
        placeholder="••••••••"
        :aria-invalid="!!passError"
        class="w-full p-2 rounded bg-neutral-800 text-white placeholder-gray-400 border border-transparent outline-none focus:ring-2 "
        :class="{ 'border-red-500 ring-red-500 ring-2': emailError }"
      >
      <p
        v-if="passError"
        class="text-red-500 text-sm"
      >
        {{ passError }}
      </p>
    </div>

    <BaseButton
      block
      type="submit"
      variant="secondary"
      :disabled="loading"
    >
      Sign In
    </BaseButton>

    <p
      v-if="formError"
      class="text-red-500 text-sm text-center"
    >
      {{ formError }}
    </p>
  </form>
</template>
