export const useUserStore = defineStore('user', {
  state: () => ({ uid: null as string | null, email: null as string | null }),
  actions: {
    $reset() {
      this.uid = this.email = null;
    },
  },
});
