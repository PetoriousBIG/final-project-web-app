
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Recipes() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchRecipes = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };
  return (
    <div>
      <section id="recipe" className="recipe section">
      <br/>

        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Recipe</h2>
          <p>Vegan Recipes</p> <br />
          <form onSubmit={handleSearchRecipes} className="form-search d-flex align-items-stretch mb-3" data-aos="fade-up" data-aos-delay={200}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search for your favorite vegan recipe" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>{/* End Section Title */}
        
        <div className="container-fluid" data-aos="fade-up" data-aos-delay={100}>
          <div className="row g-0">
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-1.jpg" className="glightbox" data-gallery="images-gallery">
                  <img src="assets/img/gallery/gallery-1.jpg" alt="Vegan dish 1" className="img-fluid" />
                </a>
              </div>
            </div>{/* End Gallery Item */}
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-2.jpg" className="glightbox" data-gallery="images-gallery">
                  <img src="assets/img/gallery/gallery-2.jpg" alt="Vegan dish 2" className="img-fluid" />
                </a>
              </div>
            </div>{/* End Gallery Item */}
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-3.jpg" className="glightbox" data-gallery="images-gallery">
                  <img src="assets/img/gallery/gallery-3.jpg" alt="Vegan dish 3" className="img-fluid" />
                </a>
              </div>
            </div>{/* End Gallery Item */}
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-4.jpg" className="glightbox" data-gallery="images-gallery">
                  <img src="assets/img/gallery/gallery-4.jpg" alt="Vegan dish 4" className="img-fluid" />
                </a>
              </div>
            </div>{/* End Gallery Item */}
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-5.jpg" className="glightbox" data-gallery="images-gallery">
                  <img src="assets/img/gallery/gallery-5.jpg" alt="Vegan dish 5" className="img-fluid" />
                </a>
              </div>
            </div>{/* End Gallery Item */}
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-6.jpg" className="glightbox" data-gallery="images-gallery">
                  <img src="assets/img/gallery/gallery-6.jpg" alt="Vegan dish 6" className="img-fluid" />
                </a>
              </div>
            </div>{/* End Gallery Item */}
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-7.jpg" className="glightbox" data-gallery="images-gallery">
                  <img src="assets/img/gallery/gallery-7.jpg" alt="Vegan dish 7" className="img-fluid" />
                </a>
              </div>
            </div>{/* End Gallery Item */}
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-8.jpg" className="glightbox" data-gallery="images-gallery">
                  <img src="assets/img/gallery/gallery-8.jpg" alt="Vegan dish 8" className="img-fluid" />
                </a>
              </div>
            </div>{/* End Gallery Item */}
          </div>
        </div>
      </section>{/* /Recipe Section */}
    </div>
  );
}

export default Recipes;
