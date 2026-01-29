import { navigateTo } from '#app';
import { useUserStore } from '~/composables/useUserStore';
import { usePocketbaseStore } from '~/composables/usePocketbaseStore';

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore();
  const pocketbaseStore = usePocketbaseStore();

  if (!pocketbaseStore.pb.authStore.isValid || !userStore.userData) {
    return navigateTo('/');
  }
});
