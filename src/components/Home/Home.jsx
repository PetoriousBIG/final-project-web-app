import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from "react-redux";
import RecentReview from '../RecentReview/RecentReview'; 

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div>
      <section id="home" className="cp-dark-background home section dark-background">
        <img src="assets/img/hero-bg.jpg" alt="Hero Background" data-aos="fade-in" />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 d-flex flex-column align-items-center align-items-lg-start">
              <h2 data-aos="fade-up" data-aos-delay={100}>Welcome to <span>VeganLover</span></h2>
              <p data-aos="fade-up" data-aos-delay={200}>&nbsp;Your Ultimate Vegan Restaurants and Recipes Hub in Boston!</p>
              <div className="content" data-aos="fade-up" data-aos-delay={300}>
                <p className="fst-italic">
                  At VeganLover, we are passionate about bringing together the vibrant vegan community by providing a comprehensive platform dedicated to vegan restaurants and delicious plant-based recipes. Our mission is to make it easy for you to discover, enjoy, and share the best vegan dining experiences and culinary creations.
                </p>
                <ul>
                  <li><i className="bi bi-check2-all" /> <span>Explore Vegan Restaurants</span></li>
                  <li><i className="bi bi-check2-all" /> <span>Rate, Review and Recommend Restaurants you like</span></li>
                  <li><i className="bi bi-check2-all" /> <span>Search for Popular Vegan Recipes</span></li>
                </ul>
                <p className="fst-italic">
                  Become part of a thriving community of vegan food lovers. Connect with like-minded individuals, share your culinary adventures, and contribute to our growing collection of restaurant reviews and recipes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    <RecentReview />
    </div>
  );
}

export default Home;