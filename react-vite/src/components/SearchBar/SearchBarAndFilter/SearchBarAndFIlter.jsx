import { useState } from "react";
import { Icon } from '@iconify/react';
import "./SearchBarAndFilter.css"


function SearchBarAndFilter({ showSearch }) {
    const [searchInput, setSearchInput] = useState("")

    const toggleSearchBarDisplay = showSearch ? "block" : "none"

    return (
        <div className="search-bar-wrapper" style={{ display: toggleSearchBarDisplay }}>
            <input
                type="text"
                placeholder="Type in a product or collection name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-bar-div"
            />
            <button className="search-button">
                <Icon icon="ri:search-line" width="25" height="25" color="white" />
            </button>
        </div>
    )
}

export default SearchBarAndFilter;
