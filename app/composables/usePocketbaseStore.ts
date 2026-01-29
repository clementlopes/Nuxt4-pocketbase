import { defineStore } from 'pinia';
import PocketBase from 'pocketbase';

export const usePocketbaseStore = defineStore('usePocketBaseStore', () => {
  const config = useRuntimeConfig();
  const pb = new PocketBase(config.public.pocketbaseUrl as string);

  return {
    pb,
  };
});
