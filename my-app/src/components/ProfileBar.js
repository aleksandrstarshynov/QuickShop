import Profile from './Profile.js';
import profileData from './ProfileData.js';
import UserStatus from './UserStatus.js';

function ProfileBar() {
    return (
        <div>
            <h1>Добро пожаловать!</h1>
            <Profile
                userName={profileData.userName}
                role={profileData.role}
            /> 
            <UserStatus />
        </div>
    )
}

export default ProfileBar;