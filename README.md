# React Native + Supabase Notes App

A simple Notes application built with React Native and Supabase.

## 🚀 Features

- **Authentication**: Sign up, Login, Logout with session persistence
- **Notes CRUD**: Create, Read, Update, Delete notes
- **Security**: Row Level Security (RLS) - users can only see their own notes
- **Offline Handling**: App handles offline state gracefully without crashing

## 📋 Prerequisites

- Node.js >= 20
- React Native development environment
- Android Studio (for Android)
- Supabase account and project

## 🛠 Setup

### 1. Install Dependencies

```bash
npm install
# OR
yarn install
```

### 2. Configure Supabase

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set Up Database

Run the SQL script from `SUPABASE_NOTES_SETUP.md` in your Supabase SQL Editor.

### 4. Run the App

```bash
# Start Metro
npm start

# Run Android (in another terminal)
npm run android
```

## 📱 Build APK

```bash
cd android
./gradlew assembleDebug
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

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
