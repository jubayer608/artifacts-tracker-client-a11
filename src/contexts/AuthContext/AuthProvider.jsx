import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import { AuthContext } from './AuthContext';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user with email & password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update user profile (name, photo)
  const updateUserProfile = async (profile) => {
    if (!auth.currentUser) return Promise.reject('No user logged in');
    try {
      await updateProfile(auth.currentUser, profile);
      await auth.currentUser.reload(); // Refresh user data
      setUser(auth.currentUser); // Update context
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Email/password sign in
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google popup sign in
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Sign out
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log('User in auth state changed:', currentUser);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    signInUser,
    signInWithGoogle,
    signOutUser,
    setLoading,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
