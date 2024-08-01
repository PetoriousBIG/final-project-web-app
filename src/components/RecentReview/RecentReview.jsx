import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function RecentReview() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div>
      <section id="recent-review" className="recent-review section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>VeganLover</h2>
          <p>Recent Reviews</p>
        </div>{/* End Section Title */}
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            breakpoints={{
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
                  <span>Absolutely loved the food and ambiance. Highly recommend the vegan burger!</span>
                  <i className="bi bi-quote quote-icon-right" />
                </p>
                <img src="assets/img/testimonials/testimonials-1.jpg" className="testimonial-img" alt="Alice Smith" />
                <h3>Alice Smith</h3>
                <h4>Vegan Haven</h4>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-item">
                <p>
                  <i className="bi bi-quote quote-icon-left" />
                  <span>Great place for a healthy meal, but the service was a bit slow.</span>
                  <i className="bi bi-quote quote-icon-right" />
                </p>
                <img src="assets/img/testimonials/testimonials-2.jpg" className="testimonial-img" alt="Bob Johnson" />
                <h3>Bob Johnson</h3>
                <h4>Green Garden Bistro</h4>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-item">
                <p>
                  <i className="bi bi-quote quote-icon-left" />
                  <span>The vegan pizza was fantastic, but the place was a bit crowded.</span>
                  <i className="bi bi-quote quote-icon-right" />
                </p>
                <img src="assets/img/testimonials/testimonials-3.jpg" className="testimonial-img" alt="Carol Lee" />
                <h3>Carol Lee</h3>
                <h4>The Vegan Table</h4>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-item">
                <p>
                  <i className="bi bi-quote quote-icon-left" />
                  <span>Best vegan dishes I've ever had. The desserts are to die for!</span>
                  <i className="bi bi-quote quote-icon-right" />
                </p>
                <img src="assets/img/testimonials/testimonials-4.jpg" className="testimonial-img" alt="David Brown" />
                <h3>David Brown</h3>
                <h4>Purely Plant-Based</h4>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-item">
                <p>
                  <i className="bi bi-quote quote-icon-left" />
                  <span>Really enjoyed the variety of options. The staff was friendly and helpful.</span>
                  <i className="bi bi-quote quote-icon-right" />
                </p>
                <img src="assets/img/testimonials/testimonials-5.jpg" className="testimonial-img" alt="Frank Miller" />
                <h3>Frank Miller</h3>
                <h4>Herbivore's Choice</h4>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-item">
                <p>
                  <i className="bi bi-quote quote-icon-left" />
                  <span>Amazing food and lovely atmosphere. Will definitely come back!</span>
                  <i className="bi bi-quote quote-icon-right" />
                </p>
                <img src="assets/img/testimonials/testimonials-6.jpg" className="testimonial-img" alt="Ivy Thompson" />
                <h3>Ivy Thompson</h3>
                <h4>Blossom Bistro</h4>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>{/* /Recent Review Section */}
    </div>
  );
}

export default RecentReview;