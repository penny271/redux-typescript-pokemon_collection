// src/utils/Constants.ts

// プロジェクト全体で使う値をまとめるファイル
// export const pokemonAPI = "https://pokeapi.co/api/v2/";
export const pokemonAPI = "https://pokeapi.co/api/v2";
// ポケモンを5000体取得する
export const pokemonsRoute = `${pokemonAPI}/pokemon?limit=5000`;

export const pokemonRoute = `${pokemonAPI}/pokemon`;
export const pokemonSpeciesRoute = `${pokemonAPI}/pokemon-species`;

// POKEMONページ下部のタブ
export const pokemonTabs = {
  description: "description",
  evolution: "evolution",
  locations: "locations",
  moves: "moves",
};