import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonRoute } from "../../utils/Constants";
import axios from "axios";

// pokeApiでポケモンのデータを取ってくる
export const getInitialPokemonData = createAsyncThunk(
  "pokemon/initialData",
  async () => {
    try {
      // 分割代入
      const { data } = await axios.get(pokemonRoute);
      console.log('{data} :>> ', { data });
      // data: {count: 1302, next: null, previous: null, results: Array(1302)}
      return data.results;
    } catch (err) {
      console.log('err :>> ', err);
    }
  }
)

// Axios response format
// {
//   data: {},       // the payload returned from the server
//   status: 200,    // HTTP status code
//   statusText: 'OK',
//   headers: {},    // headers sent by server
//   config: {},     // the request configuration
//   request: {}     // the request instance
// }