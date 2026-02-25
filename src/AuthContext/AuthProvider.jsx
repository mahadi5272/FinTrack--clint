import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

export const AuthContext = createContext();
const google = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  const [role, setrole] = useState(null);

  // signup
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // signIn
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // signOut
  const LogOut = () => {
    setloading(true);
    return signOut(auth);
  };

  // signInWithGoogle
  const signInWithGoogle = () => {
    return signInWithPopup(auth, google);
  };
  // প্রোফাইল আপডেটের ফাংশনটি যোগ করুন
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscrib = onAuthStateChanged(auth, (currentuser) => {
      setuser(currentuser);
      setloading(false);
      if (currentuser) {
        fetch(`http://localhost:3000/users/${currentuser.email}`)
          .then(res => res.json())
          .then((data) => {
            setrole(data.role);
            console.log("Database response:", data);
          })
          .catch((err) => {
            console.log("সার্ভার চালু নেই বা কানেকশন পাওয়া যাচ্ছে না");
            console.log(err);
          });
      }
    });
    return () => unsubscrib();
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
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
