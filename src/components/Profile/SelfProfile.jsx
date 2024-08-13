import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function SelfProfile() {
  const { currentUser } = useSelector((state) => state.accountReducer)
  const navigate = useNavigate();
  
  const goToEditPage = () => {
      navigate(`/profile-edit-${currentUser.role}`);
  }

  return (
    <div>
      <section id="about" className="about section">
        <slot type="section-title" />
        <br />
        <br />
        <br />
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-4">
              <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_user.jpg`} className="img-fluid" alt="Profile" />
            </div>
            <div className="col-lg-8 content">
              <h2>{currentUser.firstName} {currentUser.lastName}&nbsp;</h2>
              <p className="fst-italic py-3">{currentUser.role}</p>
              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    <li><i className="bi bi-chevron-right" /> <strong>Phone:</strong> <span>{currentUser.phone}</span></li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul>
                    <li><i className="bi bi-chevron-right" /> <strong>Email:</strong> <span>{currentUser.email}</span></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-8 content">
                <br />
                <h2>About&nbsp;</h2>
                <p className="py-3">
                  {currentUser.bio}
                </p>
                <br />
                <br />
                <br />
                <button type="submit" onClick={goToEditPage} className="btn btn-primary">Edit profile</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditional Rendering Based on Role */}
      {currentUser.role === 'User' && (
        <section id="recent-review" className="recent-review section">
          <div className="container section-title" data-aos="fade-up">
            <h2>VeganLover</h2>
            <p>Recent Reviews</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 5000 }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                  },  
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              pagination={{ clickable: true }}
              navigation
              modules={[Autoplay, Pagination, Navigation]}
              className="swiper-container"
            >
              <SwiperSlide>
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>Absolutely loved the food and ambiance. Highly recommend the vegan burger!(comment from this user)</span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                  {/* <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_restaurant.jpg`} className="testimonial-img" alt="Vegan Delight" /> */}
                  <h3>Vegan Delight</h3>
                  <h4>123 Beacon Street, Boston, MA 02108</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>Great place for a healthy meal, but the service was a bit slow.</span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                  <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_restaurant.jpg`} className="testimonial-img" alt="Green Garden Bistro" />
                  <h3>Green Garden Bistro</h3>
                  <h4>456 Commonwealth Avenue, Boston, MA 02215</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>The vegan pizza was fantastic, but the place was a bit crowded.</span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                  {/* <img src={`${process.env.PUBLIC_URL}assets/img/generic/generic_restaurant.jpg`} className="testimonial-img" alt="The Vegan Table" /> */}
                  <h3>The Vegan Table</h3>
                  <h4>789 Tremont Street, Boston, MA 02118</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>Best vegan dishes I've ever had. The desserts are to die for!</span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                  {/* <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_restaurant.jpg`} className="testimonial-img" alt="Purely Plant-Based" /> */}
                  <h3>Purely Plant-Based</h3>
                  <h4>101 Newbury Street, Boston, MA 02148</h4>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
      )}

      {currentUser.role === 'Owner' && (
        <section id=".recent-review" className=".recent-review section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Restaurants Owned by {currentUser.firstName} {currentUser.lastName}</h2>
            <p>Restaurants You Own</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 5000 }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                  },  
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              pagination={{ clickable: true }}
              navigation
              modules={[Autoplay, Pagination, Navigation]}
              className="swiper-container"
            >
              <SwiperSlide>
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>Vegan Delight is a cozy place offering a wide range of vegan delights.</span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                  {/* <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_restaurant.jpg`} className="testimonial-img" alt="Vegan Delight" /> */}
                  <h3>Vegan Delight</h3>
                  <h4>123 Beacon Street, Boston, MA 02108</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>Green Garden Bistro specializes in fresh and organic vegan cuisine.</span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                  {/* <img src={`${process.env.PUBLIC_URL}/assets/generic/generic_restaurant.jpg`} className="testimonial-img" alt="Green Garden Bistro" /> */}
                  <h3>Green Garden Bistro</h3>
                  <h4>456 Commonwealth Avenue, Boston, MA 02215</h4>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
      )}

      {currentUser.role === 'Chef' && (
        <section id=".recent-review" className=".recent-review section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Your Dishes</h2>
            <p>Dishes Created by You</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{ clickable: true }}
            breakpoints={{
                640: {
                slidesPerView: 1,
                spaceBetween: 10,
                },
                768: {
                slidesPerView: 2,
                spaceBetween: 20,
                },
                1200: {
                slidesPerView: 3, 
                spaceBetween: 20, 
                },
            }}
            >
              <SwiperSlide>
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>The Vegan Burger is a customer favorite with a delicious plant-based patty.</span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                  {/* <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_food.jpg`} className="testimonial-img" alt="Vegan Burger" /> */}
                  <h3>Vegan Burger</h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>The Vegan Pizza is a perfect blend of fresh veggies and vegan cheese.</span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                  {/* <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_food.jpg`} className="testimonial-img" alt="Vegan Pizza" /> */}
                  <h3>Vegan Pizza</h3>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
      )}
    </div>
  );
}

export default SelfProfile;