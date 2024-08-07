import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Review from '../Review/Review';
import ReplyComment from '../Review/ReplyComment';

const sampleMenuData = {
  name: "Chef's Specials",
  chef: "Chef's Name",
  introduction: "Our chef brings a wealth of culinary experience, crafting exquisite vegan dishes that are both innovative and delightful. Enjoy our chef's specials made with fresh, organic ingredients.",
  images: [
    `${process.env.PUBLIC_URL}/assets/img/menu-carousel/dish-1.jpg`,
    `${process.env.PUBLIC_URL}/assets/img/menu-carousel/dish-2.jpg`,
    `${process.env.PUBLIC_URL}/assets/img/menu-carousel/dish-3.jpg`
  ],
  comments: [
    {
      id: 1,
      commenter: "Georgia Reader",
      date: "2024-07-27",
      text: "The dishes are a work of art! The presentation and flavors are outstanding. The stuffed bell peppers are a must-try!"
    },
    {
      id: 2,
      commenter: "Aron Alvarado",
      date: "2024-07-27",
      text: "I am impressed by the creativity in the menu. The cauliflower steak was perfectly cooked and seasoned.",
      replies: [
        {
          id: 3,
          commenter: "Lynda Small",
          date: "2024-07-27",
          text: "I agree, the cauliflower steak is amazing! The cashew cream sauce is to die for."
        },
        {
          id: 4,
          commenter: "Sianna Ramsay",
          date: "2024-07-27",
          text: "Absolutely! The flavors are so well-balanced. I can't wait to try more dishes."
        }
      ]
    },
    {
      id: 5,
      commenter: "Nolan Davidson",
      date: "2024-07-27",
      text: "Every dish was a delight. The mushroom risotto was rich and creamy. Highly recommended!"
    },
    {
      id: 6,
      commenter: "Kay Duggan",
      date: "2024-07-27",
      text: "The dessert menu is fantastic. The chocolate lava cake was the perfect end to a great meal."
    },
    {
      id: 7,
      commenter: "Emily Davis",
      date: "2024-07-27",
      text: "The chef's specials never disappoint. The attention to detail in every dish is remarkable."
    },
    {
      id: 8,
      commenter: "Oliver Brown",
      date: "2024-07-27",
      text: "I've tried almost everything on the menu, and everything has been exceptional. The roasted vegetable platter is my favorite."
    }
  ]
};

function MenuDetail({ menu = sampleMenuData }) {
  const { rid, mid } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

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
            <img src={`assets/img/comments/comments-${comment.id}.jpg`} alt={`Commenter ${comment.id}`} />
          </div>
          <div>
            <h5>
              <span>{comment.commenter}</span>
              <button 
                type="button" 
                className="btn-reply"
                onClick={() => setShowReplyForm(true)}
              >
                <i className="bi bi-reply-fill" /> Reply
              </button>
            </h5>
            <time dateTime={comment.date}>{comment.date}</time>
            <p>{comment.text}</p>
          </div>
        </div>
        {comment.replies && renderComments(comment.replies)}
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
                  {menu.images.map((image, index) => (
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
                <h3>{menu.chef}</h3>
                <p>{menu.introduction}</p>
              </div>
            </div>
          </div>
          <div className="comments-section mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="comments-count">{menu.comments.length} Comments</h4>
              <button 
                type="button"
                className="btn btn-primary"
                onClick={() => setShowReviewForm(true)}
              >
                Write a Review
              </button>
            </div>
            {renderComments(menu.comments)}
          </div>
        </div>
      </section>
      <Review show={showReviewForm} handleClose={() => setShowReviewForm(false)} />
      <ReplyComment show={showReplyForm} handleClose={() => setShowReplyForm(false)} />
    </div>
  );
}

export default MenuDetail;