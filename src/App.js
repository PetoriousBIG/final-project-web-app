import AOS from 'aos';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Recipes from './components/Recipes/Recipes';
import Restaurants from './components/Restaurants/Restaurants';
import RestaurantDetail from './components/Restaurants/RestaurantDetail'; 
import Header from './components/Header/Header';  
import Menu from './components/Menu/Menu';
import MenuDetail from './components/Menu/MenuDetail';
import Footer from './components/Footer/Footer';  

import SelfProfile from './components/Profile/SelfProfile';
import OtherProfile from './components/Profile/OtherProfile';

import ProfileEditUser from './components/Profile/ProfileEditUser';
import ProfileEditOwner from './components/Profile/ProfileEditOwner';
import ProfileEditChef from './components/Profile/ProfileEditChef';

import Teams from './components/Teams/Teams';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurant/:rid" element={<RestaurantDetail />} /> 
        <Route path="/restaurant/:rid/menu" element={<Menu />} />
        <Route path="/restaurant/:rid/menu/:mid" element={<MenuDetail />} /> 

        {/* Route for the owner's profile */}
        <Route path="/profile" element={<SelfProfile />} />
        
        {/* Route for viewing another user's profile */}
        <Route path="/profile/:id" element={<OtherProfile />} />

        <Route path="/profile-edit-chef" element={<ProfileEditChef />} />
        <Route path="/profile-edit-owner" element={<ProfileEditOwner />} />
        <Route path="/profile-edit-user" element={<ProfileEditUser />} />
        
        <Route path="/teams" element={<Teams />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;