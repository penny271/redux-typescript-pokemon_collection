// 高階コンポーネント化する
// 高階コンポーネント(HOC、Higher Order Component) は、他のコンポーネントを受け取るコンポーネントです。 HOC には、パラメータとして渡されるコンポーネントに適用する何らかのロジックが含まれています。 そのロジックを適用した上で、HOC は追加されたロジックとともに要素を返します。
// コンポーネントが props を UI に変換するのに対して、高階コンポーネントはコンポーネントを別のコンポーネントに変換します。

import React from 'react'

// function Wrapper() {
//   return (
//     <div className='content'>Wrapper</div>
//   )
// }

// export default Wrapper

const Wrapper = (Component: React.FC) => () => {
  return (
    <div className="content abc">
      <Component/>
    </div>
  );
}

export default Wrapper
