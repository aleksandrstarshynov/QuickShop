import Profile from './Profile.js';
import profileData from './ProfileData.js';

function ProfileBar() {
    return (
        <div>
            <Profile
                userName={profileData.userName}
                role={profileData.role}
            /> 
        </div>
    )
}

export default ProfileBar;