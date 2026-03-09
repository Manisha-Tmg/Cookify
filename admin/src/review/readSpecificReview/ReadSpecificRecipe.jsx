import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { api } from "../../config";
// import ReviewList from "../../../../frontend/src/review/Review";

const ReadSpecificReview = () => {
  const [reviews, setreviews] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  const getData = async () => {
    const result = await axios({
      url: `${api}/review/${params.id}`,
      method: "GET",
    });
    setreviews(result.data.result);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="profile-page">
      <header className="profile-header">
        <button className="back-button" onClick={() => window.history.back()}>
          ←
        </button>
        <h3>Profile</h3>
      </header>

      {/* <ReviewList
        title={reviews.title}
        ingredients={reviews.ingredients}
        instructions={reviews.instructions}
        description={reviews.description}
        image={reviews.image}
      /> */}
    </div>
  );
};

export default ReadSpecificReview;
