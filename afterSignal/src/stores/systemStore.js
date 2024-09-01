import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', () => {
  const isLoadingState = ref(false); // 로딩상태

  return {
    isLoadingState,
  };
});
