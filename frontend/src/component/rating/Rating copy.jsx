import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

const Rating = ({ value = 0, max = 5, onChange }) => {
  const [rating, setRating] = useState(value);

  const handleClick = (val) => {
    setRating(val);
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div className="rating">
      {[...Array(max)].map((_, i) => {
        const starValue = i + 1;

        return (
          <FontAwesomeIcon
            key={i}
            icon={starValue <= rating ? fullStar : emptyStar}
            onClick={() => handleClick(starValue)}
            style={{
              color: "#FFD700",
              marginRight: "4px",
              cursor: "pointer",
            }}
          />
        );
      })}
    </div>
  );
};

export default Rating;
