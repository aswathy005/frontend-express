import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
  });

  // get profile
  const getProfile = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}profile`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFormdata(res.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `${import.meta.env.VITE_API_URL}updateprofile`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Profile updated");
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formdata.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formdata.email}
          onChange={handleChange}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
