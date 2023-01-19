import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Header from './components/Header';
import Home from './screens/Home';
import Watchlist from './screens/Watchlist';

const initialState = {
  watchlist: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_STOCK':
      return {
        ...state,
        watchlist: [...state.watchlist, action.stock]
      };
    case 'REMOVE_STOCK':
      return {
        ...state,
        watchlist: state.watchlist.filter(stock => stock['1. symbol'] !== action.symbol)
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home/>}  />
          <Route path='/watchlist' element={<Watchlist/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
