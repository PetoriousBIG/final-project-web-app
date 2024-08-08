import React, {useEffect} from 'react';
import * as client from "./client";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setMenuItems } from './reducer';

function Menu() {
    const dispatch = useDispatch();
    const { rid } = useParams()

    const fetchMenuItems = async () => {
        try {
            const menuItems = await client.fetchMenuItemByRestaurant(rid);
            dispatch(setMenuItems(menuItems));
        } catch (err: any) {
            console.log(err)
        }
    }
    
    useEffect(() => {
      fetchMenuItems();
    }, []);

    const { menuItems } = useSelector((state: any) => state.menuItemReducer);
    const restaurant = useSelector((state: any) => state.restaurantReducer.restaurants.find((restaurant: any) => restaurant._id === rid));
    return (
      <div>
        {/* Menu Section */}
        <section id="menu" className="menu section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <br />
            <br />
            <br />
            <h2>{restaurant.name}</h2>
            <p>Check Our Tasty Menu</p>
          </div>
          {/* End Section Title */}
          <div className="container">
            <div className="row isotope-container" data-aos="fade-up" data-aos-delay={200}>
              {menuItems.map((menuItem) => (
                <div className="col-lg-6 menu-item">
                  <img src="assets/img/menu/lobster-bisque.jpg" className="menu-img" alt={menuItem.name} />
                  <div className="menu-content">
                    <a href={`/menu/${rid}/${menuItem._id}`}>{menuItem.name}</a><span>{menuItem.price}</span>
                    <a href="/menu/lobster-bisque" className="review-more"> Review More</a>
                  </div>
                  <div className="menu-ingredients">
                    {menuItem.description}
                  </div>
                </div>
              ))}
              {/* Menu Container */}
            </div>
          </div>
        </section>
        {/* /Menu Section */}
      </div>
    );
}

export default Menu;