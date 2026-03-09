import { Link } from "react-router-dom";
import Chef from "../assets/main_img.png";
import "./Home.css";

const Home = () => {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h3 className="highlight">
          Get Fresh <span>Food</span> <br></br>in a Easy Way{" "}
        </h3>
        <p className="p">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
          reiciendis quaerat nobis deleniti amet non inventore. Reprehenderit
          recusandae voluptatibus minus tenetur itaque numquam cum quos dolorem
          maxime. Quas, quaerat nisi. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Cumque facilis, quaerat cupiditate nulla quibusdam
          quo sunt esse tempore inventore vel voluptate, amet laudantium
          adipisci veniam nihil quam molestiae omnis mollitia.
        </p>
        <Link to={"/recipe"}>
          <button>Explore All Recipes</button>
        </Link>
      </div>
      <div className="main_image">
        <img src={Chef} alt="Chef" />
      </div>
    </section>
  );
};

export default Home;
