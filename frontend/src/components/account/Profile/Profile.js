import React from 'react';
import './Profile.scss';
import UserData from './UserData';
import Password from './Password';

function Profile() {
  return (
    <div className="bg-light p-5">
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <UserData />
        <Password />
      </div>
    </div>
  );
}

export default Profile;
