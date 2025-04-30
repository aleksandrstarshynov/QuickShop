function Profile(props) {
    return (
      <div className="profile">
        <p>{props.userName}</p>  
        {/* <h2>{props.role}</h2>  */}
      </div>
    );
  }
  
  export default Profile;