import { createSlice } from "@reduxjs/toolkit";
// 自作の型ファイル
import { PokemonTypeInitialState } from "../../utils/Types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";

// type が PokemonTypeInitialState(typeScript)
const initialState: PokemonTypeInitialState = {
  allPokemon: undefined,
};

// sliceを作成
export const PokemonSlice = createSlice({
  // action type string
  name: "pokemon",
  initialState,
  reducers: {},
  // PokemonSliceのextraReducersは、スライス自身のreducersの一部ではないアクションを処理するために使われます。
  // - 具体的には、非同期アクション（getInitialPokemonData.fulfilled）の結果を処理し、そのアクションのペイロードに基づいてスライスの状態を更新します。
  extraReducers: (builder) => {
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      state.allPokemon = action.payload;
    })
  }
});

// actions(reducer) を export
// Typically, if you had defined reducers, Redux Toolkit would automatically generate corresponding actions, which you could then destructure and export for use elsewhere in your application.
export const { } = PokemonSlice.actions;