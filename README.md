# Nuxt 4 PocketBase Project

This is a modern web application built with Nuxt 4, featuring TailwindCSS and DaisyUI for styling, and Pinia for state management. The application connects to a PocketBase backend for user authentication and data storage.

## Technologies Used

- **Nuxt 4**: A Vue.js framework for building modern web applications with server-side rendering and static generation capabilities
- **Vue 3**: Progressive JavaScript framework for building user interfaces
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **DaisyUI**: Component library for TailwindCSS that provides beautiful pre-built components
- **Pinia**: Official state management library for Vue.js applications
- **PocketBase**: Backend service that provides authentication, database, and file storage
- **TypeScript**: Superset of JavaScript that adds static typing

## Project Structure

```
├── app/                    # Main application directory
│   ├── assets/            # Static assets like CSS, images
│   ├── components/        # Reusable Vue components
│   ├── composables/       # Shared logic (including Pinia stores)
│   ├── middleware/        # Route protection and navigation guards
│   ├── pages/             # Application routes (auto-generated from file structure)
│   ├── plugins/           # Vue plugins
│   └── app.vue           # Root component
├── shared/               # Shared utilities and types
├── nuxt.config.ts        # Main Nuxt configuration file
├── package.json          # Project dependencies and scripts
└── README.md            # This file
```

## Key Features

### Authentication System
- User login/logout functionality
- Protected routes using middleware
- Password reset and email verification

### State Management
- Pinia stores for managing user data, themes, and UI states
- Reactive data updates across components

### UI Components
- Responsive design using TailwindCSS and DaisyUI
- Pre-built components like modals, alerts, and forms
- Dark/light theme support

### File Structure
- Component-based architecture
- Auto-imported components
- Type-safe development with TypeScript

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nuxt4-pocketbase
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add:
```
POCKETBASE_URL=https://your-pocketbase-instance.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the application for production
- `npm run generate` - Generate a static version of the application
- `npm run preview` - Preview the production build locally
- `npm run postinstall` - Prepare Nuxt for development/production

## Understanding the Code

### Nuxt Configuration (`nuxt.config.ts`)
This file configures your Nuxt application. It includes:
- Module configurations (like Pinia)
- CSS imports (for TailwindCSS)
- Runtime configurations (like API URLs)
- Build settings

### Pages
Nuxt automatically creates routes based on the files in the `pages/` directory:
- `index.vue` → `/`
- `profilePage.vue` → `/profilePage`
- Nested directories create nested routes

### Components
Reusable Vue components live in the `components/` directory. Nuxt auto-imports these components, so you can use them without importing them in each file.

### Composables and Stores
Composables contain reusable logic. Pinia stores (found in `app/composables/`) manage application state:
- `useUserStore.ts` - Manages user profile data
- `useAuthStore.ts` - Handles authentication state
- `useThemeStore.ts` - Manages theme preferences
- `useToastStore.ts` - Controls toast notifications
- `useAlertStore.ts` - Manages alert dialogs

### Middleware
Middleware functions (in `middleware/`) run before rendering pages. The `auth` middleware protects routes that require authentication.

## Best Practices Demonstrated

1. **Component Organization**: Components are organized logically in the components directory
2. **State Management**: Proper use of Pinia for centralized state management
3. **Type Safety**: TypeScript is used throughout for better code reliability
4. **Responsive Design**: TailwindCSS classes ensure responsive layouts
5. **Accessibility**: Semantic HTML and proper ARIA attributes
6. **Security**: Authentication middleware protects sensitive routes

## Learning Resources

- [Nuxt Documentation](https://nuxt.com/docs)
- [Vue Documentation](https://vuejs.org/guide/introduction.html)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Documentation](https://daisyui.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [PocketBase Documentation](https://pocketbase.io/docs/)

## Troubleshooting

### Common Issues

1. **Module not found errors**: Run `npm install` to ensure all dependencies are installed
2. **Environment variables not working**: Check that your `.env` file is properly configured
3. **Hot reload not working**: Restart the development server with `npm run dev`

### Development Tips

- Use the Nuxt DevTools extension for debugging
- Take advantage of auto-imported components
- Leverage TypeScript for better code quality
- Use DaisyUI components for faster UI development