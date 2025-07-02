export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useCurrentUser();

  if (isLoggedIn.value || import.meta.server) return;

  if (!isLoggedIn.value && to.fullPath.includes('/bookmarks')) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }
});
