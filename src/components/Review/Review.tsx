import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as client from "./client";
import { Star } from 'lucide-react';
import { addReview } from "./reducer";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
const Review = ({ show, handleClose, content_type, content_id, reviewer_name, reviewer_id }) => {
  const [review, setReview ] = useState<any>({});
  const [hover, setHover] = useState(0);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser) {
      setReview({...review, content_type: content_type});
      setReview({...review, content_id: content_id});
      setReview({...review, reviewer_name: reviewer_name});
      setReview({...review, reviewer_id: reviewer_id});
  }

  const handleSubmit = async () => {
      try {
          const status = await client.createReview(review);
          dispatch(addReview(review));
          handleClose()
      } catch (err: any) {
          console.log(err)
      }
  }

  return (
    <Modal show={show} onHide={handleClose} centered className="review-modal">
      <Modal.Header closeButton>
        <Modal.Title style={{ marginBottom: '10px' }}>Write a Review</Modal.Title>
      </Modal.Header>
      
      {currentUser ?
        <Modal.Body>
          <form className="write-review">
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={index <= (hover || review.rating) ? "star filled" : "star"}
                    onClick={() => setReview({...review, rating: index})}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(review.rating)}>
                    <Star size={24} />
                  </button>
                );
              })}
              <span className="rating-text">{review.rating}/5</span>
            </div>
            <div className="form-group">
              <textarea placeholder="Write your review here..." required></textarea>
            </div>
            <Button className="btn-submit" onClick={handleSubmit}>Submit Review</Button>
          </form>
        </Modal.Body> 
        
        :

        <Modal.Body>
          An account is required to write a review! Register now!
        </Modal.Body>
      
      }
    </Modal>
  );
};

export default Review;