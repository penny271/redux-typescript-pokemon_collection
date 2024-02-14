import React, { useRef } from "react";

export default function App() {
  // const inputEl = useRef(null);
  const inputEl = useRef<HTMLInputElement>(null);
  const onClick = () => {
    if (!inputEl.current) return;

    inputEl.current.focus();
  };

  return (
    <>
      <input ref={ inputEl} type="text" />
      {/* ref 属性に inputEl を指定することで、inputEl.current で DOM にアクセスできる */}
      <input ref={inputEl} type="text" />
      <button onClick={onClick}>input要素をフォーカスする</button>
    </>
  );
}


const continent = {
  name: "北アメリカ",
  us: {
    name: "アメリカ合衆国",
    capitalCity: "ワシントンD.C.",
  },
};

// const { us: name, capitalCity } = continent;
const {us: {name, capitalCity: city}} = continent;