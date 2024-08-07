import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Recipes from './components/Recipes/Recipes';
import Restaurants from './components/Restaurants/Restaurants';
import RestaurantDetail from './components/Restaurants/RestaurantDetail'; 
import Header from './components/Header/Header';  
import AOS from 'aos';
import Menu from './components/Menu/Menu';
import MenuDetail from './components/Menu/MenuDetail';
import ProfileWrapper from './components/Profile/ProfileWrapper'; 
import ProfileEditUser from './components/Profile/ProfileEditUser';
import ProfileEditOwner from './components/Profile/ProfileEditOwner';
import ProfileEditChef from './components/Profile/ProfileEditChef';
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
        <Route path="/profile/:id" element={<ProfileWrapper />} /> 
        <Route path="/profile/" element={< ProfileEditChef/>} />
        {/* Temporary routes for testing */}
        <Route path="/profile/1" element={<ProfileWrapper />} />
        <Route path="/profile/2" element={<ProfileWrapper />} />
      </Routes>
    </div>
  );
}

export default App;