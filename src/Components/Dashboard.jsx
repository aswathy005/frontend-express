import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const getCount = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}getdata`
      );
      setTotal(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dash-title">Welcome to Dashboard 👋</h2>
      <p className="dash-sub">Manage your products easily</p>

      <div className="card-container">
        <div className="dash-card">
          <h3>Total Products</h3>
          <p className="count">{total}</p>
        </div>

        <div
          className="dash-card clickable"
          onClick={() => navigate("/adddata")}
        >
          <h3>➕Add Product</h3>
          <p>Create new</p>
        </div>

        <div
          className="dash-card clickable"
          onClick={() => navigate("/getdata")}
        >
          <h3>👀View Products</h3>
          <p>Browse list</p>
        </div>

    <div
          className="dash-card clickable"
          onClick={() => navigate("/profile")}
        >
          <h3>👤Profile</h3>
          <p>you can edit your profile</p>
        </div>


      </div>
    </div>
  );
}

export default Dashboard;
