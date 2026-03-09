import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import RecipeList from "../../recipe/recipeDetails/Recipe";
import "../myRecipe/MyRecipe.css";

const MySpecificRecipe = () => {
  const [recipes, setrecipes] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  const getData = async () => {
    const result = await axios({
      url: `${api}/recipe/${params.id}`,
      method: "GET",
    });
    setrecipes(result.data.result);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <RecipeList
        title={recipes.title}
        ingredients={recipes.ingredients}
        instructions={recipes.instructions}
        description={recipes.description}
        image={recipes.image}
      />
    </div>
  );
};

export default MySpecificRecipe;
