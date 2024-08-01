import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Star } from 'lucide-react';

const Review = ({ show, handleClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <Modal show={show} onHide={handleClose} centered className="review-modal">
      <Modal.Header closeButton>
        <Modal.Title style={{ marginBottom: '10px' }}>Write a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="write-review">
          <div className="star-rating">
            {[...Array(5)].map((_, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hover || rating) ? "star filled" : "star"}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <Star size={24} />
                </button>
              );
            })}
            <span className="rating-text">{rating}/5</span>
          </div>
          <div className="form-group">
            <textarea placeholder="Write your review here..." required></textarea>
          </div>
          <Button type="submit" className="btn-submit">Submit Review</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Review;