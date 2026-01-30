<!-- Profile Page Component -->
<!-- This page displays the user's profile and allows them to edit their information -->
<template>
  <!-- Render the Profile component which contains the actual profile form -->
  <Profile />
</template>

<script setup lang="ts">
// Define metadata for this page
// Middleware: 'auth' ensures only authenticated users can access this page
definePageMeta({
  middleware: ['auth'], // Protect this route - only logged-in users can view it
});
</script>
