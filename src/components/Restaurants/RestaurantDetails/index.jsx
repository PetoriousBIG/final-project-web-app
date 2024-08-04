import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Review from '../../Review/Review';
import ReplyComment from '../../Review/ReplyComment';

function RestaurantDetail() {
  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const restaurant = {
    id,
    name: "Vegan Delight",
    owner: "Owner's Name",
    introduction: "Our chef has a passion for creating delicious vegan dishes that not only taste great but are also good for the planet. Come and enjoy our fresh, locally sourced ingredients in a cozy and welcoming atmosphere.",
    images: [
      `${process.env.PUBLIC_URL}/assets/img/restaurant-carousel/restaurant-1.jpg`,
      `${process.env.PUBLIC_URL}/assets/img/restaurant-carousel/restaurant-2.jpg`,
      `${process.env.PUBLIC_URL}/assets/img/restaurant-carousel/restaurant-3.jpg`
    ],
    comments: [
      {
        id: 1,
        commenter: "Georgia Reader",
        date: "2024-07-27",
        text: "The atmosphere at Vegan Delight is simply wonderful. I loved the cozy interior and the friendly staff. The food was exceptional, especially the quinoa salad. Highly recommend!"
      },
      {
        id: 2,
        commenter: "Aron Alvarado",
        date: "2024-07-27",
        text: "Had a fantastic experience here. The menu is diverse, offering something for everyone. The sweet potato tacos were a highlight. Definitely coming back!",
        replies: [
          {
            id: 3,
            commenter: "Lynda Small",
            date: "2024-07-27",
            text: "I agree, the sweet potato tacos are amazing! I also loved the coconut curry. It's great to see such creative vegan options."
          },
          {
            id: 4,
            commenter: "Sianna Ramsay",
            date: "2024-07-27",
            text: "Absolutely! The creativity and flavor combinations are top-notch. Vegan Delight has become my go-to spot for vegan cuisine."
          }
        ]
      },
      {
        id: 5,
        commenter: "Nolan Davidson",
        date: "2024-07-27",
        text: "The service was impeccable, and the food was out of this world. The beet burger was flavorful and satisfying. Can't wait to try more dishes on the menu."
      },
      {
        id: 6,
        commenter: "Kay Duggan",
        date: "2024-07-27",
        text: "This place is a gem! The desserts are a must-try. I had the chocolate avocado mousse, and it was divine. Great place for a healthy yet indulgent meal."
      },
      {
        id: 7,
        commenter: "Emily Davis",
        date: "2024-07-27",
        text: "Fantastic vegan restaurant with a great ambiance. The green smoothie bowl was refreshing and delicious. Highly recommend for anyone looking for wholesome vegan food."
      },
      {
        id: 8,
        commenter: "Oliver Brown",
        date: "2024-07-27",
        text: "Vegan Delight never disappoints. The attention to detail in every dish is evident. The lentil soup was hearty and packed with flavor. Perfect for a chilly day."
      }
    ]
  };

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
      <section id="restaurant-detail" className="restaurant-detail section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="restaurant-carousel swiper-container">
                <div className="swiper-wrapper">
                  {restaurant.images.map((image, index) => (
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
              <h4 className="comments-count">{restaurant.comments.length} Comments</h4>
              <button 
                type="button"
                className="btn btn-primary"
            onClick={() => setShowReviewForm(true)}
          >
            Write a Review
          </button>
        </div>
        {renderComments(restaurant.comments)}
      </div>
    </div>
  </section>
  <Review show={showReviewForm} handleClose={() => setShowReviewForm(false)} />
  <ReplyComment show={showReplyForm} handleClose={() => setShowReplyForm(false)} />
</div>
);
}

export default RestaurantDetail;