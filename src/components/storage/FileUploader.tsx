'use client';

import { useState, useRef } from 'react';
import { User } from 'firebase/auth';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  StorageReference
} from 'firebase/storage';
import { storage } from '@/lib/firebase';

type FileUploaderProps = {
  user: User | null;
  folder?: string;
  allowedTypes?: string[];
  maxSizeMB?: number;
  onUploadComplete?: (url: string, fileName: string) => void;
};

interface FileItem {
  name: string;
  url: string;
  path: string;
  uploadedAt: number;
}

export default function FileUploader({ 
  user, 
  folder = 'uploads',
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  maxSizeMB = 5,
  onUploadComplete
}: FileUploaderProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    if (!user) {
      setError('You must be signed in to upload files');
      return;
    }

    setError(null);
    setSuccess(null);
    setUploading(true);
    
    try {
      const file = selectedFiles[0]; // Just handle one file for simplicity
      
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        throw new Error(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
      }
      
      // Validate file size
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        throw new Error(`File too large. Maximum size: ${maxSizeMB}MB`);
      }
      
      // Create a unique file name
      const timestamp = Date.now();
      const fileName = `${user.uid}_${timestamp}_${file.name}`;
      const filePath = `${folder}/${fileName}`;
      
      // Create a reference to the file location in Firebase Storage
      const storageRef = ref(storage, filePath);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Create a file item
      const newFile: FileItem = {
        name: file.name,
        url: downloadURL,
        path: filePath,
        uploadedAt: timestamp
      };
      
      // Add to files list
      setFiles(prev => [...prev, newFile]);
      
      // Call the onUploadComplete callback if provided
      if (onUploadComplete) {
        onUploadComplete(downloadURL, file.name);
      }
      
      setSuccess('File uploaded successfully!');
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      console.error('Error uploading file:', err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (file: FileItem) => {
    if (!user) return;
    
    try {
      // Create a reference to the file
      const fileRef = ref(storage, file.path);
      
      // Delete the file
      await deleteObject(fileRef);
      
      // Remove from files list
      setFiles(prev => prev.filter(f => f.path !== file.path));
      
      setSuccess('File deleted successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error deleting file:', err);
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <div className="p-6 bg-white dark:bg-secondary-800 rounded-lg shadow-sm">
        <p className="text-secondary-600 dark:text-secondary-400">
          Please sign in to upload files.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-secondary-800 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-secondary-800 dark:text-secondary-200">
        File Uploader
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-sm">
          {success}
        </div>
      )}
      
      <div className="mb-6">
        <label 
          htmlFor="file-upload" 
          className="block mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300"
        >
          Select a file to upload
        </label>
        <input
          id="file-upload"
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-secondary-600 dark:text-secondary-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-primary-600 file:text-white
            hover:file:bg-primary-700
            file:cursor-pointer file:transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-500">
          Allowed types: {allowedTypes.join(', ')} | Max size: {maxSizeMB}MB
        </p>
      </div>
      
      {uploading && (
        <div className="mb-4 flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-secondary-600 dark:text-secondary-400">Uploading...</span>
        </div>
      )}
      
      {files.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2 text-secondary-800 dark:text-secondary-200">
            Uploaded Files
          </h3>
          <ul className="space-y-2">
            {files.map((file) => (
              <li key={file.path} className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-900 rounded-md">
                <div>
                  <a 
                    href={file.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {file.name}
                  </a>
                  <p className="text-xs text-secondary-500 dark:text-secondary-500">
                    {new Date(file.uploadedAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(file)}
                  className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  aria-label="Delete file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
