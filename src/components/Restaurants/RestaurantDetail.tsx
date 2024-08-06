import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Review from '../Review/Review';
import { useSelector, useDispatch } from "react-redux";
import ReplyComment from '../Review/ReplyComment';
import { updateRestaurant } from './reducer';
import * as client from "../Review/client";
import { setReviews } from '../Review/reducer';

function RestaurantDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const fetchReviews = async (restaurantId) => {
        try {
            console.log(restaurantId)
            const reviews = await client.fetchAllReviewsForContent('restaurant', restaurantId);
            console.log(`${reviews}`)
            dispatch(setReviews(reviews));
        } catch ( err: any ) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchReviews(id);
    }, []);

    const restaurant = useSelector((state: any) => state.restaurantReducer.restaurants.find((restaurant: any) => restaurant._id === id))
    const { reviews } = useSelector((state:any) => state.reviewReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        Swiper.use([Navigation, Pagination]);

        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
          });
        return () => swiper.destroy();
    }, []);

  const renderComments = (comments) => {
    return comments.map(comment => (
      <div id={`comment-${comment._id}`} className="comment" key={comment._id}>
        <div className="d-flex">
          <div className="comment-img">
            <img src={`assets/img/comments/comments-${comment._id}.jpg`} alt={`Commenter ${comment._id}`} />
          </div>
          <div>
            <h5>
              <span>{comment.reviewer_name}</span>
              <button 
                type="button" 
                className="btn-reply"
                onClick={() => setShowReplyForm(true)}
              >
                <i className="bi bi-reply-fill" /> Reply
              </button>
            </h5>
            <time dateTime={comment.date}>{comment.date}</time>
            <p>{comment.review_text}</p>
          </div>
        </div>
        {comment.comments && renderComments(comment.comments)}
      </div>
    ));
  };

  return (
    <div>
      <section id="restaurant-detail" className="restaurant-detail section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="restaurant-carousel swiper-container">
                <div className="swiper-wrapper">
                  { restaurant.images.map((image, index) => (
                    <div className="swiper-slide" key={index}>
                      <img src={image} alt={`Restaurant view ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <div className="swiper-pagination" />
                <div className="swiper-button-next" />
                <div className="swiper-button-prev" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="owner-info">
                <img src={`${process.env.PUBLIC_URL}/assets/img/owners/owner.jpg`} className="owner-img" alt="Owner" />
                <h3>{restaurant.owner}</h3>
                <p>{restaurant.introduction}</p>
                <Link to="/menu" className="btn btn-primary mt-3">Check the Menu</Link>
              </div>
            </div>
          </div>
          <div className="comments-section mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="comments-count">{reviews ? reviews.length : 0} Comments</h4>
              <button 
                type="button"
                className="btn btn-primary"
            onClick={() => setShowReviewForm(true)}
          >
            Write a Review
          </button>
        </div>
        {reviews && renderComments(reviews)}
      </div>
    </div>
  </section>
  
  {currentUser &&
    <div>
      <Review show={showReviewForm} 
              handleClose={() => setShowReviewForm(false)} 
              content_type={"restaurant"} 
              content_id={restaurant._id} 
              reviewer_id={currentUser._id} 
              reviewer_name={currentUser.firstName.concat(" ", currentUser.lastName) }/>
      <ReplyComment show={showReplyForm} handleClose={() => setShowReplyForm(false)} />
    </div>
  }

</div>
);
}

export default RestaurantDetail;