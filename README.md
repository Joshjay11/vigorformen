# VigorForMen - Health & Wellness for Middle-Aged Men

A Next.js website focused on providing evidence-based health and wellness information for middle-aged men.

## Features

- **Modern UI**: Built with Next.js, React, and Tailwind CSS
- **Dark Mode Support**: Seamless light/dark mode switching
- **Blog System**: Content management with Sanity.io (in progress)
- **Firebase Integration**: Authentication, database, and storage capabilities
- **Responsive Design**: Mobile-first approach for all screen sizes
- **TypeScript**: Type-safe code throughout the application

## Firebase Integration

This project includes a complete Firebase integration with the following features:

### Authentication

- Email/password sign up and sign in
- Authentication state management
- User profile management

### Firestore Database

- Real-time data synchronization
- User profile storage and management
- Type-safe database operations

### Storage

- File uploads and downloads
- File type and size validation
- Secure file storage with user-specific access

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Authentication, Firestore, and Storage services
   - Copy your Firebase configuration to `.env.local` (see `.env.local.example`)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Firebase Demo

The project includes a Firebase demo page at `/firebase-demo` that showcases:

- Authentication with email/password
- User profile management with Firestore
- File uploads with Firebase Storage

This demo page serves as both a showcase and a reference implementation for using Firebase in your Next.js applications.

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   │   ├── auth/       # Authentication components
│   │   ├── firestore/  # Firestore database components
│   │   ├── storage/    # Firebase storage components
│   │   └── ...         # Other UI components
│   ├── lib/            # Utility functions and service initializations
│   │   ├── firebase.ts # Firebase initialization
│   │   └── sanity.ts   # Sanity.io client (in progress)
│   ├── styles/         # Global styles
│   └── types/          # TypeScript type definitions
└── ...                 # Configuration files
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Sanity.io Configuration (optional)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-token
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
