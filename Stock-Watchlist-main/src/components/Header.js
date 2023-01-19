import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../css/Header.css';

function Header() {
  const location = useLocation();
  const watchlist = useSelector(state => state.watchlist);

  return (
    <header className="header-container">
      <nav className="header-navbar">
      <Link className="header-navbar-item" to='/'>Home</Link>
      <Link className="header-navbar-item" to='/watchlist'>Watchlist <span className='badge c-red'>{watchlist.length}</span></Link>
      </nav>
      <h1 className="header-title">{location.pathname === '/' ? 'Home' : 'Watchlist'}</h1>
    </header>
  );
}

export default Header;
