import React, { useState } from 'react';
import SignIn from '../Account/SignIn/SignIn';
import { useSelector, useDispatch } from "react-redux";
import * as client from "../Account/client";
import { setCurrentUser } from '../Account/reducer';
function Header() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showSignIn, setShowSignIn] = useState(false);
  const dispatch = useDispatch();
  const handleShowSignIn = () => setShowSignIn(true);
  const handleCloseSignIn = () => setShowSignIn(false);

  const handlesSignOut = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
  }

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
              {currentUser && (
                <span className="fs-5 me-4 mt-1 text-white">Welcome, {currentUser.username}</span>
              )}
              { currentUser === null ?
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
              :
              <button
                className="btn-border-text d-none d-xl-block"
                style={{backgroundColor: "transparent"}}
                onClick={handlesSignOut}
              >
                Sign Out
              </button>
            }
            <a className="btn-border-text d-none d-xl-block" href="#profile">Profile</a>
          </div>
        </div>
      </div>
      <SignIn show={showSignIn} handleClose={handleCloseSignIn}/> :
    </header>
  );
}

export default Header;