import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config";
import "../myRecipe/MyRecipe.css";
import Swal from "sweetalert2";
import BackBtn from "../../component/backBtn/BackBtn";

const MyRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getData = async () => {
    const result = await axios({
      url: `${API}/user/my-recipe`,
      method: "get",
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    setRecipes(result.data.result);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleView = (id) => {
    return () => {
      navigate(`/recipe/${id}`);
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
            url: `${API}/my-recipe/${id}`,
            method: "delete",
          });
          getData();
        }
      });
    };
  };
  return (
    <div className="main-div">
      <BackBtn label={"My Recipe"} />

      <div className="my-recipe-wrapper">
        <div className="my-recipe-header">
          <div className="my-recipe-table-card">
            <table className="my-recipe-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>UpdatedAt</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe, i) => (
                  <tr key={recipe.id}>
                    <td className="my-recipe-email">{recipe.id}</td>
                    <td>
                      <div className="my-recipe-my-recipe-cell">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="my-recipe-avatar"
                        />
                        <div>
                          <div className="my-recipe-my-recipe-name">
                            {recipe.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="my-recipe-date">{recipe.updatedAt}</td>
                    <td>
                      <div className="my-recipe-actions">
                        <button
                          className="my-recipe-btn my-recipe-btn-view"
                          onClick={handleView(recipe.id)}
                        >
                          View
                        </button>
                        <button
                          className="my-recipe-btn my-recipe-btn-del"
                          onClick={handleDelete(recipe.id)}
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
  );
};
export default MyRecipe;
