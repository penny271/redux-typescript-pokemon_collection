// src/pages/PokemonPages/Location.tsx

import React from 'react'
import { useAppSelector } from '../../app/hooks'

function Location() {
  // nested destructuring で currentPokemonを取得し、新しい変数に入れ直すことで
  // 変数名を変更している
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );

  return (
    <div className='pokemon-locations'>
      <ul className="pokemon-locations-list">
        {pokemonData?.encounters.map((encounter: string) => (
          <li key={encounter} className="pokemon-location">
            {encounter}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Location