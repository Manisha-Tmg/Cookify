import "../button/Button.css";

const Button = ({ label, onClick }) => {
  return (
    <div className="form-container">
      <button className="post-recipe" onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default Button;
