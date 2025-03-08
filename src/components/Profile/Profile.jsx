import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Create navigate function

  // Function to handle logout and delete the cookie
  async function deleteCookie() {
    try {
      await fetch("https://clusterapi.onrender.com/deleteCookie", {
        method: "GET",
        credentials: "include", // Ensure cookies are included in the request
      });
      navigate("/login"); // Redirect to login after logout
    } catch (err) {
      setError("Failed to log out");
    }
  }

  // Fetch the profile data
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

  // Loading, error, and profile display logic
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
          <button>
            <Link to="/userList">Users List</Link>
          </button>
          <button onClick={deleteCookie}>Logout</button> {/* On click, call deleteCookie */}
        </div>
      </header>
      
      <div id="profileLogo">
        <h1>Profile</h1>
        {profileData ? (
          <div>
            <p>Username: {profileData.name}</p> {/* Changed 'username' to 'name' */}
            <p>Email: {profileData.email}</p>
            <img src={profileData.image} alt="Profile" style={{ width: 300 }} />
          </div>
        ) : (
          <p>No profile data available.</p> // Display message if no profile data is available
        )}
      </div>
    </div>
  );
};

export default Profile;
