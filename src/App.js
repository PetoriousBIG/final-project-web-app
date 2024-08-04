import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";
import Session from './components/Account/Session';
import Home from './components/Home/Home';
import Recipes from './components/Recipes/Recipes';
import Restaurants from './components/Restaurants/Resaurants';
import RestaurantDetail from './components/Restaurants/RestaurantDetail'; 
import Header from './components/Header/Header';  
import AOS from 'aos';
import Menu from './components/Menu/Menu';
import MenuDetail from './components/Menu/MenuDetail';
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
    <Provider store={store}>
      <Session>
        <div>
          <Header /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} /> 
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<MenuDetail />} /> 
          </Routes>
        </div>
      </Session>
    </Provider>
  );
}

export default App;