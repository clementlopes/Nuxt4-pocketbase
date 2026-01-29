<template>
  <Profile />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
</script>
