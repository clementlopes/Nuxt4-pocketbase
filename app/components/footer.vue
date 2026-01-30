<template>
  <footer
    class="footer footer-center p-6 bg-base-200 text-base-content rounded-t-lg"
    role="contentinfo"
  >
    <div
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between flex-wrap w-full max-w-4xl mx-auto"
    >
      <nav class="flex flex-wrap justify-center gap-6 mb-4 lg:mb-0" aria-label="footer-navigation">
        <h3 id="footer-navigation" class="sr-only">Navigation</h3>
        <NuxtLink
          to="/"
          class="link link-hover hover:text-primary transition-colors duration-200"
          ></NuxtLink
        >
        <NuxtLink
          to="/"
          class="link link-hover hover:text-primary transition-colors duration-200"
          ></NuxtLink
        >
        <NuxtLink
          to="/"
          class="link link-hover hover:text-primary transition-colors duration-200"
          ></NuxtLink
        >
        <NuxtLink
          to="/"
          class="link link-hover hover:text-primary transition-colors duration-200"
          ></NuxtLink
        >
        <NuxtLink
          to="/"
          class="link link-hover hover:text-primary transition-colors duration-200"
          ></NuxtLink
        >
      </nav>

      <p class="text-sm">© {{ currentYear }} name </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = ref(new Date().getFullYear());
</script>
