// src/pages/Compare.tsx

// rfce
import React from 'react'
import Wrapper from '../sections/Wrapper'
import { useAppSelector } from '../app/hooks'
import CompareContainer from '../components/CompareContainer'

function Compare() {
  // store.js の pokemon: PokemonSlice.reducer の pokemon
  const { comparedQueue } = useAppSelector(({ pokemon }) => pokemon)
  return <div className="compare">
    <CompareContainer
      pokemon={comparedQueue[0]}
      isEmpty={ comparedQueue.length < 1}
    />
    <CompareContainer
      pokemon={comparedQueue[1]}
      isEmpty={ comparedQueue.length < 2}
    />
  </div>
}



// export default Compare
// Wrapper 高位コンポーネントを通じて exportする
export default Wrapper(Compare);