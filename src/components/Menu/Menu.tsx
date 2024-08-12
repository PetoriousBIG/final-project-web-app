import React, {useState, useEffect} from 'react';
import * as client from "./client";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { setMenuItems } from './reducer';
import Add from "./Add";

function Menu() {
    const [key, setKey] = useState(1)
    const dispatch = useDispatch();
    const { rid } = useParams()
    const [showAddForm, setShowAddForm] = useState(false);

    const MenuItem = ({ item, rid }) => (
      <div className="col-lg-6 menu-item">
        <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_food.jpg`} className="menu-img" alt={item.name} />
        <div className="menu-content">
          <Link to={`/restaurants/${rid}/menu/${item._id}`}>{item.name}</Link><span>{item.price}</span>
          <Link to={`/restaurants/${rid}/menu/${item._id}`} className="review-more"> &gt; Review More</Link>
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

    const { currentUser } = useSelector((state: any) => state.accountReducer)
    const { menuItems } = useSelector((state: any) => state.menuItemReducer);
    const restaurant = useSelector((state: any) => state.restaurantReducer.restaurants.find((restaurant: any) => restaurant._id === rid));
    const cids = [...restaurant.chef_ids] 
    const userIsChefAtRestaurant = currentUser && cids && cids.indexOf(currentUser._id) >= 0

    return (
      <div>
        {/* Menu Section */}
        <section id="menu" className="menu section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <br />
            <br />
            <br />
            <h2>{ restaurant && restaurant.name}</h2>
            <p>Check Our Tasty Menu</p>
          </div>
          {/* End Section Title */}
          <div className="container">
            <div className="row isotope-container" data-aos="fade-up" data-aos-delay={200}>
            <div className="d-flex justify-content-between align-items-center mb-3 float-end">
                {userIsChefAtRestaurant &&
                  <button 
                    data-aos="fade-up"
                    type="button"
                    className="btn"
                    style={{backgroundColor: "#daa520"}}
                    onClick={() => setShowAddForm(true)}>
                    Add a Menu Item
                  </button>}
              </div>
              {menuItems.map(item => (
                <MenuItem key={item.id} item={item} rid={rid} />
              ))}
              {/* Menu Container */}
            </div>
          </div>
        </section>
        {/* /Menu Section */}

        {currentUser &&
        <Add show={showAddForm}
             handleClose={() => {
               setShowAddForm(false)
             }}
             editing={false}
             refresh={fetchMenuItems}
             chef_id={currentUser && currentUser._id}
             chef={currentUser && currentUser.firstName.concat(" ", currentUser.lastName)}
             restaurant_id={rid}/>
      }

      </div>
    );
}

export default Menu;