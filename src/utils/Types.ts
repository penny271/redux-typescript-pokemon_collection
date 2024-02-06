// src/utils/Types.ts

export interface AppTypeInitialState {
  toasts: string[];
  userInfo: undefined | { email: string };
}

export interface PokemonTypeInitialState {
  // genericPokemonType[]; 配列の中の要素は genericPokemonTypeと同じにするという意味
  allPokemon: undefined | genericPokemonType[];
  randomPokemons: undefined | generatedPokemonType[];
  comparedQueue: generatedPokemonType[];
  userPokemons: userPokemonsType[];
}

export interface genericPokemonType {
  name: string;
  url: string;
}

export interface generatedPokemonType {
  name: string;
  id: number;
  image: string;
  types: pokemonTypeInterface[];
}
export interface pokemonTypeInterface {
  [key: string]: {
    image: string;
    resistance: string[];
    strength: string[];
    weakness: string[];
    vulnerable: string[];
  }
}

// extends -- generatedPokemonType のタイプすべて + 追加のタイプ
export interface userPokemonsType extends generatedPokemonType {
  // オプショナルで必須ではない
  firebaseId?: string;
}

// 固定の文字列を型に指定している
// - Use type when you need more flexibility or when defining unions, intersections, primitives, or tuples.
export type pokemonStatType =
  "vulnerable"
  | "weakness"
  | "strength"
  | "resistance";

export interface pokemonStatsType {
  name: string;
  value: string
}