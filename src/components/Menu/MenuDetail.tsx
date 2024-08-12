import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Review from '../Review/Review';
import ReplyComment from '../Review/ReplyComment';
import { useSelector, useDispatch } from 'react-redux';
import * as reviewClient from "../Review/client";
import * as menuClient from "./client";
import { setReviews } from '../Review/reducer';
import { setCurrentMenuItem, deleteMenuItem } from './reducer';
import Confirmation from '../Confirmation';
import Add from './Add';

function MenuDetail() {
  const [key, setKey] = useState(1)
  const { rid, iid } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchMenuItem = async () => {
      try {
        const menuItem = await menuClient.fetchMenuItemById(iid);
        dispatch(setCurrentMenuItem(menuItem));
      } catch (err: any) {
        console.log(err)
      }
  }

  const handleDelete = async () => {
    try {
        console.log("Code got here")
        const status = await menuClient.deleteMenuItem(iid);
        dispatch(deleteMenuItem(iid));
    } catch (err: any) {
        console.log(err)
    }
    setShowDeleteConfirmation(false);
    navigate(-1)
}

  const fetchReviews = async (menuItemId) => {
      try {
          const reviews = await reviewClient.fetchAllReviewsForContent('menu-item', menuItemId);
          dispatch(setReviews(reviews));
      } catch (err: any ) {
        console.log(err)
      }
  }
  useEffect(() => {
      fetchReviews(iid);
      fetchMenuItem();
  }, [])

  const { currentMenuItem } = useSelector((state: any) => state.menuItemReducer)   
  const { reviews } = useSelector((state:any) => state.reviewReducer);
  const { currentUser } = useSelector((state:any) => state.accountReducer);

  console.log(`CMU: ${currentMenuItem}`)

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
      <div id={`comment-${comment.id}`} className="comment" key={comment.id}>
        <div className="d-flex">
          <div className="comment-img">
            <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_user.jpg`} alt={`Commenter ${comment.id}`} />
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
      <section id="menu-detail" className="menu-detail section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="menu-carousel swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide" key="food">
                      <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_food.jpg`} alt={`Dish view 1`} />
                    </div>
                </div>
                <div className="swiper-pagination" />
                <div className="swiper-button-next" />
                <div className="swiper-button-prev" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="chef-info">
                <img src={`${process.env.PUBLIC_URL}/assets/img/generic/generic_user.jpg`} className="chef-img" alt="Chef" />
                <h3>{currentMenuItem && currentMenuItem.chef_name}</h3>
                <p>{currentMenuItem && currentMenuItem.chefs_intro}</p>
                <Link to={`/menu/${rid}`} className="btn btn-primary mt-3">View Full Menu</Link>
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
                  onClick={() => setShowReviewForm(true)}>
                  Write a Review
                </button>
              }

              {currentUser && currentMenuItem && currentUser._id === currentMenuItem.chef_id &&
                <div>
                  <button type="button"
                    className='btn btn-primary me-3'
                    onClick={() => setShowEditForm(true)}>
                    Edit Dish
                  </button>

                  <button type="button"
                  className='btn btn-primary'
                  onClick={() => {
                    setShowDeleteConfirmation(true)
                    }}>
                    Delete Dish
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
              content_type={"menu-item"}
              content_id={currentMenuItem ? currentMenuItem._id : 0}
              reviewer_id={currentUser ? currentUser._id : 0}
              reviewer_name={currentUser ? currentUser.firstName.concat(" ", currentUser.lastName) : "Dummy Name"}/>
      <ReplyComment show={showReplyForm} handleClose={() => setShowReplyForm(false)} />
      <Confirmation show={showDeleteConfirmation} 
                    handleClose={() => setShowDeleteConfirmation(false)}
                    handleDelete={() => handleDelete()}
                    text={"dish"}/>

      <Add show={showEditForm}
           handleClose={() => {
             setShowEditForm(false)
           }}
           editing={true}
           refresh={fetchMenuItem}
           chef_id={currentUser && currentUser._id}
           chef={currentUser && currentUser.firstName.concat(" ", currentUser.lastName)}
           restaurant_id={rid}/>

    </div>
  );
}

export default MenuDetail;