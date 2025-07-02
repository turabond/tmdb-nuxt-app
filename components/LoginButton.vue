<script setup lang="ts">
const { isLoggedIn } = useCurrentUser();
const { logout } = useAuth();
const router = useRouter();
const loading = ref(false);

const handleClick = async () => {
  try {
    loading.value = true;
    if (isLoggedIn.value) {
      await logout();
    }
    router.push('/login');
  } catch (error) {
    console.log('Error during login/logout:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <BaseButton
    variant="danger"
    :disabled="loading"
    @click="handleClick"
  >
    {{ isLoggedIn ? 'Sign Out' : 'Sign In' }}
  </BaseButton>
</template>
