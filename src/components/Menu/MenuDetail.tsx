import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Review from '../Review/Review';
import ReplyComment from '../Review/ReplyComment';
import { useSelector, useDispatch } from 'react-redux';
import * as reviewClient from "../Review/client";
import { setReviews } from '../Review/reducer';

function MenuDetail() {
  const { rid, iid } = useParams();

  const dispatch = useDispatch();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

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
  }, [])
  const { menuItems } = useSelector((state: any) => state.menuItemReducer)
  const currentMenuItem = useSelector((state: any) => state.menuItemReducer.menuItems.find((menuItem: any) => menuItem._id === iid))   
  const { reviews } = useSelector((state:any) => state.reviewReducer);
  const { currentUser } = useSelector((state:any) => state.accountReducer);

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
            <img src={`${process.env.PUBLIC_URL}/assets/img/comments/comments-${comment.id}.jpg`} alt={`Commenter ${comment.id}`} />
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
                  { currentMenuItem && currentMenuItem.images.map((image, index) => (
                    <div className="swiper-slide" key={index}>
                      <img src={image} alt={`Dish view ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <div className="swiper-pagination" />
                <div className="swiper-button-next" />
                <div className="swiper-button-prev" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="chef-info">
                <img src={`${process.env.PUBLIC_URL}/assets/img/chefs/chef.jpg`} className="chef-img" alt="Chef" />
                <h3>{currentMenuItem && currentMenuItem.chef_name}</h3>
                <p>{currentMenuItem && currentMenuItem.chefs_intro}</p>
                <Link to={`/menu/${rid}`} className="btn btn-primary mt-3">View Full Menu</Link>
              </div>
            </div>
          </div>
          <div className="comments-section mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="comments-count">{reviews ? reviews.length : 0} Comments</h4>
              
              {currentUser && 
                <button 
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowReviewForm(true)}>
                  Write a Review
                </button>
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
    </div>
  );
}

export default MenuDetail;