// src/components/PokemonCardGrid.tsx

// rfce
import React from 'react'
import { userPokemonsType } from '../utils/Types'

// function PokemonCardGrid(props: { pokemons: userPokemonsType[] }) {
// 分割代入で直接pokemonsプロパティにアクセスできるようにしている
function PokemonCardGrid({pokemons}: {pokemons: userPokemonsType[]}) {
  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons?.map((data: userPokemonsType) => {
            return (
              <div className="pokemon-card" key={data.id}>
                <div className="pokemon-card-list"></div>
                <div className="pokemon-card-compare"></div>
                <div className="pokemon-card-title"></div>
                <h3 className="pokemon-card-title">{data.name}</h3>
                <img
                  src={data.image}
                  alt="pokemon"
                  className="pokemon-card-image" />
              </div>
            )
          })

        }
      </div>
    </div>
  )
}

export default PokemonCardGrid