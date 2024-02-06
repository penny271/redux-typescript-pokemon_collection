// src/app/reducers/addPokemonToList.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonStatType, pokemonTypeInterface, userPokemonsType } from "../../utils/Types";
import { RootState } from "../store";
import { setToast } from "../slices/AppSlice";
import { pokemonListRef } from "../../utils/FirebaseConfig";
import { addDoc } from "firebase/firestore";

export const addPokemonToList = createAsyncThunk(
  "pokemon/addPokemon",
  async (
    pokemon: {
      id: number;
      name: string;
      types: pokemonTypeInterface[] | string[];
      stats?: pokemonStatType[];
    },
    // - createAsyncThunk で 自動で追加されるメソッド
    {getState, dispatch}
  ) => {
    try {
      // * getStateは createAsyncThunk 自動で追加されるもので
      // * 現在の Redux storeの stateにアクセスできるもの
      // * createAsyncThunkの第二引数に設定することで使えるようになる
      const {
        app: { userInfo },
        pokemon: { userPokemons },
      } = getState() as RootState;

      if (!userInfo?.email) {
        return dispatch(
          setToast("Please login in order to add pokemnon to your collection.")
        );
      }
      const index = userPokemons.findIndex((userPokemon: userPokemonsType) => {
        console.log('userPokemon.name', userPokemon.name)
        return userPokemon.name === pokemon.name;
      });

      console.log('userPokemons', userPokemons)
      console.log('pokemon.name', pokemon.name)
      // pokemonが登録されていなかったとき
      if (index === -1) {
        let types: string[] = [];
        // types = pokemon.types as string[];

        if (!pokemon.stats) {
          pokemon.types.forEach((type: any) => {
            types.push(Object.keys(type).toString());
          });
        } else {
          types = pokemon.types as string[];
        }

        await addDoc(pokemonListRef, {
          pokemon: { id: pokemon.id, name: pokemon.name, types },
          email: userInfo.email,
        })
        // await dispatch(getUserPokemons());
        return dispatch(setToast(`${pokemon.name} added to your collection.`));
      } else {
        return dispatch(setToast(`${pokemon.name} already part of your collection.`));
      }
    } catch (err) {
      console.log('err :>> ', err);
    }
  }
)