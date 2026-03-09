import Rating from "../rating/Rating";
import "../recipeDetails/Recipedetails.css";

const RecipeList = ({
  title,
  ingredients = [],
  instructions = [],
  image,
  description,
  ratings,
  comment,
}) => {
  return (
    <div className="page">
      <div className="recipe-card">
        <div className="image-wrapper">
          <img src={image} alt={title} className="recipe-image" />
        </div>

        <div className="content">
          <h2 className="title">{title}</h2>
          <p className="description">{description}</p>
          <Rating value={ratings} />
          <h2>Ingredients ({ingredients.length})</h2>
          <ul className="ingredients">
            {ingredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <h2>Instructions </h2>
          <ul className="instructions">
            {instructions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
