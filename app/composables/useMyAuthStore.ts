// Import necessary functions from Pinia and other stores
import { defineStore } from 'pinia';                 // Function to create a store in Pinia
import { usePocketbaseStore } from './usePocketbaseStore';  // Import PocketBase store for API calls
import { useUserStore } from './useUserStore';       // Import User store to manage user data
import { useThemeStore } from '~/composables/useThemeStore'; // Import Theme store for theme preferences

// Define the Authentication Store using Pinia
// This store handles user authentication operations like login, logout, and account management
export const useMyAuthStore = defineStore('auth', () => {
  // Get instances of other stores to interact with them
  const pocketBaseStore = usePocketbaseStore();  // Access to PocketBase API client
  const userStore = useUserStore();              // Access to user data store
  const themeStore = useThemeStore();            // Access to theme preferences

  // Helper function to transform authentication data from PocketBase
  // into our application's UserType format
  const mapAuthDataToUser = (authData: { token: string; record: any }): UserType => {
    const record = authData.record;  // Extract user record from auth response

    // Generate avatar URL from PocketBase file storage
    // If user has an avatar, create a thumbnail URL; otherwise use empty string
    const avatar = record.avatar
      ? pocketBaseStore.pb.files.getURL(record, record.avatar, { thumb: '100x250' })
      : '';

    // Format the creation date to DD-MM-YYYY format
    const d = new Date(record.created);
    const created =
      `${String(d.getDate()).padStart(2, '0')}-` +
      `${String(d.getMonth() + 1).padStart(2, '0')}-` +
      `${d.getFullYear()}`;

    // Set default theme mode if not set in user record
    if (record.themeMode === '') {
      record.themeMode = themeStore.activeTheme;
    }

    // Return a properly formatted UserType object
    return {
      id: record.id,
      token: authData.token,      // Authentication token from PocketBase
      name: record.name,          // User's display name
      email: record.email,        // User's email address
      avatar,                     // Formatted avatar URL
      created,                    // Formatted creation date
      themeMode: record.themeMode, // User's theme preference
      password: '',               // Empty for security
      passwordConfirm: '',        // Empty for security
      oldPassword: '',            // Empty for security
      avatarFile: null,           // For temporary file handling
    };
  };

  // Method to create a new user account
  // Registers a new user with the provided credentials
  const createAccount = async (newUser: NewUserType) => {
    // Prepare user data for PocketBase API
    const data = {
      "email": newUser.email,
      "emailVisibility": false,    // Don't make email publicly visible
      "name": newUser.name,
      "themeMode": newUser.themeMode, // User's initial theme preference
      "password": newUser.password,
      "passwordConfirm": newUser.passwordConfirm,
    };

    try {
      // Create the user account in PocketBase
      await pocketBaseStore.pb.collection('users').create(data);

      // Automatically log in the newly created user
      const authData = await login(newUser.email, newUser.password);

      // Save the authenticated user data to the user store
      userStore.saveUserData(mapAuthDataToUser(authData));
      return authData;
    } catch (error: any) {
      // Throw a user-friendly error message
      throw new Error(error?.message || 'Account creation failed. Please try again.');
    }
  };

  // Method to authenticate a user with email and password
  // Connects to PocketBase API to verify credentials
  const login = async (email: string, password: string) => {
    try {
      // Authenticate with PocketBase using email and password
      const authData = await pocketBaseStore.pb.collection('users').authWithPassword(email, password);

      // Save the authenticated user data to the user store
      userStore.saveUserData(mapAuthDataToUser(authData));
      return authData;
    } catch (error: any) {
      // Throw a user-friendly error message
      throw new Error(error?.message || 'Login failed. Please check your credentials.');
    }
  };

  // Method to authenticate a user using Google OAuth
  // Provides social login functionality
  const loginWithGoogle = async () => {
    try {
      // Authenticate with PocketBase using Google OAuth
      const authData = await pocketBaseStore.pb
        .collection('users')
        .authWithOAuth2({ provider: 'google' });

      // Save the authenticated user data to the user store
      userStore.saveUserData(mapAuthDataToUser(authData));
      return authData;
    } catch (error: any) {
      // Throw a user-friendly error message
      throw new Error(error?.message || 'Google login failed. Please try again.');
    }
  };

  // Method to log out the current user
  // Clears authentication tokens and user data
  const logout = () => {
    pocketBaseStore.pb.authStore.clear();        // Clear PocketBase authentication
    localStorage.removeItem('pocketbase_auth');  // Remove stored auth data
    userStore.clearUser();                       // Clear user data from store
  };

  // Method to refresh the user's authentication token
  // Ensures the user stays logged in during extended sessions
  const authRefresh = async () => {
    try {
      // Check if current authentication is still valid
      if (!pocketBaseStore.pb.authStore.isValid) {
        // If not valid, clear all authentication data
        pocketBaseStore.pb.authStore.clear();
        localStorage.removeItem('pocketbase_auth');
        userStore.clearUser();
        return;
      }

      // Refresh the authentication token with PocketBase
      const authData = await pocketBaseStore.pb.collection('users').authRefresh();

      // Update the user data with fresh information
      userStore.saveUserData(mapAuthDataToUser(authData));
    } catch (error: any) {
      // On error, clear all authentication data
      pocketBaseStore.pb.authStore.clear();
      localStorage.removeItem('pocketbase_auth');
      userStore.clearUser();
    }
  };

  // Method to request an email change for the current user
  // Initiates the email change process with PocketBase
  const emailChange = async (newEmail: string) => {
    console.log(newEmail);  // Log for debugging purposes
    try {
      // Request email change from PocketBase
      await pocketBaseStore.pb.collection('users').requestEmailChange(newEmail);
    } catch (error: any) {
      // Throw a user-friendly error message
      throw new Error(error?.message || 'Email change failed. Please try again.');
    }
  };

  // Method to delete the current user's account
  // Permanently removes the user from the system
  const deleteAccount = async () => {
    try {
      // Delete the user record from PocketBase
      await pocketBaseStore.pb.collection('users').delete(userStore.userData.id);
    } catch (error: any) {
      // Throw a user-friendly error message
      throw new Error(error?.message || 'Account deletion failed. Please try again.');
    }
  };

  // Return all the methods that will be available when using this store
  return {
    login,           // Method to log in with email/password
    loginWithGoogle, // Method to log in with Google OAuth
    logout,          // Method to log out
    authRefresh,     // Method to refresh authentication
    emailChange,     // Method to change user's email
    createAccount,   // Method to create a new account
    deleteAccount,   // Method to delete the current account
  };
});
