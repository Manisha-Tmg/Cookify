import React, { useState } from "react";
import Rating from "../../component/rating/Rating";
import axios from "axios";
import { API } from "../../config";
import { resume } from "react-dom/server";
import { useParams } from "react-router-dom";

const ReviewForm = () => {
  const [rating, setRating] = useState("");
  const [recipeId, setRecipeId] = useState(null);
  const [comment, setComment] = useState("");
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("id");
  const { id } = useParams();
  const data = {
    userId: userId,
    recipeId: id,
    rating: rating,
    comment: comment,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios({
      url: `${API}/review`,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Rating value={rating} onChange={setRating} />
      <textarea
        placeholder="Write comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
