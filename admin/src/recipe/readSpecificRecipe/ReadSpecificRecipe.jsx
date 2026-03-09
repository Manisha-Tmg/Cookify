import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { api } from "../../config";
import RecipeList from "../../../../frontend/src/recipe/recipeDetails/Recipe";

const ReadSpecificRecipe = () => {
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
    <div className="profile-page">
      <header className="profile-header">
        <button className="back-button" onClick={() => window.history.back()}>
          ←
        </button>
        <h3>Profile</h3>
      </header>

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

export default ReadSpecificRecipe;
