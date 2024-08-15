import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import * as client from './client';

function OtherProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await client.getUserDetails(id);
        setUser(userData);
  
        const userRole = userData.role.toLowerCase();
  
        if (userRole === 'user') {
          try {
            const reviewsData = await client.getUserReviews(id);
            setReviews(reviewsData);
          } catch (error) {
            console.error('Error fetching reviews:', error);
          }
  
          try {
            const commentsData = await client.getUserComments(id);
            
            const commentsWithRecipes = await Promise.all(
              commentsData.map(async (comment) => {
                try {
                  const recipeDetails = await client.getRecipeDetails(comment.recipeId);
                  return {
                    ...comment,
                    recipeLabel: recipeDetails.label || recipeDetails.name || 'Unknown Recipe'
                  };
                } catch (error) {
                  console.error(`Error fetching recipe details for comment ${comment._id}:`, error);
                  return {
                    ...comment,
                    recipeLabel: 'Unknown Recipe'
                  };
                }
              })
            );
          
            setComments(commentsWithRecipes);
          } catch (error) {
            console.error('Error fetching comments:', error);
            setComments([]);
          }
        } else if (userRole === 'owner') {
          try {
            const restaurantsData = await client.getOwnerRestaurants(id);
            setRestaurants(restaurantsData);
          } catch (error) {
            console.error('Error fetching restaurants:', error);
          }
        } else if (userRole === 'chef') {
          try {
            const dishesData = await client.getChefDishes(id);
            setDishes(dishesData);
          } catch (error) {
            console.error('Error fetching dishes:', error);
          }
        } else {
          console.warn('Unknown user role:', userRole);
        }
      } catch (err) {
        setError('Failed to fetch user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleCommentClick = (recipeId) => {
    const fullRecipeId = `http://www.edamam.com/ontologies/edamam.owl#${recipeId}`;
    navigate(`/recipe/${encodeURIComponent(fullRecipeId)}`);  
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  const userRole = user.role.toLowerCase();

  return (
    <div>
      <section id="about" className="about section">
        <div className="container mt-5" data-aos="fade-up" data-aos-delay={100}>
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-4">
              <div className="profile-picture mb-2">
                <div 
                  className="bg-secondary rounded-circle text-white profile-picture-initial" 
                  style={{ 
                    width: '300px', 
                    height: '300px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    fontSize: 'calc(300px * 0.6)',
                    fontWeight: 'bold',
                    lineHeight: '1', 
                    textAlign: 'center' 
                  }}
                >
                  <span style={{ marginBottom: 'calc(300px * 0.07)' }}> 
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-8 content">
              <h2>{user.username}</h2>
              <p className="fst-italic py-3">{user.role}</p>
              <div className="row">
                <div className="col-lg-8">
                  <ul>
                    <li>
                      <i className="bi bi-chevron-right" />{' '}
                      <strong>Phone:</strong> <span>{user.phone}</span>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-8">
                  <ul>
                    <li>
                      <i className="bi bi-chevron-right" />{' '}
                      <strong>Email:</strong> <span>{user.email}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-8 content">
                <br />
                <h2>About</h2>
                <p className="py-3">{user.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {userRole === 'user' && (
        <>
 
        <section id="recent-comments" className="recent-comments section" style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '50px 0' }}>
            <div className="container section-title" data-aos="fade-up">
              <h2 style={{ color: '#d4af37' }}>{user.username.toUpperCase()}</h2>
              <p style={{ color: '#d4af37', fontSize: '2.5rem', marginBottom: '30px' }}>Recent Comments</p>
            </div>
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
              {comments.length > 0 ? (
                 <Swiper
                 spaceBetween={20}
                 slidesPerView={1}
                 autoplay={{ delay: 5000 }}
                 breakpoints={{
                   640: { slidesPerView: 1, spaceBetween: 10 },
                   768: { slidesPerView: 2, spaceBetween: 20 },
                   1200: { slidesPerView: 3, spaceBetween: 20 },
                 }}
                 pagination={{ clickable: true }}
                 navigation
                 modules={[Autoplay, Pagination, Navigation]}
                 className="swiper-container"
               >
              {comments.map((comment, index) => (
                <SwiperSlide key={index}>
                  <div className="testimonial-item" 
                      style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', cursor: 'pointer' }}
                      onClick={() => handleCommentClick(comment.recipeId)}>
                    <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '20px' }}>
                      <i className="bi bi-quote quote-icon-left" style={{ color: '#d4af37', fontSize: '2rem', marginRight: '10px' }} />
                      <span>{comment.comment}</span>
                      <i className="bi bi-quote quote-icon-right" style={{ color: '#d4af37', fontSize: '2rem', marginLeft: '10px' }} />
                    </p>
                    <h3 style={{ color: '#fff', marginBottom: '5px' }}>{comment.recipeLabel}</h3>
                    <h4 style={{ color: '#888' }}>{new Date(comment.createdAt).toLocaleDateString()}</h4>
                  </div>
                </SwiperSlide>
              ))}
                </Swiper>
              ) : (
                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#fff' }}>No comments available. The user hasn't made any comments yet.</p>
              )}
            </div>
          </section>

          <section id="recent-review" className="recent-review section">
            <div className="container section-title" data-aos="fade-up">
              <h2>{user.username}</h2>
              <p>Recent Reviews</p>
            </div>
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
              {reviews.length > 0 ? (
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  autoplay={{ delay: 5000 }}
                  breakpoints={{
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1200: { slidesPerView: 3, spaceBetween: 20 },
                  }}
                  pagination={{ clickable: true }}
                  navigation
                  modules={[Autoplay, Pagination, Navigation]}
                  className="swiper-container"
                >
                  {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                      <div className="testimonial-item">
                        <p>
                          <i className="bi bi-quote quote-icon-left" />
                          <span>{review.comment}</span>
                          <i className="bi bi-quote quote-icon-right" />
                        </p>
                        <img
                          src={review.restaurantImage}
                          className="testimonial-img"
                          alt={review.restaurantName}
                        />
                        <h3>{review.restaurantName}</h3>
                        <h4>{review.restaurantAddress}</h4>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </section>
        </>
      )}

      {userRole === 'owner' && (
        <section id="recent-review" className="recent-review section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Restaurants Owned by {user.username}</h2>
            <p>Restaurants You Own</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            {restaurants.length > 0 ? (
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
                breakpoints={{
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1200: { slidesPerView: 3, spaceBetween: 20 },
                }}
                pagination={{ clickable: true }}
                navigation
                modules={[Autoplay, Pagination, Navigation]}
                className="swiper-container"
              >
                {restaurants.map((restaurant, index) => (
                  <SwiperSlide key={index}>
                    <div className="testimonial-item">
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        <span>{restaurant.description}</span>
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                      <img
                        src={restaurant.image}
                        className="testimonial-img"
                        alt={restaurant.name}
                      />
                      <h3>{restaurant.name}</h3>
                      <h4>{restaurant.address}</h4>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No restaurants yet.</p>
            )}
          </div>
        </section>
      )}

      {userRole === 'chef' && (
        <section id="recent-review" className="recent-review section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Your Dishes</h2>
            <p>Dishes Created by {user.username}</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            {dishes.length > 0 ? (
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 10 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1200: { slidesPerView: 3, spaceBetween: 20 },
                }}
              >
                {dishes.map((dish, index) => (
                  <SwiperSlide key={index}>
                    <div className="testimonial-item">
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        <span>{dish.description}</span>
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                      <img src={dish.image} className="testimonial-img" alt={dish.name} />
                      <h3>{dish.name}</h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No dishes yet.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default OtherProfile;