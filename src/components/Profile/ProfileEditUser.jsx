import React, { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import * as client from "../Account/client"
import { setCurrentUser } from '../Account/reducer';


function ProfileEditUser() {
  const { currentUser } = useSelector((state) => state.accountReducer);
  const [user, setUser] = useState(currentUser);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setUser(prevUser => ({
        ...currentUser,
        dob: currentUser.dob ? new Date(currentUser.dob).toISOString().split('T')[0] : ''
      }));
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };
  
  const handleSave = async (e) => {
    e.preventDefault();
    try {
        const updatedUser = await client.updateUser(user);
        dispatch(setCurrentUser(updatedUser));
        setSuccessMessage('Changes saved successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
    } catch (err) {
        console.error(err);
        setSuccessMessage('Failed to update profile. Please try again.');
        setTimeout(() => setSuccessMessage(''), 3000);
    }
  }

  return (
    <div>
    <section id="profile-edit" className="profile-edit section">
      <slot type="section-title" />
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className="info-wrap">
              <div className="profile-header">
                <div className="profile-picture">
                  <img src="/path/to/default-avatar.jpg" alt="Profile" id="profile-img" />
                  <input type="file" id="profile-upload" accept="image/*" style={{display: 'none'}} />
                  <label htmlFor="profile-upload" className="upload-btn">Upload</label>
                </div>
                <div className="profile-info">
                  <h2 id="user-name">{user.firstName} {user.lastName}</h2>
                  <br />
                  <p id="user-role">Role: User</p>
                </div>
              </div>
              <div className="info-item d-flex">
                <i className="bi bi-person flex-shrink-0" />
                <div>
                  <h3>Personal Information</h3>
                  <p>View and edit your profile</p>
                </div>
              </div>

              <div className="info-item d-flex">
                <i className="bi bi-activity flex-shrink-0" />
                <div>
                  <h3>Your Activities</h3>
                  <p>View your recent activities</p>
                </div>
              </div>
            </div>
          </div>  

          <div className="col-lg-7">
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              <form className="php-email-form" onSubmit={handleSave}>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" className="form-control" id="firstName" required 
                      value={user.firstName}
                      onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" className="form-control" id="lastName" required 
                      value={user.lastName}
                      onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" name="username" id="username" required 
                    value={user.username}
                    onChange={handleInputChange} />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" className="form-control" name="email" id="email" required 
                    value={user.email}
                    onChange={handleInputChange} />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="dob">Birthday</label>
                  <input type="date" className="form-control" name="dob" id="dob" onChange={handleInputChange} />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="bio">Bio</label>
                  <input type="text" className="form-control" name="bio" id="bio" required 
                    value={user.bio}
                    onChange={handleInputChange} />
                </div>
                <br />
                <div className="text-center">
                  <button type="submit" className="btn" style={{backgroundColor: "#daa520"}}>
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfileEditUser