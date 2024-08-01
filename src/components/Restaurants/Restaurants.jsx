import React from 'react';
import { Link } from 'react-router-dom';

function Restaurants() {
  const restaurants = [
    {
      name: "Vegan Delight",
      rating: "4.5/5",
      description: "A delightful spot offering a wide range of delicious vegan dishes. Perfect for all your plant-based cravings!",
      id: 1
    },
    {
      name: "Green Garden",
      rating: "4.2/5",
      description: "Known for its fresh and organic ingredients, Green Garden is a must-visit for any vegan food enthusiast.",
      id: 2
    },
    {
      name: "Plant Power",
      rating: "4.8/5",
      description: "Plant Power offers an extensive menu of innovative vegan dishes and a cozy atmosphere for a perfect dining experience.",
      id: 3
    },
    {
      name: "Herbivore Haven",
      rating: "4.6/5",
      description: "With a diverse menu and a welcoming ambiance, Herbivore Haven is a top choice for vegan dining in town.",
      id: 4
    },
    {
      name: "Roots & Shoots",
      rating: "4.7/5",
      description: "Roots & Shoots is celebrated for its creative vegan dishes and sustainable practices.",
      id: 5
    },
    {
      name: "The Green Plate",
      rating: "4.4/5",
      description: "The Green Plate offers a farm-to-table experience with a variety of delicious vegan options.",
      id: 6
    },
    {
      name: "Vegan Oasis",
      rating: "4.3/5",
      description: "Vegan Oasis provides a relaxing environment with a range of vegan comfort foods.",
      id: 7
    },
    {
      name: "Leafy Greens",
      rating: "4.1/5",
      description: "Leafy Greens is known for its fresh salads and hearty vegan dishes, perfect for a light yet satisfying meal.",
      id: 8
    }
  ];

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
                    <img src={`assets/img/restaurants/restaurant-${restaurant.id}.jpg`} className="img-fluid" alt={restaurant.name} />
                  </div>
                  <div className="meta">
                    <h3 className="restaurant-name">{restaurant.name}</h3>
                    <span className="restaurant-rating">{restaurant.rating}</span>
                  </div>
                  <p>{restaurant.description}</p>
                  <Link to={`/restaurant/${restaurant.id}`} className="more-info stretched-link">
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