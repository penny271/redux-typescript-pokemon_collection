import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { AppSlice } from './slices/AppSlice';
import { PokemonSlice } from './slices/pokemonSlice';

// slicesディレクトリ内の reducerを追加
//- Global領域の State ※ componentからアクセスするとき store.ts の state を使う
export const store = configureStore({
  // reducerの中のkeyの名前は、基本的にsliceファイルで作成した name: "app" と揃えるのが良い
  reducer: {
    app: AppSlice.reducer,
    pokemon: PokemonSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
