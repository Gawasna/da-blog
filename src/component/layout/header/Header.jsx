import React, { useState } from "react";
import "./Header.css"; // Import CSS file

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.style.backgroundColor = darkMode ? "#ffffff" : "#343a40";
    document.body.style.color = darkMode ? "#000000" : "#ffffff";
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="headerF">
            <img
              id="navbtn"
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/menu--v1.png"
              alt="menu--v1"
            />
            <div className="text-background">
              <h3 id="title">My App</h3>
            </div>
            
          </div>
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
        </div>
        <div className="header-right">
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
