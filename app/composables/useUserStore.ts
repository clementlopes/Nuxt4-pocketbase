// Import necessary functions from Pinia and Vue
import { defineStore } from 'pinia';  // Function to create a store in Pinia
import { ref } from 'vue';            // Vue reactivity function to create reactive references
import { usePocketbaseStore } from '~/composables/usePocketbaseStore';  // Import PocketBase store
import { useMyAuthStore } from '~/composables/useMyAuthStore';          // Import Auth store

// Define the User Store using Pinia
// This store manages user-related data and operations
export const useUserStore = defineStore('userStore', () => {
  // Get the PocketBase instance from the pocketbase store
  const pocketbase = usePocketbaseStore();

  // Reactive reference to store user data
  // Initially null until user logs in
  const userData = ref<UserType | null>(null);

  // Method to save user data to the store
  // Called when user logs in or data is refreshed
  const saveUserData = (authData: UserType) => {
    userData.value = authData;
  };

  // Method to clear user data from the store
  // Called when user logs out
  const clearUser = () => {
    userData.value = null;
  };

  // Method to update user data in the backend
  // Sends updated data to PocketBase API
  const updateUser = async (newData: UserType | FormData) => {
    try {
      // Update the user record in the 'users' collection
      // Uses the current user's ID to identify which record to update
      await pocketbase.pb.collection('users').update(userData.value!.id, newData);
      return true;
    } catch (error: any) {
      // Throw a user-friendly error message
      throw new Error(error?.message || 'Failed to update user data. Please try again.');
    }
  };

  // Method to check if user data has been modified
  // Compares the current form data with stored user data
  const userDataHasEdited = async (data: UserType) => {
    return JSON.stringify(data) !== JSON.stringify(userData.value);
  };

  // Return all the state properties and methods
  // These will be available when using this store in components
  return {
    userData,           // Reactive user data
    saveUserData,       // Method to save user data
    clearUser,          // Method to clear user data
    updateUser,         // Method to update user data on the server
    userDataHasEdited,  // Method to check if data has been modified
  };
});
