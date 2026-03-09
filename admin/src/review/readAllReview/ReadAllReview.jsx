import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./ReadAllReview.css";
import Swal from "sweetalert2";
import { api } from "../../config";

const ReadAllReview = () => {
  const [reviews, setreviews] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const getData = async () => {
    const result = await axios({
      url: `${api}/review`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setreviews(result.data.result);
    console.log(result.data.result);
  };

  useEffect(() => {
    getData();
  }, []);

  const filtered = reviews.filter((u) =>
    u.comment?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleView = (id) => {
    return () => {
      navigate(`/admin/review-details/${id}`);
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
            url: `${api}/review/${id}`,
            method: "delete",
          });
          getData();
        }
      });
    };
  };
  return (
    <div className="review-wrapper">
      <div className="review-header">
        <div>
          <div className="review-title">
            Review <span>Registry</span>
          </div>
          <div className="review-subtitle">
            Manage and monitor all registered reviews
          </div>
        </div>
        <div className="review-badge">⬡ Admin Panel</div>
      </div>

      <div className="review-search-bar">
        <input
          className="review-search-input"
          placeholder="Search by name ..."
          value={search}
          _
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="review-filter-btn">↻ Refresh</button>
      </div>

      <div className="review-table-card">
        <table className="review-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Recipe</th>
              <th>Ratings</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((review, i) => (
              <tr key={review.id}>
                <td className="review-email">{review.id}</td>
                <td>
                  <div className="review-review-cell">
                    <img
                      src={review?.userId.image}
                      alt={review?.userId.fullName}
                      className="review-avatar"
                    />
                    <div>
                      <div className="review-review-name">
                        {review?.userId.fullName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="review-date">{review.recipeId.title}</td>
                <td className="review-date">{review.ratings}</td>
                <td className="review-date">{review.comment}</td>
                <td>
                  <div className="review-actions">
                    <button
                      className="review-btn review-btn-view"
                      onClick={handleView(review.id)}
                    >
                      View
                    </button>
                    <button
                      className="review-btn review-btn-del"
                      onClick={handleDelete(review.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="review-footer">
          <span>
            Showing {filtered.length} of {reviews.length} reviews
          </span>
          <div className="review-pagination">
            <button className="review-page-btn">‹</button>
            <button className="review-page-btn active">1</button>
            <button className="review-page-btn">2</button>
            <button className="review-page-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadAllReview;
