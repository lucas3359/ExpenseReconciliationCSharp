import React from 'react';
import AuthToolbar from '../auth/AuthToolbar';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const homeLink = (
    <div className="flex-initial">
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={'h-8 w-8 my-1 cursor-pointer'}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Link>
    </div>
  );

  return (
    <header className="text-gray-700 bg-white bg-opacity-25 w-full flex h-14 py-2 px-2">
      {location.pathname === '/' ? (
        <div className="flex-initial"></div>
      ) : (
        homeLink
      )}
      <div className="flex-grow text-center leading-10 text-xl">
        Expenses Reconciliation
      </div>
      <AuthToolbar />
    </header>
  );
};

export default Header;
