# React Native + Supabase Notes App

A simple Notes application built with React Native and Supabase.

## 🚀 Features

- **Authentication**: Sign up, Login, Logout with session persistence
- **Notes CRUD**: Create, Read, Update, Delete notes
- **Security**: Row Level Security (RLS) - users can only see their own notes
- **Offline Handling**: App handles offline state gracefully without crashing
- **Modern UI**: Built with React Native and custom components
- **State Management**: Redux Toolkit with Redux Persist

## 🛠 Tech Stack

- **Framework**: React Native 0.81.4
- **Language**: TypeScript
- **Backend**: Supabase (PostgreSQL + Auth)
- **State Management**: Redux Toolkit + Redux Persist
- **Navigation**: React Navigation
- **UI Components**: Custom components with React Native Reanimated
- **Storage**: AsyncStorage for session persistence
- **Package Manager**: Yarn 4.9.4

## 📋 Prerequisites

- Node.js >= 20
- Yarn >= 4.9.4
- React Native development environment
- Android Studio (for Android development)
- Supabase account and project

## 🛠 Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd supabase
```

### 2. Install Dependencies

```bash
yarn install
```

**Note**: This project uses Yarn 4.9.4. Make sure you have Yarn installed globally or use the package manager specified in `package.json`.

### 3. Configure Supabase

1. Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Get your Supabase credentials:
   - Go to your Supabase project dashboard
   - Navigate to Settings > API
   - Copy the Project URL and anon/public key

### 4. Set Up Database

Run the SQL script from `SUPABASE_NOTES_SETUP.md` in your Supabase SQL Editor. This will:
- Create the `notes` table
- Set up Row Level Security (RLS) policies
- Configure proper permissions

### 5. Run the App

#### Android

```bash
# Start Metro bundler
yarn start

# In another terminal, run Android
yarn android
```

#### iOS

```bash
# Install CocoaPods dependencies
cd ios && pod install && cd ..

# Start Metro bundler
yarn start

# In another terminal, run iOS
yarn ios
```

## 📱 Building the App

### Android APK

```bash
cd android
./gradlew assembleDebug
```

**Debug APK location**: `android/app/build/outputs/apk/debug/app-debug.apk`

**Release APK**:
```bash
cd android
./gradlew assembleRelease
```

**Release APK location**: `android/app/build/outputs/apk/release/app-release.apk`

**Note**: For release builds, you'll need to configure signing. See `android/key.properties.example` (create your own `key.properties` file).

### iOS Build

```bash
cd ios
pod install
cd ..
yarn ios --mode Release
```

## 🗄️ Supabase Schema

### Notes Table

```sql
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);
```

**RLS Policies**: Users can only access their own notes (SELECT, INSERT, UPDATE, DELETE).

## 🔐 Authentication

- Uses Supabase Auth with AsyncStorage for session persistence
- Session persists after app restart
- Redux manages auth state
- Works offline using persisted session

**Code Location**: `src/config/SupabaseAuth.ts`, `src/navigation/MainStack.tsx`

## 📱 Offline Handling

- Network connectivity checked before operations
- Shows error messages when offline
- App doesn't crash when offline
- Session persists offline using Redux + AsyncStorage

**Code Location**: `src/config/SupabaseNotes.ts`

## 📝 Assumptions

- Implemented **Option A (Offline Handling)** instead of search
- No local caching - notes require internet connection
- Basic error handling via toast messages

## 🐛 Troubleshooting

### Android Build Issues

1. **"No matching variant" error**:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   rm -rf node_modules
   yarn install
   cd android && ./gradlew :app:assembleDebug
   ```

2. **Metro bundler cache issues**:
   ```bash
   yarn start --reset-cache
   ```

3. **Gradle sync issues**:
   ```bash
   cd android
   ./gradlew clean
   rm -rf .gradle build app/build
   ```

### iOS Build Issues

1. **Pod installation issues**:
   ```bash
   cd ios
   rm -rf Pods Podfile.lock
   pod install
   ```

2. **Xcode build errors**:
   - Clean build folder in Xcode (Cmd + Shift + K)
   - Delete DerivedData folder
   - Rebuild the project

### General Issues

1. **Module not found errors**:
   ```bash
   rm -rf node_modules
   yarn install
   ```

2. **TypeScript errors**:
   ```bash
   yarn tsc --noEmit
   ```
