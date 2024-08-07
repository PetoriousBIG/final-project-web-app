import React, { useState } from 'react';
import SignIn from '../SignIn/SignIn';

function Header() {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleShowSignIn = () => setShowSignIn(true);
  const handleCloseSignIn = () => setShowSignIn(false);

  return (
    <header id="header" className="header fixed-top">
      <div className="branding d-flex align-items-center"> 
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center me-auto me-xl-0">
            <h1 className="sitename">VeganLover</h1>
          </a>
          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="/" className="active">Home</a></li>
              <li><a href="/restaurants">Restaurants</a></li>
              <li><a href="/recipes">Recipes</a></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list" />
          </nav>
          <div className="button-container d-flex">
            <a
              className="btn-border-text d-none d-xl-block"
              href="#sign-in"
              onClick={(e) => {
                e.preventDefault();
                handleShowSignIn();
              }}
            >
              Sign In
            </a>
            <a className="btn-border-text d-none d-xl-block" href="/profile">Profile</a>
          </div>
        </div>
      </div>
      <SignIn show={showSignIn} handleClose={handleCloseSignIn} />
    </header>
  );
}

export default Header;