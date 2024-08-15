import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as client from "./client";
import { Star } from 'lucide-react';
import { addReview, updateReview } from "./reducer";
import { useDispatch, useSelector } from 'react-redux';
const Review = ({ show, handleClose, refresh, content_type, review}) => {
  const dispatch = useDispatch()
  const { currentRestaurant } = useSelector((state: any) => state.restaurantReducer)   
  const { currentUser } = useSelector((state:any) => state.accountReducer);
  const { currentMenuItem } = useSelector((state: any) => state.menuItemReducer);
  const [hover, setHover] = useState(0);
  const [reviewForm, setReviewForm] = useState<any>({...review})
  const handleSubmit = async () => {
      if (review === null) {
          try {
              setReviewForm({...reviewForm, date: Date()})
              const status = await client.createReview(reviewForm);
              dispatch(addReview(reviewForm));
              handleClose()
          } catch (err: any) {
              console.log(err)
          }
      } else {
         try {
             const status = await client.updateReview(reviewForm);
             dispatch(updateReview(reviewForm));
             handleClose()
         } catch (err: any) {
             console.log(err)
         }
      }
  }

  useEffect(() => {
    if (review === null) {
        if (currentRestaurant && content_type === 'restaurant') { // new review for restaurant
            setReviewForm({...reviewForm, 
                           content_id: currentRestaurant._id, 
                           content_type: content_type, 
                           reviewer_name: currentUser && currentUser.firstName.concat(" ", currentUser.lastName),
                           reviewer_id: currentUser && currentUser._id})
        } else if (currentMenuItem) { // new review for menu item
            setReviewForm({...reviewForm, 
                           content_id: currentMenuItem._id, 
                           content_type: content_type, 
                           reviewer_name: currentUser && currentUser.firstName.concat(" ", currentUser.lastName),
                           reviewer_id: currentUser && currentUser._id})
        }
    } else {
      setReviewForm({...review})
    }

  }, [currentMenuItem, currentRestaurant, currentUser])

  return (
    <Modal show={show} onHide={handleClose} onShow={() => {
      if (review !== null)
          setReviewForm(review)
    }} onExit={() => {
      refresh()
      setReviewForm(null)
      handleClose()}} centered className="review-modal">
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
                    className={index <= (hover || (reviewForm && reviewForm.rating)) ? "star filled" : "star"}
                    onClick={() => setReviewForm({...reviewForm, rating: index})}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(reviewForm && reviewForm.rating)}>
                    <Star size={24} />
                  </button>
                );
              })}
              <span className="rating-text">{reviewForm && reviewForm.rating}/5</span>
            </div>
            <div className="form-group">
              <textarea placeholder="Write your review here..." required value={reviewForm && reviewForm.review_text}
                onChange={(e) => setReviewForm({...reviewForm, review_text: e.target.value})}></textarea>
            </div>
            <Button className="btn-submit" onClick={handleSubmit}>Submit Review</Button>
          </form>
        </Modal.Body> 
        
    </Modal>
  );
};

export default Review;