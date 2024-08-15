import React, { useState, useEffect } from 'react';
import * as client from "./client";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as accountClient from "../Account/client";
import { setUsers } from '../Account/reducer';
import { setRestaurants } from './reducer';
import Add from "./Add";
function Restaurants() {
  const dispatch = useDispatch()
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchChefs = async () => {
      try {
          const chefs = await accountClient.fetchUsersForRole('Chef');
          dispatch(setUsers(chefs));
      } catch (err: any) {
          console.log(err);
      }
  }

  const fetchRestaurants = async () => {
      try {
          const restaurants = await client.fetchAllRestaurants();
          dispatch(setRestaurants(restaurants));
      } catch ( err: any ) {
          console.log(err)
      }
  }
  useEffect(() => {
      fetchRestaurants();
      fetchChefs();
  }, []);

  const { restaurants } = useSelector((state: any) => state.restaurantReducer);
  const { users, currentUser } = useSelector((state: any) => state.accountReducer)
  return (
    <div>
      {/* Restaurant Page Section */}
      <br />
      <br />
      <br />
      <section id="restaurant-page" className="restaurant-page section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Restaurants</h2>
          <p>Check out all best vegan restaurants in Boston!</p>
        </div>{/* End Section Title */}
        <div className="container">
          <div className="row gy-5">
            { currentUser && currentUser.role === 'Owner' &&
              <div className="d-flex justify-content-between align-items-center mb-3 float-end">    
                <button 
                    data-aos="fade-up"
                    type="button"
                    className="btn"
                    style={{backgroundColor: "#daa520"}}
                    onClick={() => setShowAddForm(true)}>
                    Add a Restaurant
                </button>
              </div>
            }
            {restaurants.map((restaurant, index) => (
              <div className="col-xl-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay={200 * (index % 4)} key={restaurant.id}>
                <div className="restaurant-box">
                  <div className="restaurant-img">
                    <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_restaurant.jpg`} className="img-fluid" alt={restaurant.name} />
                  </div>
                  <div className="meta">
                    <h3 className="restaurant-name">{restaurant.name}</h3>
                  </div>
                  <p>{restaurant.description}</p>
                  <Link to={`/restaurants/${restaurant._id}`} className="more-info stretched-link">
                    <span>More Info</span><i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>{/* /Restaurant Page Section */}
      {currentUser &&
        <Add show={showAddForm}
            handleClose={() => {
              setShowAddForm(false)
            }}
            editing={false}
            refresh={fetchRestaurants}
            users={users}
            owner_id={currentUser._id}
            owner={currentUser.firstName.concat(" ", currentUser.lastName)}/>
      }
    </div>
  );
}

export default Restaurants;