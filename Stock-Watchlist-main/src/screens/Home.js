
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import '../css/Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if(searchTerm!==''){
      const results = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey={API_KEY}`);
      setSearchResults(results.data.bestMatches);
    }
  };

  const handleAddStock = (stock) => {
    dispatch({ type: 'ADD_STOCK', stock });
};

return (
  <div className="home-container">
  <input
    className="search-input"
    type="text"
    placeholder="Search for a company..."
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    onKeyUp={handleSearch}
  />
  {searchResults?<h4>Search Results: {searchResults.length} </h4>:''}
  <table className="search-results-table" border="1">
    <thead>
      <tr>
        <th>Company Name</th>
        <th>Symbol</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {searchResults.map(result => (
        <tr key={result['1. symbol']}>
          <td>{result['2. name']}</td>
          <td>{result['1. symbol']}</td>
          <td>
            <button className="add-button" onClick={() => handleAddStock(result)}>+</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
);
}

export default Home;