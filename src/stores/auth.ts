import { defineStore } from "pinia";
import { ref } from "vue";

export const AuthState = ref(false);
export const useAuthStore = defineStore("auth", {
  state: () => {
    return { AuthState: false };
  },
  actions: {
    setAuthState(state: boolean) {
      this.AuthState = state;
      AuthState.value = state;
    },
  },
});
