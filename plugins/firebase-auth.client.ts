import { onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from '~/store/user';

export default defineNuxtPlugin(() => {
  const { firebase } = useAuth();
  const { auth } = firebase();
  const userStore = useUserStore();

  return new Promise<void>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) userStore.$patch({ uid: user.uid, email: user.email });
      else userStore.$reset();
      resolve();
    });
  });
});
