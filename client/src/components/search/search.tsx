import React from "react";
import * as FontAwesome from "react-icons/fa";

interface searchProprs {
  search: string;
  searchFunction: React.Dispatch<React.SetStateAction<string>>;
}

const search: React.FC<searchProprs> = ({ search, searchFunction }) => {
  return (
    <div id="input-search-wrap">
      <div id="fake-input">
        <div id="search-icon">
          <FontAwesome.FaSearch />
          <input
            id="search-input-field"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => searchFunction(e.target.value)}
          />
          {search.length !== 0 && (
            <button
              className="icon-button"
              id="search-button-clear"
              onClick={() => searchFunction("")}
            >
              <FontAwesome.FaTimes />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default search;
