export interface AppTypeInitialState { }

export interface PokemonTypeInitialState {
  // genericPokemonType[]; 配列の中の要素は genericPokemonTypeと同じにするという意味
  allPokemon: undefined | genericPokemonType[];
}

export interface genericPokemonType {
  name: string;
  url: string;
}