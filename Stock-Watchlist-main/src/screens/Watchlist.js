import React , { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import '../css/Watchlist.css';

function Watchlist() {
  const watchlist = useSelector(state => state.watchlist);
  const [prices, setPrices] = useState([]);
  const dispatch = useDispatch();
  const handleRemoveStock = (symbol) => {
    dispatch({ type: 'REMOVE_STOCK', symbol });
  };

  useEffect(() => {
    if (watchlist) {
      const promises = watchlist.map(stock => {
        return axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock['1. symbol']}&apikey=RN87HAWJLAXZWNJJ`)
      });
      Promise.all(promises)
        .then(responses => {
          const prices = responses.map(response => {
            return response.data['Global Quote']['05. price'];
          });
          setPrices(prices);
        })
        .catch(error => console.log(error));
    }
  }, [watchlist]);

  return (
    <div className="watchlist-container">
      {watchlist?<h4>Total: {watchlist.length} </h4>:''}
      <table className="watchlist-table" border="1">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {watchlist?.map((stock, index) => {
              return (
                <tr key={stock['1. symbol']}>
                  <td>{stock['2. name']}</td>
                  <td>{stock['1. symbol']}</td>
                  <td>{prices[index] ? prices[index] : 'Loading...'}</td>
                  <td>
                  <button className="remove-button" onClick={() => handleRemoveStock(stock['1. symbol'])}>x</button>
                  </td>
                </tr>
            );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Watchlist;
