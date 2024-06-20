# ScopeX React native assignment

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Running the app

### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

#### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Task

The current codebase has performance issues and bugs that need to be identified and fixed. Below are the specific tasks to complete the assignment:

1. Add Login Screen: Implement a login screen with Google sign-in and two-factor authentication (2FA) using Firebase for mobile OTP.
2. Add Splash Screen: Introduce a splash screen for the application.
3. Secure Todo Screen: Ensure the todo screen is accessible only to authenticated users using Tab navigation.
4. Infinite Scrolling for Todo Page: Implement infinite scrolling on the todo page.
5. Add Profile Screen: Create a profile screen to display user profile information using Tab navigation.
6. Dark Mode Toggle: Add a toggle option for dark mode.
7. Update Todo Functionality: Implement update functionality for todos using a Modal/Dialog.
8. Feedback for Adding Todo: Provide toast notifications or appropriate feedback when adding a todo.
9. Handle States: Manage error and loading states for each action.
10. Validation Helper Text: Add helper text for error validation.
11. Unit Tests: Write unit tests for each component.
12. Change Package Name and Bundle ID: Update the package name and bundle ID to dev.scopex.[your_github].
13. Upgrade React Native Version: Upgrade the React Native version to 0.74.1.
14. Update App Icon: Change the app icon to one of your choice.
15. Change Font: Change the app's font to Fira Code from https://fonts.google.com/specimen/Fira+Code

PS: You are allowed to use external packages for toasts, dialogs, etc

### Judging criteria

- Code Quality: Ensure the code is clean, maintainable, and reusable.
- Optimization: Optimize the code for better performance.
- Type Safety: Implement type safety.
- Creativity: Be creative in the implementation.

### Deliverables

- A single new repository created by you, containing two folders:
  - First Folder: Contains the completed tasks, with a README indicating the current React Native version and the tasks completed.
  - Second Folder: Contains the upgraded React Native version (0.74.1), with a README indicating the completed tasks.
- Documentation: Provide documentation in the README and appropriate comments within the code.
- Make sure it's not a single commit, add commits as you progress
