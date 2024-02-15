// src/pages/PokemonPages/Evolution.tsx

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getPokemonData } from '../../app/reducers/getPokemonData';
import PokemonCardGrid from '../../components/PokemonCardGrid';

function Evolution() {

  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false)
  const { currentPokemon, randomPokemons } = useAppSelector(({ pokemon }) => pokemon);

  // src/pages/Pokemon.tsx で currentPokemonが更新され、
  // currentPokemon から 進化のポケモン情報を取得し、randomPokemonsを更新する
  useEffect(() => {
    const fetchData = async () => {
      const pokemons = currentPokemon?.evolution.map(({ pokemon }) => pokemon);
      await dispatch(getPokemonData(pokemons!));
      console.log('pokemons:::', pokemons)
      setIsLoaded(true);
    }
    fetchData();
  }, [dispatch, currentPokemon])

  return (
    <div className='page'>
      {isLoaded && <PokemonCardGrid pokemons={randomPokemons!} />
    }</div>
  )
}

export default Evolution