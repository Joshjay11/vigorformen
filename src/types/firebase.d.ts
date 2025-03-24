import { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { Storage } from 'firebase/storage';
import { Analytics } from 'firebase/analytics';

declare module 'firebase/app' {
  export interface FirebaseOptions {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  }
  
  export interface FirebaseApp {
    name: string;
    options: FirebaseOptions;
    automaticDataCollectionEnabled: boolean;
  }
  
  export function initializeApp(options: FirebaseOptions, name?: string): FirebaseApp;
}

declare module 'firebase/firestore' {
  export interface Firestore {
    type: string;
    app: FirebaseApp;
    _databaseId: any;
    _persistenceKey: string;
    _settings: any;
  }

  export interface DocumentData {
    [key: string]: any;
  }

  export interface DocumentReference<T = DocumentData> {
    id: string;
    path: string;
    parent: any;
    type: string;
    firestore: Firestore;
    converter: any;
  }

  export interface DocumentSnapshot<T = DocumentData> {
    id: string;
    ref: DocumentReference<T>;
    exists(): boolean;
    data(): T | undefined;
    get(fieldPath: string): any;
  }

  export interface QuerySnapshot<T = DocumentData> {
    docs: Array<DocumentSnapshot<T>>;
    empty: boolean;
    size: number;
    forEach(callback: (result: DocumentSnapshot<T>) => void): void;
  }

  export interface Query<T = DocumentData> {
    firestore: Firestore;
    converter: any;
    type: string;
    _query: any;
  }

  export interface QueryConstraint {
    type: string;
    _field?: any;
    _direction?: string;
    _value?: any;
    _limit?: number;
    _docOrFields?: any[];
  }

  export interface SnapshotListenOptions {
    includeMetadataChanges?: boolean;
  }

  export interface SetOptions {
    merge?: boolean;
    mergeFields?: Array<string>;
  }

  export type SnapshotCallback<T> = (snapshot: T) => void;
  export type ErrorCallback = (error: Error) => void;
  export type Unsubscribe = () => void;
  
  export function getFirestore(app: FirebaseApp): Firestore;
  export function collection(firestore: Firestore, path: string, ...pathSegments: string[]): any;
  export function doc(firestore: Firestore, path: string, ...pathSegments: string[]): DocumentReference;
  export function getDocs<T = DocumentData>(query: Query<T>): Promise<QuerySnapshot<T>>;
  export function getDoc<T = DocumentData>(reference: DocumentReference<T>): Promise<DocumentSnapshot<T>>;
  export function setDoc<T = DocumentData>(reference: DocumentReference<T>, data: T, options?: SetOptions): Promise<void>;
  export function updateDoc<T = DocumentData>(reference: DocumentReference<T>, data: Partial<T>): Promise<void>;
  export function deleteDoc(reference: DocumentReference): Promise<void>;
  export function query<T = DocumentData>(query: Query<T>, ...queryConstraints: QueryConstraint[]): Query<T>;
  export function where(fieldPath: string, opStr: string, value: any): QueryConstraint;
  export function orderBy(fieldPath: string, directionStr?: 'asc' | 'desc'): QueryConstraint;
  export function limit(limit: number): QueryConstraint;
  export function startAfter(...fieldValues: any[]): QueryConstraint;
  export function endBefore(...fieldValues: any[]): QueryConstraint;
  export function onSnapshot<T = DocumentData>(
    reference: DocumentReference<T>,
    observer: {
      next?: (snapshot: DocumentSnapshot<T>) => void;
      error?: ErrorCallback;
      complete?: () => void;
    } | ((snapshot: DocumentSnapshot<T>) => void),
    onError?: ErrorCallback,
    options?: SnapshotListenOptions
  ): Unsubscribe;
  
  export function onSnapshot<T = DocumentData>(
    reference: Query<T>,
    observer: {
      next?: (snapshot: QuerySnapshot<T>) => void;
      error?: ErrorCallback;
      complete?: () => void;
    } | ((snapshot: QuerySnapshot<T>) => void),
    onError?: ErrorCallback,
    options?: SnapshotListenOptions
  ): Unsubscribe;
}

declare module 'firebase/auth' {
  export interface User {
    uid: string;
    email: string | null;
    emailVerified: boolean;
    displayName: string | null;
    photoURL: string | null;
    phoneNumber: string | null;
    isAnonymous: boolean;
    providerData: any[];
    metadata: {
      creationTime?: string;
      lastSignInTime?: string;
    };
  }

  export interface Auth {
    app: FirebaseApp;
    name: string;
    config: any;
    currentUser: User | null;
    languageCode: string | null;
    settings: any;
  }
  
  export interface UserCredential {
    user: User;
    providerId: string | null;
    operationType: string;
  }
  
  export function getAuth(app: FirebaseApp): Auth;
  export function createUserWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;
  export function signInWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;
  export function signOut(auth: Auth): Promise<void>;
  export function onAuthStateChanged(auth: Auth, nextOrObserver: (user: User | null) => void, error?: (error: Error) => void, completed?: () => void): () => void;
  export function sendPasswordResetEmail(auth: Auth, email: string): Promise<void>;
  export function updateProfile(user: User, profile: { displayName?: string; photoURL?: string }): Promise<void>;
}

declare module 'firebase/storage' {
  export interface Storage {
    app: FirebaseApp;
    maxUploadRetryTime: number;
    maxOperationRetryTime: number;
    host: string;
    port: number;
    protocol: string;
    bucket: string;
  }
  
  export function getStorage(app: FirebaseApp, bucketUrl?: string): Storage;
  export function ref(storage: Storage, url?: string): any;
  export function uploadBytes(reference: any, data: any, metadata?: any): Promise<any>;
  export function uploadString(reference: any, value: string, format?: any, metadata?: any): Promise<any>;
  export function getDownloadURL(reference: any): Promise<string>;
  export function deleteObject(reference: any): Promise<void>;
  export function listAll(reference: any): Promise<any>;
}

declare module 'firebase/analytics' {
  export interface Analytics {
    app: FirebaseApp;
  }
  
  export function getAnalytics(app: FirebaseApp): Analytics;
  export function logEvent(analytics: Analytics, eventName: string, eventParams?: any): void;
  export function setUserId(analytics: Analytics, id: string): void;
  export function setUserProperties(analytics: Analytics, properties: any): void;
}
