// src/pages/PokemonPages/Description.tsx

import React from "react";
import Info from "../../components/Info"
import PokemonContainer from "../../components/PokemonContainer";
import { useAppSelector } from "../../app/hooks";

function Description() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return (
    <div>
      {pokemonData && (
        <>
          <Info data={pokemonData} />
          {pokemonData && <PokemonContainer image={pokemonData.image} />}
        </>
      )}
    </div>
  );
}

export default Description;