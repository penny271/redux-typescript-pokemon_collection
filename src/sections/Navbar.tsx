import React, { useEffect } from 'react'
import pokeballIcon from "../assets/pokeball-icon.png"
import {GiHamburgerMenu} from 'react-icons/gi'
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  console.log('location :>> ', location);
    // {
    //  "pathname": "/about",
    //  "search": "",
    //  "hash": "",
    //  "state": null,
    //  "key": "fffiuxd4"
    // }
  //Navbar Routes
  const navigationRoutes = [
    {
      name: "Search",
      route: "/search",
    },
    {
      name: "Compare",
      route: "/compare",
    },
    {
      name: "Pokemon",
      route: "/pokemon",
    },
    {
      name: "My List",
      route: "/list",
    },
    {
      name: "About",
      route: "/about",
    },
  ];

  // 画面遷移後の route の一を確認し その位置を ul(位置)に渡す
  // location.pathname or navigationRoutesが変化したときのみ発動する
  useEffect(() => {
    const index = navigationRoutes.findIndex(({ route }) =>
      location.pathname.includes(route)
    )
    ul(index);
  }, [location.pathname, navigationRoutes]);


  // navigationメニューの項目の下線がクリック時に動くようにする
  function ul(index: number) {
    const underlines = document.querySelectorAll<HTMLElement>(".underline")
    for (let i = 0; i < underlines.length; i++) {
      underlines[i].style.transform = "translate3d(" + index * 100 + "%, 0, 0)";
    }
  }


  return (
    <nav>
      <div className="block">
        <img src={ pokeballIcon} alt="pokeball icon" />
      </div>
      <div className="data">
        <ul>
          {/* navメニューの下線一つずつの動く時間を _navbar.scssで差異をつけているため、下線がぬめりと動くように見えるようにしている */}
          <div className="underline"></div>
          <div className="underline"></div>
          <div className="underline"></div>

          {navigationRoutes.map(({ name, route }, index) => {
            return (
              <Link to={route} key={index}>
                <li>{ name }</li>
              </Link>
            )
          })}
        </ul>

      </div>
      <div className="block">
        <GiHamburgerMenu />
      </div>
    </nav>
  )
}

export default Navbar






