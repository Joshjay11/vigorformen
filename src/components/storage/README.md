# Firebase Storage Components

This directory contains components for implementing Firebase Storage functionality in your Next.js application.

## Components

### FileUploader

A complete file upload component that supports:
- File selection and validation
- File uploads to Firebase Storage
- File deletion
- Progress and error states
- Listing uploaded files

## Usage

```tsx
import FileUploader from '@/components/storage/FileUploader';
import { User } from 'firebase/auth';

export default function UploadPage({ user }: { user: User | null }) {
  const handleUploadComplete = (url: string, fileName: string) => {
    console.log(`File uploaded: ${fileName}`);
    console.log(`Download URL: ${url}`);
  };

  return (
    <div>
      <h1>File Upload</h1>
      <FileUploader 
        user={user} 
        folder="profile-images"
        allowedTypes={['image/jpeg', 'image/png']}
        maxSizeMB={2}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `user` | `User \| null` | The Firebase Auth user object. If null, the component will show a message asking the user to sign in. |
| `folder` | `string` | Optional. The folder path in Firebase Storage where files will be uploaded. Default: 'uploads' |
| `allowedTypes` | `string[]` | Optional. Array of MIME types that are allowed to be uploaded. Default: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'] |
| `maxSizeMB` | `number` | Optional. Maximum file size in megabytes. Default: 5 |
| `onUploadComplete` | `(url: string, fileName: string) => void` | Optional. Callback function that is called when a file upload is complete. |

## File Storage Structure

Files are stored in Firebase Storage with the following path structure:

```
{folder}/{userId}_{timestamp}_{originalFileName}
```

For example:
```
uploads/abc123_1648234567890_profile.jpg
```

## Notes

- This component uses the `'use client'` directive and should be used in client components.
- The component handles file validation, including file type and size checks.
- Uploaded files are stored with a unique name that includes the user ID and a timestamp to prevent collisions.
- The component maintains a list of uploaded files in its internal state, allowing users to see and delete their uploads.
- File deletion removes the file from both the component state and Firebase Storage.
