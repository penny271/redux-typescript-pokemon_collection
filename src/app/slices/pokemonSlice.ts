// src/app/slices/pokemonSlice.ts

import { createSlice } from "@reduxjs/toolkit";
// 自作の型ファイル
import { PokemonTypeInitialState, generatedPokemonType } from "../../utils/Types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";
import { getPokemonData } from "../reducers/getPokemonData";
import { getUserPokemons } from "../reducers/getUserPokemons";
import { removePokemon } from "../reducers/removePokemonFromUserList";

// type が PokemonTypeInitialState(typeScript)
const initialState: PokemonTypeInitialState = {
  allPokemon: undefined,
  randomPokemons: undefined,
  comparedQueue: [],
  userPokemons: [],
  currentPokemon: undefined,
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
    },
    // 現在選択されているポケモン情報を管理する
    setCurrentPokemon: (state, action) => {
      state.currentPokemon = action.payload;
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
    });
    builder.addCase(getUserPokemons.fulfilled, (state, action) => {
      state.userPokemons = action.payload!;
    });
    // MY Listから削除されたポケモンを削除する
    builder.addCase(removePokemon.fulfilled, (state, action) => {
      const userPokemon = [...state.userPokemons];
      const index = userPokemon.findIndex(
        (pokemon) => pokemon.firebaseId === action.payload?.id
      );
      userPokemon.splice(index, 1);
      state.userPokemons = userPokemon;
    })
  }
});

// actions(reducer) を export
// Typically, if you had defined reducers, Redux Toolkit would automatically generate corresponding actions, which you could then destructure and export for use elsewhere in your application.
export const { addToCompare, removeFromCompare, setCurrentPokemon } = PokemonSlice.actions;