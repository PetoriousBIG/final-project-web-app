import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Review from '../Review/Review';
import { useSelector, useDispatch } from "react-redux";
import ReplyComment from '../Review/ReplyComment';
import * as restaurantClient from "../Restaurants/client";
import * as reviewClient from "../Review/client";
import * as accountClient from "../Account/client";
import { setReviews, deleteReview } from '../Review/reducer';
import Confirmation from '../Confirmation';
import { deleteRestaurant, setCurrentRestaurant } from './reducer';
import { setUsers } from '../Account/reducer'
import Add from "./Add";

function RestaurantDetail() {
    const { rid } = useParams();
    const dispatch = useDispatch();
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [contentToDelete, setContentToDelete] = useState(null);
    const [contentId, setContentId] = useState(null);
    const [currentReview, setCurrentReview] = useState<any>(null);
    const navigate = useNavigate()

    const fetchReviews = async (restaurantId) => {
        try {
            const reviews = await reviewClient.fetchAllReviewsForContent('restaurant', restaurantId);
            dispatch(setReviews(reviews));
        } catch ( err: any ) {
            console.log(err)
        }
    }

    const fetchChefs = async () => {
      try {
          const chefs = await accountClient.fetchUsersForRole('Chef');
          dispatch(setUsers(chefs));
      } catch (err: any) {
          console.log(err);
      }
    }

    const fetchRestaurant = async () => {
        try {
            const restaurants = await restaurantClient.fetchRestaurantUsingId(rid);
            dispatch(setCurrentRestaurant(restaurants));
        } catch ( err: any ) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchChefs();
        fetchReviews(rid);
        fetchRestaurant();
    }, []);

    const { currentRestaurant } = useSelector((state: any) => state.restaurantReducer)   
    const { reviews } = useSelector((state:any) => state.reviewReducer);
    const { users, currentUser } = useSelector((state:any) => state.accountReducer);

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
        <div className="d-flex justify-content-start">
          <div className="comment-img">
            <img src={`${process.env.PUBLIC_URL}/assets/img/profiles/generic-profile.png`} alt={`Commenter ${comment._id}`} />
          </div>
          <div>
            <h5>
              {currentUser && currentUser._id === comment.reviewer_id ?
               <a href="/profile"><span>{comment.reviewer_name}</span></a> :
               <a href={`/profile/${comment.reviewer_id}`}><span>{comment.reviewer_name}</span></a>
              }

              { currentUser && currentUser._id === comment.reviewer_id &&            
                <button 
                  type="button" 
                  className="btn-reply"
                  onClick={() => {
                    setCurrentReview(comment)
                    setShowReviewForm(true)}}>
                  <i className="bi bi-trash-fill" />Edit
                </button>
              }{" "}
              { currentUser && currentUser._id === comment.reviewer_id &&
                <button 
                  type="button" 
                  className="btn-reply"
                  onClick={() => {
                    setContentId(comment._id);
                    setContentToDelete("review");
                    setShowDeleteConfirmation(true)}}>
                  <i className="bi bi-trash-fill" />Delete
                </button>
              }
            </h5>
            <time dateTime={comment.date}>{comment.date}</time>
            <p><strong>{comment.rating}/5</strong>: {comment.review_text}</p>
          </div>
        </div>
      </div>
    ));
  };

  const handleDelete = async () => {
      if (contentToDelete === 'restaurant') {
          try {
              const status = await restaurantClient.deleteRestaurant(contentId);
              dispatch(deleteRestaurant(contentId));
          } catch (err: any) {
              console.log(err);
          };
            
          setShowDeleteConfirmation(false);
          navigate(-1)
        } else {
          try {
            const status = await reviewClient.deleteReview(contentId);
            dispatch(deleteReview(contentId));
          } catch (err: any) {
            console.log(err);
          };
          setShowDeleteConfirmation(false);
        }
  }

  return (
    <div>
      <section id="restaurant-detail" className="restaurant-detail section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="restaurant-carousel swiper-container">
                <div className="swiper-wrapper">
                  <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_restaurant.jpg`} alt={`generic-restaurant.jpg`} />
                </div>
                <div className="swiper-pagination" />
                <div className="swiper-button-next" />
                <div className="swiper-button-prev" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="owner-info">
                <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_user.jpg`} className="owner-img" alt="Owner" />
                <h3>{ currentRestaurant && currentRestaurant.owner}</h3>
                <p>{ currentRestaurant && currentRestaurant.introduction}</p>
                <Link to={`/restaurants/${rid}/menu/`} className="btn btn-primary mt-3">Check the Menu</Link>
              </div>
            </div>
          </div>
          <div className="comments-section mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="comments-count">{reviews ? reviews.length : 0} Comments</h4>
              
              {currentUser && currentUser.role === 'User' &&
                <button 
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                      setCurrentReview(null)
                      setShowReviewForm(true)}}>
                  Write a Review
                </button>
              }

              {currentUser && currentRestaurant && currentUser._id === currentRestaurant.owner_id &&
                
                <div>
                  <button type="button"
                    className='btn btn-primary me-3'
                    onClick={() => setShowEditForm(true)}>
                    Edit Restaurant
                  </button>

                  <button type="button"
                  className='btn btn-primary'
                  onClick={() => {
                    setContentId(currentRestaurant._id);
                    setContentToDelete("restaurant");
                    setShowDeleteConfirmation(true)
                    }}>
                    Delete Restaurant
                  </button>
                </div>
              }

            </div>
            {reviews && renderComments(reviews)}
          </div>
        </div>
      </section>
      <Review show={showReviewForm} 
              handleClose={() => setShowReviewForm(false)} 
              review={currentReview}
              refresh={() => fetchReviews(rid)}
              content_type={"restaurant"}/>
      <Confirmation show={showDeleteConfirmation} 
                    handleClose={() => setShowDeleteConfirmation(false)}
                    handleDelete={handleDelete}
                    text={contentToDelete}/>

      <Add show={showEditForm}
            handleClose={() => {
              setShowEditForm(false)
            }}
            editing={true}
            refresh={fetchRestaurant}
            users={users}
            owner_id={currentUser && currentUser._id}
            owner={currentUser && currentUser.firstName.concat(" ", currentUser.lastName)}/>

      
    </div>
  );
}

export default RestaurantDetail;