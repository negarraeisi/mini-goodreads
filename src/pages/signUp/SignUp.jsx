import "./signUp.css";
import React, { useState, useEffect } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://minigoodreads-api.onrender.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log("error fetching", err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      alert("passwords do not match");
      return;
    }

    const usernameExists = users.some(
      (user) => user.username === formData.username
    );

    if (usernameExists) {
      alert("Username already taken");
      return;
    }
    try {
      await fetch(`https://minigoodreads-api.onrender.com/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          wantToRead: [],
          read: [],
          currentlyReading: [],
        }),
      });
      alert("sign up successful!");
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  return (
    <div className="signupForm"> 
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          type="text"
          placeholder="Enter Username"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Enter Strong Password"
        ></input>
        <label htmlFor="password2">Confirm Password</label>
        <input
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          type="password"
          placeholder="Confirm password"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
