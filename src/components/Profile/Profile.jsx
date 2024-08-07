import React, { useState } from 'react';

function Profile({ isOwner }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div>
      {/* Profile Page Section */}
      <br />
      <br />
      <br />
      <section id="profile-page" className="profile-page section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Profile</h2>
        </div>{/* End Section Title */}
        <div className="container">
          <div className="row gy-5">
            <div className="col-xl-6 col-md-8 mb-4" data-aos="fade-up">
              <div className="profile-box">
                <div className="profile-header text-white d-flex flex-row" style={{ backgroundColor: '#000', height: 300 }}>
                  <div className="profile-avatar-container ms-4 d-flex flex-column" style={{ width: 150, marginTop: 200 }}>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Profile avatar"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: 150, zIndex: 1 }}
                    />
                    {isOwner ? (
                      <button type="button" className="btn btn-outline-light text-body" style={{ zIndex: 1 }}>
                        Edit profile
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline-light text-body"
                        style={{ zIndex: 1 }}
                        onClick={handleFollowClick}
                      >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                    )}
                  </div>
                  <div className="profile-info ms-3" style={{ marginTop: 250 }}>
                    <h5>Andy Horwitz</h5>
                  </div>
                </div>
                <div className="profile-stats p-4 text-black bg-body-tertiary" style={{ marginTop: 20 }}>
                  <div className="d-flex justify-content-end text-center py-1 text-body">
                    <div className="px-3">
                      <p className="mb-1 h5">10</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">4x</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="profile-about p-4 text-black" style={{ marginTop: 20 }}>
                  <div className="mb-5 text-body">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4 bg-body-tertiary">
                      <p className="font-italic mb-1">A real vegan lover</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{/* /Profile Page Section */}
    </div>
  );
}

export default Profile;