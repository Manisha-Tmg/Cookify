import { useState } from "react";
import "../dashboard/Dashborad.css";
import { useEffect } from "react";
import axios from "axios";
import { api } from "../config";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const token = localStorage.getItem("token");

  const getData = async () => {
    const result = await axios({
      url: `${api}/total-counts`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDashboardData(result.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="dashboard-content">
      <h2 className="dashboard-header">Dashboard</h2>
      <div className="card-container">
        <div className="card">
          <div className="icon">👥</div>
          <p className="text">Total Users</p>
          <p className="number">{dashboardData.totalUser}</p>
        </div>
        <div className="card">
          <div className="icon">📖</div>
          <p className="text">Total Recipe</p>
          <p className="number">{dashboardData.totalRecipe}</p>
        </div>
        <div className="card">
          <div className="icon">📖</div>
          <p className="text">Total Review</p>
          <p className="number">{dashboardData.totalReview}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
