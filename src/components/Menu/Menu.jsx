import React from 'react';
import { Link, useParams } from 'react-router-dom';

const menuItems = [
  {
    mid: 'lobster-bisque',
    name: 'Lobster Bisque',
    price: '$5.95',
    img: 'assets/img/menu/lobster-bisque.jpg',
    description: 'Lorem, deren, trataro, filede, nerada',
  },
  {
    mid: 'bread-barrel',
    name: 'Bread Barrel',
    price: '$6.95',
    img: 'assets/img/menu/bread-barrel.jpg',
    description: 'Lorem, deren, trataro, filede, nerada',
  },
  {
    mid: 'crab-cake',
    name: 'Crab Cake',
    price: '$7.95',
    img: 'assets/img/menu/cake.jpg',
    description: 'A delicate crab cake served on a toasted roll with lettuce and tartar sauce',
  },
  {
    mid: 'caesar-selections',
    name: 'Caesar Selections',
    price: '$8.95',
    img: 'assets/img/menu/caesar.jpg',
    description: 'Lorem, deren, trataro, filede, nerada',
  },
  {
    mid: 'tuscan-grilled',
    name: 'Tuscan Grilled',
    price: '$9.95',
    img: 'assets/img/menu/tuscan-grilled.jpg',
    description: 'Grilled chicken with provolone, artichoke hearts, and roasted red pesto',
  },
  {
    mid: 'mozzarella-stick',
    name: 'Mozzarella Stick',
    price: '$4.95',
    img: 'assets/img/menu/mozzarella.jpg',
    description: 'Lorem, deren, trataro, filede, nerada',
  },
  {
    mid: 'greek-salad',
    name: 'Greek Salad',
    price: '$9.95',
    img: 'assets/img/menu/greek-salad.jpg',
    description: 'Fresh spinach, crisp romaine, tomatoes, and Greek olives',
  },
  {
    mid: 'spinach-salad',
    name: 'Spinach Salad',
    price: '$9.95',
    img: 'assets/img/menu/spinach-salad.jpg',
    description: 'Fresh spinach with mushrooms, hard boiled egg, and warm bacon vinaigrette',
  },
  {
    mid: 'lobster-roll',
    name: 'Lobster Roll',
    price: '$12.95',
    img: 'assets/img/menu/lobster-roll.jpg',
    description: 'Plump lobster meat, mayo and crisp lettuce on a toasted bulky roll',
  }
];

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

function Menu() {
  const { rid } = useParams(); // Get the restaurant ID from route parameters

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
            {menuItems.map(item => (
              <MenuItem key={item.id} item={item} rid={rid} />
            ))}
          </div>
        </div>
      </section>
      {/* /Menu Section */}
    </div>
  );
}

export default Menu;