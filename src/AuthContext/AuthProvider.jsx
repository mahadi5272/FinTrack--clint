import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.config";
import axios from "axios"; // axios ইনস্টল করা না থাকলে npm i axios করে নিন

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  // ১. সাইন আপ
  const signup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ২. সাইন ইন
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ৩. লগ আউট
  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ৪. গুগল দিয়ে সাইন ইন
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ৫. প্রোফাইল আপডেট
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // ৬. অথ অবজার্ভার এবং JWT লজিক
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // ইউজার লগইন থাকলে টোকেন সংগ্রহ করা
        const userInfo = { email: currentUser.email };
        axios.post('http://localhost:3000/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token);
              setLoading(false);
            }
          })
          .catch(err => {
            console.error("JWT Error:", err);
            setLoading(false);
          });

        // ইউজারের রোল চেক করা
        axios.get(`http://localhost:3000/users/${currentUser.email}`)
          .then(res => {
            setRole(res.data.role);
          })
          .catch(() => console.log("Role fetch error"));

      } else {
        // ইউজার লগআউট করলে টোকেন মুছে ফেলা
        localStorage.removeItem('access-token');
        setRole(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    loading,
    role,
    user,
    signup,
    signIn,
    LogOut,
    signInWithGoogle,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;