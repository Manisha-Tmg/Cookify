import React, { useEffect, useState } from "react";
import { api } from "../../config";
import axios from "axios";
import "../readAllUser/ReadAllUser.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ReadAllUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const getData = async () => {
    const result = await axios({
      url: `${api}/user`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(result.data.result);
  };

  useEffect(() => {
    getData();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const handleView = (id) => {
    return () => {
      navigate(`/admin/user-details/${id}`);
    };
  };
  const handleDelete = (id) => {
    return () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios({
            url: `${api}/user/${id}`,
            method: "delete",
          });
          getData();
        }
      });
    };
  };
  return (
    <div className="user-wrapper">
      <div className="user-header">
        <div>
          <div className="user-title">
            User <span>Registry</span>
          </div>
          <div className="user-subtitle">
            Manage and monitor all registered accounts
          </div>
        </div>
        <div className="user-badge">⬡ Admin Panel</div>
      </div>

      <div className="user-search-bar">
        <input
          className="user-search-input"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="user-filter-btn">↻ Refresh</button>
      </div>

      <div className="user-table-card">
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <tr key={user.id}>
                <td>
                  <div className="user-user-cell">
                    <img
                      src={user.image}
                      alt={user.fullName}
                      className="user-avatar"
                    />

                    <div>
                      <div className="user-user-name">{user.fullName}</div>
                    </div>
                  </div>
                </td>
                <td className="user-email">{user.email}</td>
                <td>
                  <span
                    className={`user-verified ${user.isVerified ? "yes" : "no"}`}
                  >
                    {user.isVerified ? "✓ Verified" : "✗ Pending"}
                  </span>
                </td>
                <td className="user-date">{formatDate(user.createdAt)}</td>
                <td>
                  <div className="user-actions">
                    <button
                      className="user-btn user-btn-view"
                      onClick={handleView(user.id)}
                    >
                      View
                    </button>
                    <button
                      className="user-btn user-btn-del"
                      onClick={handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="user-footer">
          <span>
            Showing {filtered.length} of {users.length} users
          </span>
          <div className="user-pagination">
            <button className="user-page-btn">‹</button>
            <button className="user-page-btn active">1</button>
            <button className="user-page-btn">2</button>
            <button className="user-page-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadAllUser;
