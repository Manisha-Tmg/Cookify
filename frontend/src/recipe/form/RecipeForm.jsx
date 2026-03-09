const RecipeForm = () => {
  return (
    <div className="mainn">
      <div>
        <label className="label1">Recipe Title:</label>
        <input className="input1" type="text"></input>
      </div>
      <div>
        <label className="label1">Recipe Image:</label>
        <input className="input1" type="file" />
      </div>
      <div>
        <label className="label1">Description:</label>
        <textarea className="input1"></textarea>
      </div>

      <div>
        <label className="label1">Instructions:</label>
        <textarea className="input1"></textarea>
      </div>

      <div className="cook">
        <label className="label1">Cooking Time:</label>
        <input className="in"></input>
      </div>
      <div className="recipe">
        <button className="post-recipe">Post Recipe</button>
      </div>
    </div>
  );
};

export default RecipeForm;
