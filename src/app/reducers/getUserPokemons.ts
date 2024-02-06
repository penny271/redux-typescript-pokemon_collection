// src/app/reducers/getUserPokemons.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { pokemonListRef } from "../../utils/FirebaseConfig";
import { getDocs, query, where } from "firebase/firestore";
import { userPokemonsType } from "../../utils/Types";
import { defaultImages, images } from "../../utils/getPokemonImages";
import { pokemonTypes } from "../../utils/getPokemonTypes";

// * getStateは createAsyncThunk 自動で追加されるもので
// * 現在の Redux storeの stateにアクセスできるもの
// * createAsyncThunkの第二引数に設定することで使えるようになる
export const getUserPokemons = createAsyncThunk(
  "pokemon/userList",
  async (args, { getState }) => {
    console.log('oduieajeij');

    try {
      const {
        app: { userInfo },
      } = getState() as RootState;
      if (!userInfo?.email) {
        return;
      }
      const firestoreQuery = query(
        pokemonListRef,
        where("email", "==", userInfo.email)
      );
      const fetchedPokemons = await getDocs(firestoreQuery);
      console.log('fetchedPokemons :>> ', fetchedPokemons);
      if (fetchedPokemons.docs.length) {
        const userPokemons: userPokemonsType[] = [];
        fetchedPokemons.forEach(async (pokemon) => {
          const pokemons = await pokemon.data().pokemon;
          // @ts-ignore
          let image = images[pokemons.id];
          if (!image) {
            // @ts-ignore
            image = defaultImages[pokemons.id];
          }

          const types = pokemons.types.map((name: string) => ({
            // @ts-ignore
            [name]: pokemonTypes[name],
          }));

          console.log('__pokemons', pokemons)
          // // {id: 48, name: 'venonat', types: Array(2)}

          userPokemons.push({
            ...pokemons,
            firebaseId: pokemon.id,
            image,
            types,
          });
          // [{types: Array(2), id: 48, name: 'venonat', firebaseId: 'qSpmfcZRi7tnTf5XKEyR', image: '/static/media/48.7be2426f1db1554001d4.png'}, ...]
        });
        console.log('userPokemons :>> ', userPokemons);
        return userPokemons;
      }
      return [];
    } catch (err) {
      console.log('err :>> ', err);
    }
  }
)