# Firebase Authentication Components

This directory contains components for implementing Firebase Authentication in your Next.js application.

## Components

### AuthForm

A complete authentication form component that supports:
- Email/password sign up
- Email/password sign in
- Sign out
- Authentication state management

## Usage

```tsx
import AuthForm from '@/components/auth/AuthForm';
import { User } from 'firebase/auth';

export default function MyPage() {
  const handleAuthStateChange = (user: User | null) => {
    // Handle authentication state changes
    console.log('Auth state changed:', user);
  };

  return (
    <div>
      <h1>Authentication</h1>
      <AuthForm onAuthStateChange={handleAuthStateChange} />
    </div>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `onAuthStateChange` | `(user: User \| null) => void` | Optional callback function that is called when the authentication state changes |

## Notes

- This component uses the `'use client'` directive and should be used in client components.
- The component internally manages its own state, including loading, error, and user states.
- The component automatically sets up an auth state listener using `onAuthStateChanged` from Firebase.
