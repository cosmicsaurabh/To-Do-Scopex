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

Below are the tasks you need to complete the assignment, The current codebase consists of bugs and lacks performance. You need to identify the bugs and fix them

1. Add a login screen and implement Google sign-in, add 2FA for mobile OTP using Firebase
2. Add a splash screen
3. Make the todo screen accessible only to authenticated users (Tab nav)
4. Add Infinite scrolling for todo page
5. Add a profile screen and show profile info(Tab nav)
6. Add a Dark mode toggle
7. Add update Todo functionality using a Modal/Dialog
8. Add a toast or appropriate feedback while adding todo
9. Handle error, loading states for each action.
10. Add error helper text for validation.
11. Write unit tests for each component
12. change package name, bundle id to dev.scopex.[your_github]
13. upgrade the react native version to 0.74.1
14. Update the icon to any other icon of your choice
15. Change the font to Fira code[https://fonts.google.com/specimen/Fira+Code]

PS: You are allowed to use external packages for toasts, dialogs, etc

### Judging criteria

- Clean, maintainable and reusable code [Most Important]
- Optimization of code
- Type safety
- Be creative

### Deliverables

- 1 repo with 2 folders
  - 1st with the completed tasks ticked in readme with current react native version
  - 2nd with the completed tasks ticked in readme with upgraded react native version
- Documentation in readme and comments
