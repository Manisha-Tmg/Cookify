import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config";
import Swal from "sweetalert2";
import BackBtn from "../../component/backBtn/BackBtn";

const MyReview = () => {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getData = async () => {
    const result = await axios({
      url: `${API}/user/my-review`,
      method: "get",
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    setReviews(result.data.result);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleView = (id) => {
    return () => {
      navigate(`/review/${id}`);
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
            url: `${API}/my-review/${id}`,
            method: "delete",
          });
          getData();
        }
      });
    };
  };
  return (
    <>
      {" "}
      <div className="main-div">
        <BackBtn label={"My Review"} />

        <div className="my-review-wrapper">
          <div className="my-review-header">
            <div className="my-review-table-card">
              <table className="my-review-table">
                <thead>
                  <tr>
                    <th>Id</th>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyReview;
