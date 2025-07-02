import { initializeApp } from 'firebase/app';
import {
  type User,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useUserStore } from '~/store/user';

// Lazy singleton
let _firebase: ReturnType<typeof init> | null = null;

function init() {
  const config = useRuntimeConfig();
  const firebaseConfig = config.public.firebase;

  const app = initializeApp(firebaseConfig);

  return { auth: getAuth(app), db: getFirestore(app) };
}

const firebase = () => (_firebase ??= init());

export const useAuth = () => {
  const { auth } = firebase();
  const userStore = useUserStore();

  if (import.meta.client && !userStore.uid) {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) userStore.$patch({ uid: user.uid, email: user.email });
      else userStore.$reset();
    });
  }

  const login = (email: string, pass: string) =>
    signInWithEmailAndPassword(auth, email, pass);

  const register = (email: string, pass: string) =>
    createUserWithEmailAndPassword(auth, email, pass);

  const loginOrRegister = async (email: string, pass: string) => {
    try {
      const { user } = await register(email, pass);
      userStore.$patch({ uid: user.uid, email: user.email });
    } catch (err: unknown) {
      if (err?.toString().includes('auth/email-already-in-use')) {
        const { user } = await login(email, pass);
        userStore.$patch({ uid: user.uid, email: user.email });
      } else {
        throw err;
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    userStore.$reset();
  };

  return { login, register, logout, firebase, loginOrRegister };
};
