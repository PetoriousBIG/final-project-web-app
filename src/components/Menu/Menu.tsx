import React, {useEffect} from 'react';
import * as client from "./client";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { setMenuItems } from './reducer';

function Menu() {
    const dispatch = useDispatch();
    const { rid } = useParams()

    const MenuItem = ({ item, rid }) => (
      <div className="col-lg-6 menu-item">
        <img src={item.img} className="menu-img" alt={item.name} />
        <div className="menu-content">
          <Link to={`/restaurant/${rid}/menu/${item.id}`}>{item.name}</Link><span>{item.price}</span>
          <Link to={`/restaurant/${rid}/menu/${item.id}`} className="review-more"> &gt; Review More</Link>
        </div>
        <div className="menu-ingredients">
          {item.description}
        </div>
      </div>
    );

    const fetchMenuItems = async () => {
        try {
            const menuItems = await client.fetchMenuItemsByRestaurant(rid);
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
              {menuItems.map(item => (
                <MenuItem key={item.id} item={item} rid={rid} />
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