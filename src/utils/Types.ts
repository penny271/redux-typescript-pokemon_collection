// src/utils/Types.ts

export interface AppTypeInitialState {
  toasts: string[];
}

export interface PokemonTypeInitialState {
  // genericPokemonType[]; 配列の中の要素は genericPokemonTypeと同じにするという意味
  allPokemon: undefined | genericPokemonType[];
  randomPokemons: undefined | generatedPokemonType[];
  comparedQueue: generatedPokemonType[];
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