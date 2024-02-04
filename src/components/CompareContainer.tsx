// src/components/CompareContainer.tsx
// rfce

import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { pokemonStatType, pokemonTypeInterface, userPokemonsType } from '../utils/Types';
import { FaPlus } from 'react-icons/fa';
import { pokemonTypes } from '../utils/getPokemonTypes';
import { removeFromCompare } from '../app/slices/pokemonSlice';
import { useNavigate } from 'react-router-dom';


// propsを引数に受け取る
// 直接、型付けをしている
function CompareContainer({
  pokemon = undefined,
  isEmpty=false
}: {
    pokemon?: userPokemonsType;
    isEmpty?: boolean;
  }) {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Strengthや Weaknessといったステータス情報一覧を配列で取得する
  const createStatsArray = (
    types: pokemonTypeInterface[],
    statType: pokemonStatType
  ) => {
    const statsArray: { name: string; image: string }[] = [];
    const statsSet = new Set<string>();
    types.forEach((type: pokemonTypeInterface) => {
      const key = Object.keys(type)[0];
      console.log('createStatsArray-key :>> ', key); // dragon
      console.log('createStatsArray-type :>> ', type);
      // dragon : {image: '/static/media/d.png', strength: Array(1), weakness: Array(2), resistance: Array(4), vulnerable: Array(3)}
      type[key][statType].forEach((stat: string) => {
        // 重複を防ぐ 例: strengthに 'fire'が2回入らないようにする
        if (!statsSet.has(stat)) {
          // @ts-ignore
          statsArray.push({ name: stat, image: pokemonTypes[stat].image });
          statsSet.add(stat);
        }
      });
    });
    return statsArray;
  }

  // ステータス関連の html を作成する
  const getStats = () => {
    return (
      <>
        {/* strength */}
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Strength</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemon?.types!, "strength").map(
              (stat: { image: string }) => (
                <div className="pokemon-type">
                  <img
                    src={stat.image}
                    alt="pokemon type"
                    className="pokemon-type-image"
                  />
                </div>
              )
            )}
          </div>
        </div>
        {/* resistance */}
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Resistance</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemon?.types!, "resistance").map(
              (stat: { image: string }) => (
                <div className="pokemon-type">
                  <img
                    src={stat.image}
                    alt="pokemon type"
                    className="pokemon-type-image"
                  />
                </div>
              )
            )}
          </div>
        </div>
        {/* vulnerable */}
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Vulnerable</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemon?.types!, "vulnerable").map(
              (stat: { image: string }) => (
                <div className="pokemon-type">
                  <img
                    src={stat.image}
                    alt="pokemon type"
                    className="pokemon-type-image"
                  />
                </div>
              )
            )}
          </div>
        </div>
        {/* weakness */}
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Weakness</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemon?.types!, "weakness").map(
              (stat: { image: string }) => (
                <div className="pokemon-type">
                  <img
                    src={stat.image}
                    alt="pokemon type"
                    className="pokemon-type-image"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </>)
    }
  return <div className="compare-container">
    {/* SEARCHから compareボタンを押されていない場合、追加ボタンを表示 */}
    {isEmpty && (
      <div className="empty">
        <button>
          <FaPlus/>
        </button>
        <h3>Add Pokemon to Comparison</h3>
      </div>
    )}
    {/* SEARCHから compareボタンを押されていた場合、ポケモンを横並びで表示 */}
    {pokemon && (
      <div className="compare-element">
        <div className="compare-info">
          <div className="compare-details">
            <h3>{pokemon?.name}</h3>
            <img
              src={pokemon?.image}
              alt="pokemon"
              className="compare-image"
            />
          </div>
          <div className="pokemon-types-container">
            <div className="pokemon-types">
              <h4 className="pokemon-type-title">Type</h4>
              <div className="pokemon-type-icons">
                {pokemon?.types.map((type: pokemonTypeInterface) => {
                  const keys = Object.keys(type);
                  return (
                    <div className="pokemon-type">
                      <img src={ type[keys[0]].image} alt="pokemon type" className="pokemon-type-image" />
                    </div>
                    )
                  })
                }
              </div>
            </div>
            {/* getStats()内で 作成した ステータス関連の htmlを returnし、挿入する */}
            {getStats()}
          </div>
        </div>
        <div className="compare-action-buttons">
          <button className="compare-btn" >Add</button>
          <button className="compare-btn"
            onClick={() => navigate(`/pokemon/${pokemon.id}`)}
          >
            View
          </button>
          {/* {id:pokemon.id} は dispatch先で action.payload として使われる*/}
          {/* compareから比較対象となっているポケモンを削除する */}
          <button className="compare-btn" onClick={()=> dispatch(removeFromCompare({id:pokemon.id}))}>Remove</button>
        </div>
      </div>
    )

    }
  </div>
}

export default CompareContainer