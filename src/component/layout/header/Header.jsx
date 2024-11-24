import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./b.css";
import SearchForm from "./SearchForm";
import { AuthContext } from "./AuthContext";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(() => {
    // Get initial state from sessionStorage
    const savedMode = sessionStorage.getItem("darkMode");
    return savedMode === "true";
  });

  // Apply theme on mount and when darkMode changes
  useEffect(() => {
    // Apply theme to body
    document.body.dataset.theme = darkMode ? "dark" : "";
    // Save to sessionStorage
    sessionStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      {isLoggedIn ? (
        <Menu.Item key="logout" onClick={handleLogout}>
          Logout
        </Menu.Item>
      ) : (
        <>
          <Menu.Item key="login">
            <NavLink to="/login">Login</NavLink>
          </Menu.Item>
          <Menu.Item key="signup">
            <NavLink to="/signup">Sign Up</NavLink>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

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
            <Button className="theme-button" onClick={toggleTheme} icon={<FontAwesomeIcon icon={darkMode ? faSun : faMoon} />} />
            <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
              <Button className="user-button" icon={<FontAwesomeIcon icon={faUser} />} />
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;