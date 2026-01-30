// Import necessary functions from Pinia and Vue
import { defineStore } from 'pinia';  // Function to create a store in Pinia
import { ref } from 'vue';            // Vue reactivity function to create reactive references
import { useUserStore } from '~/composables/useUserStore';  // Import User store to access user data

// Define the Theme Store using Pinia
// This store manages the application's theme preferences
export const useThemeStore = defineStore('useThemeStore', () => {
  // Get instance of user store to access user data
  const userStore = useUserStore();

  // Reactive reference to store the currently active theme
  // Defaults to 'forest' theme
  const activeTheme = ref('forest');

  // Method to set the theme based on user preferences or localStorage
  // Checks if user is logged in and has a theme preference saved
  const setTheme = () => {
    if (userStore.userData) {
      // If user is logged in, use their saved theme preference
      activeTheme.value = userStore.userData.themeMode;
    } else {
      // If user is not logged in, use theme from localStorage or default to 'forest'
      activeTheme.value = localStorage.getItem('theme') || 'forest';
    }
    // Save the current theme to localStorage for persistence
    localStorage.setItem('theme', activeTheme.value);
  };

  // Method to toggle between 'forest' and 'winter' themes
  // This enables the dark/light mode switch functionality
  const changeTheme = () => {
    // Toggle between forest (light) and winter (dark) themes
    activeTheme.value =
      activeTheme.value === 'forest' ? 'winter' : 'forest';
  };

  // Return all the state properties and methods
  // These will be available when using this store in components
  return {
    activeTheme,  // Reactive reference to the current theme
    setTheme,     // Method to set theme based on user preference or localStorage
    changeTheme,  // Method to toggle between light and dark themes
  };
});
