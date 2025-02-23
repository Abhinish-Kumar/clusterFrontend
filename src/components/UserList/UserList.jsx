import { useState, useEffect } from "react";
import "./UserList.css";
import Notes from "../Notes/Notes"; // Import the new Notes component
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user list after checking if the user is authenticated
    const fetchUserList = async () => {
      try {
        let response = await fetch("http://localhost:3300/userList", {
          method: "GET",
          credentials: "include", // Include cookies in request to authenticate
        });

        if (!response.ok) {
          throw new Error("Unauthorized: No username cookie");
        }

        const data = await response.json();
        setUsers(data); // Set the list of users
      } catch (err) {
        setError(err.message); // Set the error message if any error occurs
      }
    };

    fetchUserList();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="userList">
    <header>
      <h1>Cluster</h1>
    </header>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <p>Username:{user.username}</p>
            <p>Email:{user.email}</p>
            <img src={user.profile.image} alt={user.username} width="50" />
            {/* Link to /usernotes/{user.email} directly */}
            <li>
              <Link to={`/usernotes/${user.email}`}>UserNotes</Link>
            </li>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
