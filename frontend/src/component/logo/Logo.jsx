import food from "../../assets/food.png";
const Logo = () => {
  return (
    <div className="left-container">
      <img src={food} alt="Cooking Inc." className="flogo" />
      <div className="logo1">C</div>
      <div className="logo2">OO</div>
      <div className="logo">kify</div>
    </div>
  );
};
export default Logo;
