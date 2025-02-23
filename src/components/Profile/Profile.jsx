import {  useNavigate ,Link} from "react-router-dom"; // Import useNavigate
import { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Create navigate function

async function deleteCookie() {
            await fetch("https://clusterapi.onrender.com/deleteCookie", {
              method: "GET",
              credentials: "include",  // Make sure cookies are included in the request
            });
            navigate("/login")
            
            // After this, you can navigate the user to the login page or show a logout message
          }
          

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        let response = await fetch("https://clusterapi.onrender.com/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensures cookies are sent with the request
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        let data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); // Empty array ensures this runs only once when the component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div id="profile">
      <header>
        <h1>Cluster</h1>
        <div>
        <button><Link to="/userList">UsersList</Link></button>
        <button onClick={deleteCookie}>Logout</button> {/* On click, call deleteCookie */}
        </div>
     
      </header>
      <div id="profileLogo">
      <h1>Profile</h1>
      {profileData && (
        <div>
          <p>Username: {profileData.name}</p> {/* Changed 'username' to 'name' */}
          <p>Email: {profileData.email}</p>
          <img src={profileData.image} alt="Profile" style={{ width: 300 }} />
        </div>
      )}
     
      </div>
     
    </div>
  );
};

export default Profile;
