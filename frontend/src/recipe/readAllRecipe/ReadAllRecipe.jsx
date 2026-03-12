import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { API } from "../../config";
import Card from "../../component/card/Card";
import BackBtn from "../../component/backBtn/BackBtn";

const ReadAllRecipe = () => {
  const [recipes, setrecipes] = useState([]);
  const [review, setReview] = useState([]);

  const getData = async () => {
    const result = await axios({
      url: `${API}/recipe`,
      method: "GET",
    });
    setrecipes(result.data.result);
    setReview(result.data.review);
    console.log(result.data.review);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main-div">
      <BackBtn label={"Recipe"} />

      <div className="cards-row">
        {recipes.map((item) => {
          const recipeReview = review.find((r) => r.recipeId?.id === item.id);

          return (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              id={item.id}
              ratings={recipeReview?.rating}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ReadAllRecipe;
