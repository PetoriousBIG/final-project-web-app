import React from 'react';

function Menu() {
  return (
    <div>
      {/* Menu Section */}
      <section id="menu" className="menu section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <br />
          <br />
          <br />
          <h2>Restaurant Name</h2>
          <p>Check Our Tasty Menu</p>
        </div>
        {/* End Section Title */}
        <div className="container">
          <div className="row isotope-container" data-aos="fade-up" data-aos-delay={200}>
            <div className="col-lg-6 menu-item">
              <img src="assets/img/menu/lobster-bisque.jpg" className="menu-img" alt="Lobster Bisque" />
              <div className="menu-content">
                <a href="/menu/lobster-bisque">Lobster Bisque</a><span>$5.95</span>
                <a href="/menu/lobster-bisque" className="review-more"> &gt; Review More</a>
              </div>
              <div className="menu-ingredients">
                Lorem, deren, trataro, filede, nerada
              </div>
            </div>
            {/* Menu Item */}
            <div className="col-lg-6 menu-item">
              <img src="assets/img/menu/bread-barrel.jpg" className="menu-img" alt="Bread Barrel" />
              <div className="menu-content">
                <a href="/menu/bread-barrel">Bread Barrel</a><span>$6.95</span>
                <a href="/menu/bread-barrel" className="review-more"> &gt; Review More</a>
              </div>
              <div className="menu-ingredients">
                Lorem, deren, trataro, filede, nerada
              </div>
            </div>
            {/* Menu Item */}
            <div className="col-lg-6 menu-item">
              <img src="assets/img/menu/cake.jpg" className="menu-img" alt="Crab Cake" />
              <div className="menu-content">
                <a href="/menu/crab-cake">Crab Cake</a><span>$7.95</span>
                <a href="/menu/crab-cake" className="review-more"> &gt; Review More</a>
              </div>
              <div className="menu-ingredients">
                A delicate crab cake served on a toasted roll with lettuce and tartar sauce
              </div>
            </div>
            {/* Menu Item */}
            <div className="col-lg-6 menu-item">
              <img src="assets/img/menu/caesar.jpg" className="menu-img" alt="Caesar Selections" />
              <div className="menu-content">
                <a href="/menu/caesar-selections">Caesar Selections</a><span>$8.95</span>
                <a href="/menu/caesar-selections" className="review-more"> &gt; Review More</a>
              </div>
              <div className="menu-ingredients">
                Lorem, deren, trataro, filede, nerada
              </div>
            </div>
            {/* Menu Item */}
            <div className="col-lg-6 menu-item">
              <img src="assets/img/menu/tuscan-grilled.jpg" className="menu-img" alt="Tuscan Grilled" />
              <div className="menu-content">
                <a href="/menu/tuscan-grilled">Tuscan Grilled</a><span>$9.95</span>
                <a href="/menu/tuscan-grilled" className="review-more"> &gt; Review More</a>
              </div>
              <div className="menu-ingredients">
                Grilled chicken with provolone, artichoke hearts, and roasted red pesto
              </div>
            </div>
            {/* Menu Item */}
            <div className="col-lg-6 menu-item">
              <img src="assets/img/menu/mozzarella.jpg" className="menu-img" alt="Mozzarella Stick" />
              <div className="menu-content">
                <a href="/menu/mozzarella-stick">Mozzarella Stick</a><span>$4.95</span>
                <a href="/menu/mozzarella-stick" className="review-more"> & gt; Review More</a>
              </div>
              <div className="menu-ingredients">
                Lorem, deren, trataro, filede, nerada
              </div>
            </div>
            {/* Menu Item */}
            <div className="col-lg-6 menu-item">
              <img src="assets/img/menu/greek-salad.jpg" className="menu-img" alt="Greek Salad" />
              <div className="menu-content">
                <a href="/menu/greek-salad">Greek Salad</a><span>$9.95</span>
                <a href="/menu/greek-salad" className="review-more"> & gt; Review More</a>
              </div>
              <div className="menu-ingredients">
                Fresh spinach, crisp romaine, tomatoes, and Greek olives
              </div>
            </div>
            {/* Menu Item */}
            <div className="col-lg-6 menu-item">
              <img src="assets/img/menu/spinach-salad.jpg" className="menu-img" alt="Spinach Salad" />
              <div className="menu-content">
                <a href="/menu/spinach-salad">Spinach Salad</a><span>$9.95</span>
                <a href="/menu/spinach-salad" className="review-more"> & gt; Review More</a>
              </div>
              <div className="menu-ingredients">
                Fresh spinach with mushrooms, hard boiled egg, and warm bacon vinaigrette
              </div>
            </div>
            {/* Menu Item */}
            <div className="col-lg-6 menu-item">
              <img src="assets/img/menu/lobster-roll.jpg" className="menu-img" alt="Lobster Roll" />
              <div className="menu-content">
                <a href="/menu/lobster-roll">Lobster Roll</a><span>$12.95</span>
                <a href="/menu/lobster-roll" className="review-more"> & gt; Review More</a>
              </div>
              <div className="menu-ingredients">
                Plump lobster meat, mayo and crisp lettuce on a toasted bulky roll
              </div>
            </div>
            {/* Menu Container */}
          </div>
        </div>
      </section>
      {/* /Menu Section */}
    </div>
  );
}

export default Menu;