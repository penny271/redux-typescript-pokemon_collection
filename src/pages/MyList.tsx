// src/pages/MyList.tsx

import React, { useEffect } from 'react'
import Wrapper from '../sections/Wrapper';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Login from '../assets/Login';
import PokemonCardGrid from '../components/PokemonCardGrid';
import { getUserPokemons } from '../app/reducers/getUserPokemons';

function MyList() {
  // const state = useAppSelector(({ app }) => app)
  // {toasts: Array(0), userInfo: undefined}
  const { userInfo } = useAppSelector(({ app }) => app);
  const { userPokemons } = useAppSelector(({ pokemon }) => pokemon);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserPokemons());
  }, [userInfo, dispatch]);
  console.log('userPokemons :>> ', userPokemons);
  return (
    <div className="list">
      {/* App.tsx を通じて、ログイン状態に応じて表示を変える */}
      {userInfo ? <PokemonCardGrid pokemons={userPokemons} /> : <Login />}
    </div>
  )
}

// export default MyList
// Wrapper 高位コンポーネントを通じて exportする
export default Wrapper(MyList);



