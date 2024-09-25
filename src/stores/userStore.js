import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user",() => {
    const islogined = ref(false);
    function log_in() { islogined.value = true; }
    function log_out() { islogined.value = false; }
    return { islogined,log_in,log_out }
});