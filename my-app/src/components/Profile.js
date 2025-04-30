import { useNavigate } from "react-router-dom";

function Profile(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div className="profile" onClick={handleClick} style={{ cursor: "pointer" }}>
      <p>{props.userName}</p>  
      {/* <h2>{props.role}</h2>  */}
    </div>
  );
}

export default Profile;
