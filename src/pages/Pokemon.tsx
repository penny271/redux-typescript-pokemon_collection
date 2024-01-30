// rfce
import React from 'react'
import Wrapper from '../sections/Wrapper';

function Pokemon() {
  return (
    <div>Pokemon</div>
  )
}

// export default Pokemon
// Wrapper 高位コンポーネントを通じて exportする
export default Wrapper(Pokemon);
