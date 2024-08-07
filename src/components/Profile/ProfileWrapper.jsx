import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from './Profile';

const currentUserId = 1; 
// Replace this with the actual logic to get the current user ID

function ProfileWrapper() {
  const { id } = useParams();
  const isOwner = parseInt(id) === currentUserId;

  return <Profile isOwner={isOwner} />;
}

export default ProfileWrapper;