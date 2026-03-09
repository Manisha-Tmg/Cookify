import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

const Rating = ({ value, max = 5 }) => {
  return (
    <div className="rating">
      {[...Array(max)].map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={i < value ? fullStar : emptyStar}
          style={{ color: "#FFD700", marginRight: "4px" }}
        />
      ))}
    </div>
  );
};

export default Rating;
