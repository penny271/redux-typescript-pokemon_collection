// rfce
import React from 'react'
import Wrapper from '../sections/Wrapper';

function Search() {
  return (
    <div>Search</div>
  )
}

// export default Search
// Wrapper 高位コンポーネントを通じて exportする
export default Wrapper(Search);
