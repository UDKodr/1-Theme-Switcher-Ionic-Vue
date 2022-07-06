import { reactive } from "vue";

export const store = reactive({
  theme: localStorage.getItem("themeSet"),
  
  setItem(): void {
    this.theme = localStorage.getItem("themeSet");
  },
});