import { storeToRefs } from 'pinia';
import { useUserStore } from '~/store/user';

export const useCurrentUser = () => {
  const store = useUserStore();
  const { uid, email } = storeToRefs(store);
  const isLoggedIn = computed(() => !!uid.value);

  return { uid, email, isLoggedIn };
};
