import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { liveSearching } from "../../../pages/Posts/api";
import debounce from "./debounce";
import axios from "axios";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const fetchSearchResults = async (searchQuery) => {
    try {
      const data = await liveSearching(searchQuery);
      setResults(data);
      setShowResults(data.length > 0);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const debouncedFetchSearchResults = useCallback(debounce(fetchSearchResults, 300), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      debouncedFetchSearchResults(value);
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
                <img src={result.image_path} alt={result.title} className="thumbnail" />
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