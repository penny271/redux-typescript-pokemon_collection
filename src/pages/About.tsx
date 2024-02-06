// src/pages/About.tsx

// rfce
import React from "react";
import Wrapper from "../sections/Wrapper";
import avatarImage from "../assets/hirotaka.png";
import { FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa";

function About() {
  return (
    <div className="profile">
      <img src={avatarImage} alt="" className="profile-image" />
      <h1 className="profile-text">Hi I am Hirotaka</h1>
      <h2 className="profile-text">The creator of this awesome pokedex</h2>
      <h4 className="profile-text">
        Thank you for visiting!!
      </h4>
      {/* <div className="profile-links">
        <a href="">
          <FaGithub />
        </a>
        <a href="">
          <FaYoutube />
        </a>
        <a href="">
          <FaLinkedin />
        </a>
      </div> */}
    </div>
  );
}

export default Wrapper(About);