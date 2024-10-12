import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router";

// const navigate = useNavigate();
// const handlenavlink = (path) => {
//   console.log("hello");
//   navigate(path);
// };

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = sessionStorage.getItem("darkMode");
    return savedMode === "true";
  });

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode; 
      sessionStorage.setItem("darkMode", newMode);
      document.body.dataset.theme = newMode ? 'dark' : '';
      return newMode;
    });
  };

  useEffect(() => {
    document.body.dataset.theme = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <header>
      <div className="header-container">
        <div className="header-left">
          <div className="headerF">
            {/* <img
              id="navbtn"
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/menu--v1.png"
              alt="menu--v1"
            />  */}
            {/* <span class="fas fa-bars"></span> */}
            <label className="label-nav" htmlFor="tgnavmL">
                <FontAwesomeIcon icon={faBars} />
              </label>
          </div>
            <div className="title-bg">
            <a id="title" href="/">
              Gawasu's Blog
            </a>
            </div>
        </div>
        <div className="header-right">
        <div className="headerS">
            {/* search function */}
            <form className="search-form" action="searching">
              <input
                type="text"
                name="search"
                id="searchfield"
                placeholder="Search something..."
                autoComplete="off"
              />
              <span id="search-results">
                <ul id="results-list"></ul>
              </span>
              <span className="search-icon">
                <img
                  id="searchbtn"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios/50/search--v1.png"
                  alt="search--v1"
                />
              </span>
              <span className="clear-icon">
                <img
                  id="clear-svg"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios/50/delete-sign--v1.png"
                  alt="delete-sign--v1"
                />
              </span>
            </form>
          </div>
          <div className="headerN">
            <img
              id="navbtn"
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/notifications.png"
              alt="notifications"
            />
          </div>
          <div className="headerM">
            <button className="header-button" onClick={toggleTheme}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
