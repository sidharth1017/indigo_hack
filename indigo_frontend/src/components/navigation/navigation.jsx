import React from "react";
import style from "./navigation.css";

const navigation = () => {
  return (
    <div className="nav">
      <div className="container">
        <div className="logo">
          <img src="./assets/indiGo_logo.avif" alt="" />
        </div>
        <div className="links">
            <span>Home</span>
        </div>
      </div>
    </div>
  );
};

export default navigation;
