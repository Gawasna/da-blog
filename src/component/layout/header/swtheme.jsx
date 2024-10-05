const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? '#ffffff' : '#343a40';
    document.body.style.color = darkMode ? '#000000' : '#ffffff';
  };