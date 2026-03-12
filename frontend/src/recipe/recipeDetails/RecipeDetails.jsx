import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { API } from "../../config";
import RecipeList from "./Recipe";
import BackBtn from "../../component/backBtn/BackBtn";

const RecipeDetails = () => {
  const [recipes, setrecipes] = useState({});
  const [rating, setRating] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  const getData = async () => {
    const result = await axios({
      url: `${API}/recipe/${params.id}`,
      method: "GET",
    });
    setrecipes(result.data.result);
    setRating(result.data.review);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="main-div">
      <BackBtn label={"Recipe Details"} />
      <div className="recipe-container">
        <RecipeList
          id={recipes.id}
          title={recipes.title}
          ingredients={recipes.ingredients}
          instructions={recipes.instructions}
          description={recipes.description}
          image={recipes.image}
          ratings={rating[0]?.ratings}
          comment={rating[0]?.comment}
        />
      </div>
    </div>
  );
};

export default RecipeDetails;
