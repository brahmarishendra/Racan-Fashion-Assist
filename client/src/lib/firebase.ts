import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, User, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5Cnc7pSiBkVj1urKxQNlTVkHKvUzAFo8",
  authDomain: "fashion-ai-9a90d.firebaseapp.com",
  projectId: "fashion-ai-9a90d",
  storageBucket: "fashion-ai-9a90d.appspot.com",
  messagingSenderId: "323896131179",
  appId: "1:323896131179:web:2c96102ebef89da1153b2e",
  measurementId: "G-TDLGEJWJHC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Authentication functions
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Custom hook for authentication state
const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    currentUser,
    loading,
    signInWithGoogle,
    signOut,
  };
};

export { auth, signInWithGoogle, signOut, useAuth };