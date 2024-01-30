// rfce
import React from 'react'
import Wrapper from '../sections/Wrapper'

function About() {
  return (
    <div>About</div>
  )
}

// export default About
// Wrapper 高位コンポーネントを通じて exportする
export default Wrapper(About);