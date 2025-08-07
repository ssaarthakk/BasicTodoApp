# Basic Todo App

A basic todo application built with React Native, Expo, and Firebase.

## Prerequisites

- Node.js (v16 or later)
- pnpm (recommended) or npm
- Expo CLI
- Firebase project

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BasicTodoApp
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Copy your Firebase configuration

4. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Update the `.env` file with your Firebase configuration:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

## Running the App

1. **Start the development server**
   ```bash
   pnpm start
   ```
   or
   ```bash
   npx expo start
   ```

2. **Run on device/simulator**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Press `w` for web browser

## Author

**Sarthak** - [@ssaarthakk](https://github.com/ssaarthakk)