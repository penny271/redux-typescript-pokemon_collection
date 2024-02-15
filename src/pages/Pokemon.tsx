// src/pages/Pokemon.tsx

import React, { useEffect, useCallback } from "react";
import Wrapper from "../sections/Wrapper";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import axios from "axios";
import { pokemonRoute, pokemonSpeciesRoute, pokemonTabs } from "../utils/Constants";
import { defaultImages, images } from "../utils/getPokemonImages";
import { extractColors } from "extract-colors";
import Description from "./PokemonPages/Description";
import Evolution from "./PokemonPages/Evolution";
import CapableMoves from "./PokemonPages/CapableMoves";
import Location from "./PokemonPages/Location";
import { setCurrentPokemon } from "../app/slices/pokemonSlice";

function Pokemon() {
  // 現在のページのurl にアクセスできるようになる
  // http://localhost:3000/pokemon/1
  // App.tsx <Route element={<Pokemon />} path="/pokemon/:id" />
  const params = useParams();
  const dispatch = useAppDispatch();
  // 現在のタブの状態を取り出す
  const {currentPokemonTab} = useAppSelector(({app}) => app)

  // useCallbackの空の依存配列[]は、関数がコンポーネントのスコープから外部の値に依存しないという仮定の下で、コンポーネントのすべてのレンダリングにわたって、関数インスタンスを安定して変更しないようにReactに信号を送ります。これは、特に高度な計算や子コンポーネントに渡される関数のパフォーマンスを最適化するのに役立ちます。
  const getRecursiveEvolution: any = useCallback(
    (evolutionChain: any, level: number, evolutionData: any) => {
      // 進化先がなくなり次第 return で処理を止める
      if (!evolutionChain.evolves_to.length) {
        return evolutionData.push({
          pokemon: {
            ...evolutionChain.species,
            url: evolutionChain.species.url.replace(
              "pokemon-species",
              "pokemon"
            ),
          },
          level,
        });
      }
      evolutionData.push({
        pokemon: {
          ...evolutionChain.species,
          url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
        },
        level, // level: level, と同義 shorthand property notation
      });
      return getRecursiveEvolution(
        evolutionChain.evolves_to[0],
        level + 1,
        evolutionData
      );
    },
    []
  );

  const getEvolutionData = useCallback(
    (evolutionChain: any) => {
      const evolutionData: any[] = [];
      getRecursiveEvolution(evolutionChain, 1, evolutionData);
      return evolutionData;
    },
    [getRecursiveEvolution]
  );

  const getPokemonInfo = useCallback(
    // ポケモンの生息地をapiで取得
    async (image: string) => {
      const { data } = await axios.get(`${pokemonRoute}/${params.id}`);
      const { data: dataEncounters } = await axios.get(
        data.location_area_encounters
      );
      // ポケモンの進化の情報をapiで取得
      // nested destructuring + 変数名の変更
      const {
        data: {
          // url を evolutionURL に変数名を変更している
          evolution_chain: { url: evolutionURL },
        },
      } = await axios.get(`${pokemonSpeciesRoute}/${data.id}`);
      const { data: evolutionData } = await axios.get(evolutionURL);

      // 複数の生息場所を取得
      const encounters: string[] = [];
      dataEncounters.forEach((encounter: any) => {
        encounters.push(
          encounter.location_area.name.toUpperCase().split("-").join(" ")
        );
      });
      console.log('evolutionData:::', evolutionData);
      // 複数の特技を取得
      const pokemonAbilities: { abilities: string[]; moves: string[] } = {
        abilities: data.abilities.map(
          ({ ability }: { ability: { name: string } }) => ability.name
        ),
        moves: data.moves.map(
          ({ move }: { move: { name: string } }) => move.name
        ),
      };
      const evolution = getEvolutionData(evolutionData.chain);
      console.log('evolution:::', evolution)
      // (3) [{…}, {…}, {…}]
      const evolutionLevel = evolution.find(
      // 例: pokemon: {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'}
        ({ pokemon }) => pokemon.name === data.name
      ).level;
      // 選択中のポケモン情報を更新する
      dispatch(setCurrentPokemon({
        id: data.id,
        name: data.name,
        types: data.types.map(
          ({ type: { name } }: { type: { name: string } }) => name
        ),
        image,
        stats: data.stats.map(
          ({
            stat,
            base_stat,
          }: {
            stat: { name: string };
            base_stat: number;
          }) => ({
            name: stat.name,
            value: base_stat,
          })
        ),
        encounters,
        evolutionLevel,
        evolution,
        pokemonAbilities,
      }));

      console.log('POKEMONページのPOKEMONデータ:', {
        id: data.id,
        name: data.name,
        types: data.types.map(
          ({ type: { name } }: { type: { name: string } }) => name
        ),
        image,
        stats: data.stats.map(
          ({
            stat,
            base_stat,
          }: {
            stat: { name: string };
            base_stat: number;
          }) => ({
            name: stat.name,
            value: base_stat,
          })
        ),
        encounters,
        evolutionLevel,
        evolution,
        pokemonAbilities,
      });
    },
    [getEvolutionData, params.id, dispatch]
  );

  useEffect(() => {
    const imageElemet = document.createElement("img");
    // @ts-ignore
    // * params = useParams()で paramsを使用可能にしている
    imageElemet.src = images[params.id];
    if (!imageElemet.src) {
      // @ts-ignore
      imageElemet.src = defaultImages[params.id];
    }

    // ライブラリ extractColors のオプション
    const options = {
      pixels: 10000,
      distance: 1,
      splitPower: 10,
      colorValidator: (red: number, green: number, blue: number, alpha = 255) =>
        alpha > 250,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.083333333,
    };

    const getColor = async () => {
      // ライブラリ yarn add extract-colors
      const color = await extractColors(imageElemet.src, options);
      const root = document.documentElement;
      // POKEMONページで一番広範囲で使われている色を --accent-colorとする
      root.style.setProperty("--accent-color", color[0].hex.split('"')[0]);
    };
    getColor();

    getPokemonInfo(imageElemet.src);
  }, [params, getPokemonInfo]);

  return (
    <div>
      {/* 現在のタブの状態によって表示させるcomponentを変える */}
      {currentPokemonTab === pokemonTabs.description && <Description />}
      {currentPokemonTab === pokemonTabs.evolution && <Evolution />}
      {currentPokemonTab === pokemonTabs.moves && <CapableMoves />}
      {currentPokemonTab === pokemonTabs.locations && <Location />}
    </div>
  );
}

export default Wrapper(Pokemon);