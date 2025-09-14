# React Native Auth App (Context API + React Navigation)

This sample app demonstrates a simple authentication flow using React Context API, React Navigation, and AsyncStorage.

## App Video Link
https://drive.google.com/file/d/1mAZs8x1ZHTkoVlaNIYsk7gfu491FkE36/view?usp=sharing

Features:
- Login and Signup screens with validation
- AuthContext to manage `user`, `login`, `signup`, `logout`
- Home screen displaying user details and a Logout button
- Optional session persistence using AsyncStorage
- Password visibility toggle with an eye icon
- Clean UI

## Requirements

- Node.js LTS
- React Native environment set up (Android Studio and/or Xcode)

## Install

```bash
# Install dependencies
yarn
```

On iOS, install pods:
```bash
cd ios && pod install && cd ..
```

## Run

```bash
npm run android
# or
npm run ios
```

## Project Structure

```
.
├── App.js
├── package.json
└── src
    ├── context
    │   └── AuthContext.js
    ├── navigation
    │   └── RootNavigator.js
    ├── screens
    │   ├── HomeScreen.js
    │   ├── LoginScreen.js
    │   └── SignupScreen.js
```

## Notes

- This app uses AsyncStorage to store a simple "database" of users and the current session.
- Sign up will create a user locally and auto-login.