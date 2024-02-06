// src/App.tsx

import React, { useEffect } from 'react';
import Navbar from './sections/Navbar';
import Wrapper from './sections/Wrapper';
import Footer from './sections/Footer';
import Background from './components/Background';
import './scss/index.scss';
// ルートを設定
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Search from './pages/Search';
import MyList from './pages/MyList';
import About from './pages/About';
import Compare from './pages/Compare';
import Pokemon from './pages/Pokemon';
// toastの設定 (project作成時に toastify を入れている)
import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from './app/hooks';
import { clearToasts, setUserStatus } from './app/slices/AppSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './utils/FirebaseConfig';

function App() {
  // useAppSelector is a typed version of the useSelector hook for Redux Toolkit applications using TypeScript.
  // It allows you to select data from the Redux store while leveraging TypeScript's type safety.
  //* const { toasts } = useAppSelector((state) => state.app);
  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();

  // ユーザーがログインしている場合、その値を state.userInfo に設定する
  // => ユーザーがログインしているかどうかを判別できるようになる
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch(setUserStatus({email: currentUser.email}))
      }
    })
  }, [dispatch])


  useEffect(() => {
    if (toasts.length) {
      // toastify style 変更
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      })
      // state.toasts を 空 []にする - そうしないとtoastが積み重なっていくため
      dispatch(clearToasts());
    }
  }, [toasts])

  return (
    <div className='main-container'>
      <Background />
      {/* ルートを設定 */}
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            {/* pathに設定された url の場所に合致したときのみ、 componentが表示される */}
            <Route element={<Search/>} path="/search" />
            <Route element={<MyList/>} path="/list" />
            <Route element={<About/>} path="/about" />
            <Route element={<Compare/>} path="/compare" />
            <Route element={<Pokemon />} path="/pokemon/:id" />
            {/* default route 上記のどれにもマッチしない場合 */}
            <Route element={<Navigate to="/pokemon/1"/>} path="*" />
          </Routes>
          {/* 高階コンポーネント にするため Wrapperを コメントアウト */}
          {/* 上記のルートの各コンポーネントを Wrapperを通じて表示する */}
          {/* <Wrapper /> */}
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App