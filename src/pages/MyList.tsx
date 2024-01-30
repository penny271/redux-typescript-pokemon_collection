import React from 'react'
import Wrapper from '../sections/Wrapper';

function MyList() {
  return (
    <div>MyList</div>
  )
}

// export default MyList
// Wrapper 高位コンポーネントを通じて exportする
export default Wrapper(MyList);