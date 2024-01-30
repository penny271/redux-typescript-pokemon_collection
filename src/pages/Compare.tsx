// rfce
import React from 'react'
import Wrapper from '../sections/Wrapper'

function Compare() {
  return (
    <div>Compare</div>
  )
}

// export default Compare
// Wrapper 高位コンポーネントを通じて exportする
export default Wrapper(Compare);