import Banner from "../../component/layout/banner/banner";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import '../../component/css/HomePage.css'
import StandardButton from "@/component/common/Button";
import NavBar from "@/component/layout/nav/Nav";
import { useState, useEffect } from "react";
import PopularSide from "@/component/layout/ftp/PAside";
import MainPosts from "@/component/layout/pl/MainPosts";

function HomePage() {
  const navigate = useNavigate();

  const handleNavToRegister = (path) => {
    navigate(path);
  };

  return (
    <div className="mainL">
      <div className="navmL">
        <NavBar />
      </div>
      <div className="blogCtn">
        <div className="secBIn">
          <div className="blogM">
          <MainPosts showBanner={true} />
              <PopularSide/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
