import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../config";
import Input from "../../component/input/Input";
import DropZone from "../../component/dropzone/DropZone";
import Textarea from "../../component/textArea/Textarea";
import Button from "../../component/button/Button";
import BackBtn from "../../component/backBtn/BackBtn";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to add a recipe");
      return;
    }

    const instructionArray = instructions
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const ingredientsArray = ingredients
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const data = {
      title: title,
      image: image,
      description: description,
      instructions: instructionArray,
      ingredients: ingredientsArray,

      // cookingTime: cookingTime,
    };
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", ingredientsArray.join("\n"));
    formData.append("instructions", instructionArray.join("\n"));
    if (image) formData.append("image", image);

    try {
      const result = await axios({
        url: `${API}/recipe`,
        method: "post",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle("");
      setImage("");
      setDescription("");
      setInstructions("");
      setIngredients("");
      navigate("/recipe");
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="main-div">
        <BackBtn label={"Add Recipe"} />

        <Input
          label="Recipe Title :"
          id="recipeTitle"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <DropZone setImage={setImage} image={image} />

        <Textarea
          label="Description :"
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <Textarea
          label="Ingredients :"
          id="ingredients"
          value={ingredients}
          onChange={(e) => {
            setIngredients(e.target.value);
          }}
        />

        <Textarea
          label="Instructions :"
          id="instructions"
          value={instructions}
          onChange={(e) => {
            setInstructions(e.target.value);
          }}
        />
      </div>
      <div>
        <Button label={"Post recipe"} />
      </div>
    </form>
  );
};

export default AddRecipe;
