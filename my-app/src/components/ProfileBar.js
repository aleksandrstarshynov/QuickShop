import Profile from './Profile.js';
import profileData from './ProfileData.js';
import UserStatus from './UserStatus.js';

function ProfileBar() {
return (
        <div>
            <Profile
                userName={profileData.userName}
                // role={profileData.role}
            /> 
            {/* <UserStatus /> */}
        </div>
    )
}

export default ProfileBar;