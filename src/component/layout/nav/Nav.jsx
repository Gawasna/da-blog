import React, { useState } from 'react';
import './Navbar.css'; // CSS file for styling

const Navbar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-item">
        <i className="icon">📰</i>
        <span>What's new?</span>
      </div>

      <div className="navbar-item category">
        <div className="category-title" onClick={toggleCategory}>
          <i className="icon">📂</i>
          <span>Danh mục (Category)</span>
          <i className="toggle-icon">{isCategoryOpen ? '▲' : '▼'}</i>
        </div>
        {isCategoryOpen && (
          <div className="sub-categories">
            <div className="sub-category-item">Danh mục con 1</div>
            <div className="sub-category-item">Danh mục con 2</div>
            <div className="sub-category-item">Danh mục con 3</div>
          </div>
        )}
      </div>

      <div className="navbar-item">
        <i className="icon">☎️</i>
        <span>Liên hệ</span>
      </div>

      <div className="navbar-item">
        <i className="icon">👤</i>
        <span>Về tôi</span>
      </div>
    </div>
  );
};

export default Navbar;
