# Firebase Firestore Components

This directory contains components for implementing Firebase Firestore database functionality in your Next.js application.

## Components

### UserProfile

A complete user profile management component that supports:
- Real-time data synchronization with Firestore
- Creating new user profiles
- Updating existing user profiles
- Form validation and error handling
- Loading and success states

## Usage

```tsx
import UserProfile from '@/components/firestore/UserProfile';
import { User } from 'firebase/auth';

export default function ProfilePage({ user }: { user: User | null }) {
  return (
    <div>
      <h1>User Profile</h1>
      <UserProfile user={user} />
    </div>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `user` | `User \| null` | The Firebase Auth user object. If null, the component will show a message asking the user to sign in. |

## Data Structure

The component expects and creates documents in the `userProfiles` collection with the following structure:

```typescript
interface ProfileData {
  displayName: string;
  bio: string;
  location: string;
  website: string;
  createdAt: number; // Timestamp
  updatedAt: number; // Timestamp
}
```

## Notes

- This component uses the `'use client'` directive and should be used in client components.
- The component sets up a real-time listener using `onSnapshot` to keep the profile data in sync.
- If a profile doesn't exist for the user, it will automatically create one.
- The component handles all error states and loading states internally.
