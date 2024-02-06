// src/sections/Footer.tsx

import React from 'react'
import {MdOutlinePowerSettingsNew} from 'react-icons/md'
import { useAppDispatch } from '../app/hooks';
import { firebaseAuth } from '../utils/FirebaseConfig';
import { signOut } from 'firebase/auth';
import { setToast, setUserStatus } from '../app/slices/AppSlice';


function Footer() {
  const dispatch = useAppDispatch();
  // ログアウト処理
  const handleLogout = () => {
    signOut(firebaseAuth);
    dispatch(setUserStatus(undefined));
    dispatch(setToast('Logged out successfully from Firebase.'));
  };
  return (
    <footer>
      <div className="block"></div>
      <div className="data"></div>
      <div className="block">
        <MdOutlinePowerSettingsNew onClick={handleLogout} />
      </div>
    </footer>
  )
}

export default Footer