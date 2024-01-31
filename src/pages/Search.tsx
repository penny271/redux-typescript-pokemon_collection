// rfce
import React, { useEffect } from 'react'
import Wrapper from '../sections/Wrapper';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getInitialPokemonData } from '../app/reducers/getInitialPokemonData';

function Search() {
  const dispatch = useAppDispatch();

  // // ^^^^^^^^^^^ 分割代入を使わずに store.ts の sliceにアクセスする場合 ^^^^^^^^^^^
  // // First, get the entire 'pokemon' slice from the Redux state
  // const pokemonState = useAppSelector((state) => state.pokemon);

  // // Then, access the 'allPokemon' property from this slice
  // const allPokemon = pokemonState.allPokemon;
  // // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  // - useSelectorを使うことでReduxのstoreのstateにデータを登録することが可能になる
  // store.ts の reducerの複数ある特定の slice の state にアクセスするため
  // ({ pokemon })のように分割代入している
  // ※ The braces {} around pokemon are not a block of code but signify object destructuring. It's a shorthand for (state) => state.pokemon.
  // 構文として useAppSelector の引数は 関数である必要があるため arrow 関数を使っている
  // { allPokemon } は state.allPokemon を 分割代入したもの

  // const pokemonState = useAppSelector((state) => state.pokemon);
  // const allPokemon = pokemonState.allPokemon;
  // - 上記と同じ
  const { allPokemon } = useAppSelector(({pokemon}) => pokemon)

  useEffect(() => {
    // pokeApiからポケモン情報を取得する
    dispatch(getInitialPokemonData());
  }, [dispatch])
  return (
    <div>Search</div>
  )
}

// export default Search
// Wrapper 高位コンポーネントを通じて exportする
export default Wrapper(Search);
