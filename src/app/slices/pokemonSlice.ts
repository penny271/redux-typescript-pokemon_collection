// src/app/slices/pokemonSlice.ts

import { createSlice } from "@reduxjs/toolkit";
// 自作の型ファイル
import { PokemonTypeInitialState, generatedPokemonType } from "../../utils/Types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";
import { getPokemonData } from "../reducers/getPokemonData";

// type が PokemonTypeInitialState(typeScript)
const initialState: PokemonTypeInitialState = {
  allPokemon: undefined,
  randomPokemons: undefined,
  comparedQueue: [],
};

// sliceを作成
export const PokemonSlice = createSlice({
  // action type string
  name: "pokemon",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const index = state.comparedQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
      );
      if (index === -1) {
        // すでに比較しているものがあった場合、
        if (state.comparedQueue.length === 2) {
          state.comparedQueue.pop();
        }
        // 先頭に新しく比較したいpokemonを入れる
        state.comparedQueue.unshift(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      const index = state.comparedQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
      );
      const queue = [...state.comparedQueue];
      // index目から 1つ削除
      queue.splice(index, 1);
      state.comparedQueue = queue;
    }
  },
  // PokemonSliceのextraReducersは、スライス自身のreducersの一部ではないアクションを処理するために使われます。
  // - 具体的には、非同期アクション（getInitialPokemonData.fulfilled）の結果を処理し、そのアクションのペイロードに基づいてスライスの状態を更新します。
  extraReducers: (builder) => {
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      // * getInitialPokemonData の returnされた値が action.payloadに入る
      state.allPokemon = action.payload;
    });
    builder.addCase(getPokemonData.fulfilled, (state, action) => {
      state.randomPokemons = action.payload;
    })
  }
});

// actions(reducer) を export
// Typically, if you had defined reducers, Redux Toolkit would automatically generate corresponding actions, which you could then destructure and export for use elsewhere in your application.
export const { addToCompare, removeFromCompare } = PokemonSlice.actions;