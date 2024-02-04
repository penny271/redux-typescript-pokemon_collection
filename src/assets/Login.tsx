// src/assets/Login.tsx

import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch } from '../app/hooks';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth, userRef } from '../utils/FirebaseConfig';
import { addDoc, getDocs, query, where } from 'firebase/firestore';
import { setUserStatus } from '../app/slices/AppSlice';

function Login() {
  const dispatch = useAppDispatch();
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { email, uid },
    } = await signInWithPopup(firebaseAuth, provider);
    if (email) {
      const firestoreQuery = query(userRef, where("uid", "==", uid));
      const fetchedUser = await getDocs(firestoreQuery);
      // ユーザーが未登録の場合、新規作成
      if (fetchedUser.docs.length === 0) {
        await addDoc(userRef, { uid, email });
      }
      dispatch(setUserStatus({email}))
    }
  }

  return (
    <div className="login">
      <button className="login-btn" onClick={handleLogin}>
        <FcGoogle />
        Login with Google
      </button>
    </div>
  )
}

export default Login;