// src/components/CompareContainer.tsx
// rfce

import React from 'react'
import { useAppSelector } from '../app/hooks'
import { userPokemonsType } from '../utils/Types';

// propsを引数に受け取る
// 直接、型付けをしている
function CompareContainer({
  pokemon = undefined,
  isEmpty=false
}: {
    pokemon?: userPokemonsType;
    isEmpty?: boolean;
}) {
  return <div>CompareContainer
    {isEmpty && (
      <div className="empty">
        <button></button>
        <h3>Add Pokemon to Comparison</h3>
      </div>
    )}
  </div>
}

export default CompareContainer