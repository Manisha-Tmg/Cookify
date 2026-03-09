import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../readAllRecipe/ReadAllRecipe.css";
import Swal from "sweetalert2";
import { api } from "../../config";

const ReadAllrecipe = () => {
  const [recipes, setrecipes] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const getData = async () => {
    const result = await axios({
      url: `${api}/recipe`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setrecipes(result.data.result);
  };

  useEffect(() => {
    getData();
  }, []);

  const filtered = recipes.filter((u) =>
    u.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const handleView = (id) => {
    return () => {
      navigate(`/admin/recipe-details/${id}`);
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
            url: `${api}/recipe/${id}`,
            method: "delete",
          });
          getData();
        }
      });
    };
  };
  return (
    <div className="recipe-wrapper">
      <div className="recipe-header">
        <div>
          <div className="recipe-title">
            Recipe <span>Registry</span>
          </div>
          <div className="recipe-subtitle">
            Manage and monitor all registered recipes
          </div>
        </div>
        <div className="recipe-badge">⬡ Admin Panel</div>
      </div>

      <div className="recipe-search-bar">
        <input
          className="recipe-search-input"
          placeholder="Search by name ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="recipe-filter-btn">↻ Refresh</button>
      </div>

      <div className="recipe-table-card">
        <table className="recipe-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>UpdatedAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((recipe, i) => (
              <tr key={recipe.id}>
                <td className="recipe-email">{recipe.id}</td>
                <td>
                  <div className="recipe-recipe-cell">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="recipe-avatar"
                    />
                    <div>
                      <div className="recipe-recipe-name">{recipe.title}</div>
                    </div>
                  </div>
                </td>
                <td className="recipe-date">{formatDate(recipe.updatedAt)}</td>
                <td>
                  <div className="recipe-actions">
                    <button
                      className="recipe-btn recipe-btn-view"
                      onClick={handleView(recipe.id)}
                    >
                      View
                    </button>
                    <button
                      className="recipe-btn recipe-btn-del"
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
        <div className="recipe-footer">
          <span>
            Showing {filtered.length} of {recipes.length} recipes
          </span>
          <div className="recipe-pagination">
            <button className="recipe-page-btn">‹</button>
            <button className="recipe-page-btn active">1</button>
            <button className="recipe-page-btn">2</button>
            <button className="recipe-page-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadAllrecipe;
