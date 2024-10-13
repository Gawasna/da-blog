import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import data from "./data.json";

// Dữ liệu mẫu  
  const SearchForm = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setQuery(value);
  
      if (value.length > 0) {
        // Tìm kiếm trong data nếu nhập từ 1 ký tự trở lên
        const filteredResults = data.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filteredResults);
        setShowResults(filteredResults.length > 0);
      } else {
        setResults([]);
        setShowResults(false);
      }
    };
  
    const clearSearch = () => {
      setQuery("");
      setResults([]);
      setShowResults(false);
    };  

  return (
    <form className="search-form">
      <input
        type="text"
        name="search"
        id="searchfield"
        placeholder="Search something..."
        autoComplete="off"
        value={query}
        onChange={handleInputChange}
      />
      <span className="search-icon">
        <FontAwesomeIcon icon={faSearch} />
      </span>
      {query && (
        <span className="clear-icon" onClick={clearSearch}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      )}
      {showResults && (
        <span id="search-results">
          <ul id="results-list">
            {results.map((result) => (
              <li key={result.post_id}>
                <img src={result.thumbnail} alt={result.title} className="thumbnail" />
                <span>{result.title}</span>
              </li>
            ))}
          </ul>
        </span>
      )}
    </form>
  );
};

export default SearchForm;
