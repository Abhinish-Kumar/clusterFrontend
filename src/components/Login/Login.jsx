import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      let data = await fetch("https://clusterapi.onrender.com/login", {
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
        console.log("User successfully logged in");
        navigate("/profile"); // Navigate to profile page
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div id="loginPage">
      <header>
        <h1>Pirana</h1>
        <button>
          <Link to="/register">Register</Link>
        </button>
      </header>
      <div id="loginContainer">
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
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
          <div>
          <button type="submit">Login</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
