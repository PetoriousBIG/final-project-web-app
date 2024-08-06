import React, { useEffect } from 'react';
import * as client from "./client";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setRestaurants } from './reducer';
function Restaurants() {
  const dispatch = useDispatch()

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
  }, []);

  const { restaurants } = useSelector((state: any) => state.restaurantReducer);
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
            {restaurants.map((restaurant, index) => (
              <div className="col-xl-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay={200 * (index % 4)} key={restaurant.id}>
                <div className="restaurant-box">
                  <div className="restaurant-img">
                    <img src={`assets/img/restaurants/restaurant-${restaurant._id}.jpg`} className="img-fluid" alt={restaurant.name} />
                  </div>
                  <div className="meta">
                    <h3 className="restaurant-name">{restaurant.name}</h3>
                    <span className="restaurant-rating">{restaurant.rating}/5</span>
                  </div>
                  <p>{restaurant.description}</p>
                  <Link to={`/restaurant/${restaurant._id}`} className="more-info stretched-link">
                    <span>More Info</span><i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>{/* /Restaurant Page Section */}
    </div>
  );
}

export default Restaurants;