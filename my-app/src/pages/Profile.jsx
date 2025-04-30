import React from 'react';
import Header from '../components/Header';
import UserStatus from '../components/UserStatus';

function Profile() {
  return (
    <>
      <main>
        <h1>Profile</h1>
        <UserStatus />
        <div>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates, illo corporis saepe voluptatem, nesciunt molestiae error voluptate nemo cum ratione tenetur dolorum iure, pariatur fuga? Ipsum fuga alias quis?</p>
        </div>
      </main>
    </>
  );
}

export default Profile;