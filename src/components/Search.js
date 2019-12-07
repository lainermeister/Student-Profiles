import React, { useState, useEffect } from 'react'

const Search = ({ onChange }) => {
    const [nameSearch, setNameSearch] = useState("");
    const [tagSearch, setTagSearch] = useState("");

    useEffect(() => onChange(nameSearch, tagSearch), [nameSearch, tagSearch])
    return (<>
        <input className="search" id="name-input" type="text"
            placeholder="Search by name"
            onChange={(e) => setNameSearch(e.target.value)} value={nameSearch} />
        <input className="search" id="tag-input" type="text"
            placeholder="Search by tags"
            onChange={(e) => setTagSearch(e.target.value)} value={tagSearch} />
    </>)
}
export default Search;