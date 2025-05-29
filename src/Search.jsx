function Search () {
    return (
        <>
        <div className="searchContainer">
            <input type="text" className="searchInput" placeholder="Hi, {name}! Where are we going today?" />
            <br />
            <button className="searchButton">Search</button>
        </div>
        </>
    )
}

export default Search