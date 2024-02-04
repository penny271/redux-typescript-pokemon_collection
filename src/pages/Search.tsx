// src/pages/Search.tsx

// rfce
import React, { useEffect } from 'react'
import Wrapper from '../sections/Wrapper';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getInitialPokemonData } from '../app/reducers/getInitialPokemonData';
import { getPokemonData } from '../app/reducers/getPokemonData';
import PokemonCardGrid from '../components/PokemonCardGrid';
import { debounce } from '../utils/Debounce';

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
  const { allPokemon, randomPokemons } = useAppSelector(({pokemon}) => pokemon)

  useEffect(() => {
    // pokeApiからポケモン情報を取得する
    dispatch(getInitialPokemonData());
  }, [dispatch])

  // ランダムにポケモンのデータを20要素まで取得する
  useEffect(() => {
    if (allPokemon) {
      // shallow copyする .sort()は直接結果を書き換えるため
      const clonePokemons = [...allPokemon];
      const randomPokemonsId = clonePokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      console.log('randomPokemonsId :>> ', randomPokemonsId);
      // アクションをディスパッチする 実際にこのアクションをReduxストアに送り、
      // 状態更新をトリガーするには、
      // dispatch(getPokemonData(randomPokemonsId))を使います。
      dispatch(getPokemonData(randomPokemonsId));
    }
  }, [allPokemon, dispatch])

  // debounce処理 ポケモンサーチバーのリアルタイム検索のapi発行数を削減させるため
  // * e.target.value が debounce関数発火後の return(...args:any) => {} に渡される
  // 初回呼び出しでinitialized - decounce()の中の return の関数を 変数handleChangeが保持
  // closureを作成
  const handleChange = debounce((value: string) => getPokemon(value), 300);

  // サーチで特定のポケモンを取得、表示する
  // * async は 後続のコードで awaitを使わないのであれば不要
  const getPokemon = async (value: string) => {
    // サーチバーでサーチした場合
    if (value.length) {
      const pokemons = allPokemon?.filter((pokemon) =>
        pokemon.name.includes(value.toLowerCase())
      );
      dispatch(getPokemonData(pokemons!));
    // サーチバーが殻になった場合、ランダムに20枚取得する
    } else {
      const clonePokemons = [...(allPokemon as [])];
      const randomPokemonsId = clonePokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
        dispatch(getPokemonData(randomPokemonsId))
    }
  }

  return (
    <>
      <div className="search">
        <input
          type="text"
          className='pokemon-searchbar'
          placeholder='Search Pokemon'
          onChange={(e) => handleChange(e.target.value)}
        />
        {/* onChange={(e) => getPokemon(e.target.value)} */}

        {/* TypeScriptでは、!post-fix式を変数や式の後に使うと、非NULLのアサーション演算子になる。これはTypeScriptに対して、たとえ型チェックでそうでないことが示唆されたとしても、その値が間違いなくnullでもundefinedでもないことを示すものである。 */}
        <PokemonCardGrid pokemons={randomPokemons!} />
      </div>
    </>
  )
}

// export default Search
// Wrapper 高位コンポーネントを通じて exportする
export default Wrapper(Search);
