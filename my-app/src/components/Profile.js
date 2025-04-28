function Profile(props) {
    return (
      <div>
        <h1>{props.userName}</h1>  
        <h2>{props.role}</h2> 
      </div>
    );
  }
  
  export default Profile;