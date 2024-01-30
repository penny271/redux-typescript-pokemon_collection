import React from 'react'
import Navbar from './sections/Navbar'
import Wrapper from './sections/Wrapper'
import Footer from './sections/Footer'
import Background from './components/Background'
import './scss/index.scss'
// ルートを設定
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Search from './pages/Search'
import MyList from './pages/MyList'
import About from './pages/About'
import Compare from './pages/Compare'
import Pokemon from './pages/Pokemon'

function App() {
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
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App