import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as client from "../Account/client"
import { setCurrentUser } from '../Account/reducer';
import { fireEvent } from '@testing-library/react';

function ProfileEditChef() {
  const { currentUser } = useSelector((state) => state.accountReducer);
  const [user, setUser] = useState(currentUser);
  const [activeForm, setActiveForm] = useState('personal-info');
  const dispatch = useDispatch();
  const showForm = (formName) => {
    setActiveForm(formName);
  };

  const handleSave = async (e) => {
    e.preventDefault()
    try {
        const status = await client.updateUser(user)
        dispatch(setCurrentUser(user));
        
    }   catch ( err ) {
        console.log(err);
    }
  }

  return (
    <section id="profile-edit" className="profile-edit section">
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className="info-wrap">
              <div className="profile-header">
                <div className="profile-picture">
                  <img src="/path/to/default-avatar.jpg" alt="Profile" id="profile-img" />
                  <input type="file" id="profile-upload" accept="image/*" style={{ display: 'none' }} />
                  <label htmlFor="profile-upload" className="upload-btn">Upload</label>
                </div>
                <div className="profile-info">
                  <h2 id="user-name">{user.firstName} {user.lastName}</h2>
                  <p id="user-role">Role: Chef</p>
                </div>
              </div>

              <div 
                className={`info-item d-flex ${activeForm === 'personal-info' ? 'active' : ''}`} 
                onClick={() => showForm('personal-info')}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-person flex-shrink-0" />
                <div>
                  <h3>Personal Information</h3>
                  <p>View and edit your profile</p>
                </div>
              </div>

              <div 
                className={`info-item d-flex ${activeForm === 'manage-dishes' ? 'active' : ''}`}
                onClick={() => showForm('manage-dishes')}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-clipboard2-check flex-shrink-0" />
                <div>
                  <h3>Manage Dishes</h3>
                  <p>Add or edit dishes</p>
                </div>
              </div>
            </div>
          </div>  

          <div className="col-lg-7">
            {activeForm === 'personal-info' && (
              <form action="forms/contact.php" method="post" className="php-email-form">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" className="form-control" id="firstName" required value={user.firstName}
                      onChange={(e) => setUser({...user, firstName: e.target.value})}/>
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" className="form-control" id="lastName" required value={user.lastName}
                      onChange={(e) => setUser({...user, lastName: e.target.value})}/>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" name="username" id="username" required value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}/>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" className="form-control" name="email" id="email" required value={user.email}
                    onChange={(e) => {setUser({...user, email: e.target.value})}}/>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="organization">Organization Name</label>
                  <input type="text" className="form-control" name="organization" id="organization" placeholder="If you are a restaurant owner or chef" value={user.org}
                    onChange={(e) => {setUser({...user, org: e.target.value})}}/>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="text" className="form-control" name="phone" id="phone" required value={user.phone}
                    onChange={(e) => {setUser({...user, phone: e.target.value})}}/>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="birthday">Birthday</label>
                  <input type="date" className="form-control" name="birthday" id="birthday" required value={user.dob}
                    onChange={(e) => {setUser({...user, dob: e.target.value})}}/>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="bio">Bio</label>
                  <input type="text" className="form-control" name="bio" id="bio" required value={user.bio}
                    onChange={(e) => {setUser({...user, bio: e.target.value})}}/>
                </div>
                <br />
                <div className="text-center"><button type="submit">Save changes</button></div>
              </form>
            )}

            {activeForm === 'manage-dishes' && (
              <form action="forms/manage-dishes.php" method="post" encType="multipart/form-data" className="php-email-form">
                <div className="form-group">
                  <label htmlFor="dishName">Dish Name</label>
                  <input type="text" name="dishName" className="form-control" id="dishName" required />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="dishIntro">Introduction</label>
                  <textarea className="form-control" name="dishIntro" id="dishIntro" rows={5} required></textarea>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="dishGalleryUpload">Upload Gallery Pics</label>
                  <input type="file" className="form-control" name="dishGalleryUpload[]" id="dishGalleryUpload" multiple accept="image/*" />
                </div>
                <div className="text-center mt-3">
                  <button type="submit" name="action" value="create">Create</button>
                  <button type="submit" name="action" value="save">Save</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileEditChef;