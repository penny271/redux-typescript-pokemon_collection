// src/app/reducers/getPokemonData.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { generatedPokemonType, genericPokemonType } from "../../utils/Types";
import axios from "axios";
import { defaultImages, images } from "../../utils/getPokemonImages";
import { pokemonTypes } from "../../utils/getPokemonTypes";

export const getPokemonData = createAsyncThunk(
  "pokemon/randomPokemon",
  // pokemons は randomPokemonsId <= 要素が20個入った配列 (Search.tsx )より
  // [{name: 'quagsire', url: 'https://pokeapi.co/api/v2/pokemon/195/'},{},{}..]
  // Search.tsx の dispatch(getPokemonData(randomPokemonsId));
  async (pokemons: genericPokemonType[]) => {
    try {
      const pokemonData: generatedPokemonType[] = [];

      // 結果一つ一つを待つ
      for await (const pokemon of pokemons) {
        const { data }: {
          data: {
            id: number;
            types: { type: generatedPokemonType }[];
          };
        } = await axios.get(pokemon.url);

        const types = data.types.map(
          // { type: { name } } は data.types の 中身をネスト分割代入している
          // data.types配列の各要素に期待される構造を宣言している。これはTypeScriptに、各要素はプロパティ型を持つオブジェクトであり、それ自体がstring型のプロパティ名を持つオブジェクトであることを伝えている。
          ({ type: { name } }: { type: { name: string } }) => ({
            // computed properties typeの中の nameプロパティ名を動的に変えられる
            // @ts-expect-error
            [name]: pokemonTypes[name]
            // 結果例: water: {image: '/static/media/water.123.svg', strength: Array(3), weakness: Array(3), resistance: Array(4), vulnerable: Array(2)}
          })
        );

        console.log('types :>> ', types);

        // @ts-expect-error
        let image: string = images[data.id]
        if (!image) {
          // @ts-expect-error
          image = defaultImages[data.id]
        }

        if (image) {
          pokemonData.push({
            name: pokemon.name,
            id: data.id,
            image,
            types,
          })
        }
      }
      console.log('{pokemonData} :>> ', {pokemonData});
      console.log({ pokemons }, "from reducer");
      return pokemonData;
    } catch (err) {
      console.log(err);
    }
  }
)