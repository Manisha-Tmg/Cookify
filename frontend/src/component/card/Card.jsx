import { useNavigate } from "react-router-dom";
import img from "../../assets/Chicken.jpg";
import "../card/Card.css";
import Rating from "../rating/Rating";

const Card = ({ image, title, description, id, ratings }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    return () => {
      navigate(`/recipe/${id}`);
    };
  };

  return (
    <div className="card-container">
      <div className="card-image-wrapper">
        <img src={image} alt="Pasta" className="card-img" />
        <h3 className="card-title">{title}</h3>
        <Rating value={ratings} />
        <p className="card-description">{description}</p>
      </div>
      <div>
        <button className="card-btn" onClick={handleView(id)}>
          See More
        </button>
      </div>
    </div>
  );
};

export default Card;
