// src/pages/MyList.tsx

import React from 'react'
import Wrapper from '../sections/Wrapper';
import { useAppSelector } from '../app/hooks';
import Login from '../assets/Login';

function MyList() {
  // const state = useAppSelector(({ app }) => app)
  // {toasts: Array(0), userInfo: undefined}
  const {userInfo} = useAppSelector(({ app }) => app)

  return (
    <div className="list">
      <Login />
    </div>
  )
}

// export default MyList
// Wrapper 高位コンポーネントを通じて exportする
export default Wrapper(MyList);