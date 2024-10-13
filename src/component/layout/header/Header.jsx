import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import "./b.css";
import SearchForm from "./SearchForm";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = sessionStorage.getItem("darkMode");
    return savedMode === "true";
  });
  
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      sessionStorage.setItem("darkMode", newMode);
      document.body.dataset.theme = newMode ? "dark" : "";
      return newMode;
    });
  };

  const openAction = () => {
    setUserMenuOpen((prevOpen) => !prevOpen); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-menu") && !event.target.closest(".user-button")) {
        setUserMenuOpen(false); 
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.dataset.theme = darkMode ? "dark" : "";
  }, [darkMode]);

  const navigate = useNavigate();
  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <header>
      <div className="header-container">
        <div className="header-left">
          <div className="headerF">
            <label className="label-nav" htmlFor="tgnavmL">
              <FontAwesomeIcon icon={faBars} />
            </label>
          </div>
          <div className="title-bg">
            <div id="title">
              <NavLink to={"/"}>Gawasna's Blog</NavLink>
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="headerS">
            <SearchForm></SearchForm>
          </div>
          <div className="headerM">
            <button className="theme-button" onClick={toggleTheme}>
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
            <button className="user-button" onClick={openAction}>
              <FontAwesomeIcon icon={faUser} />
            </button>
            {userMenuOpen && (
              <div className="user-menu">
                <NavLink to={"/login"} onClick={() => handleNav("/login")}>Login</NavLink>
                <NavLink to={"/signup"} onClick={() => handleNav("/signup")}>Sign Up</NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
