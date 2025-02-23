import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css"

const Register = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await fetch("https://clusterapi.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Ensures cookies are sent
      });
      let jsonRes = await data.json();
      console.log(jsonRes);
      if (data.ok) {
        console.log("User successfully registered");
        navigate("/profile");  // Navigate to profile page
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.log(error);
    }

    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div id="registerPage">
    <header>
      <h1>Cluster</h1>
<button> <Link to="/login">Login</Link></button>
    </header>
     <div id="registerContainer">

    
      <h1>Register</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div><button type="submit">Register</button></div>
        
      </form> </div>
    </div>
  );
};

export default Register;
