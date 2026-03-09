import img from "../assets/Food-Plate.png";
import "../aboutUs/About.css";
import BackBtn from "../component/backBtn/BackBtn";

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1 className="h1">
        About <p className="h">Us</p>
      </h1>
      <div className="about">
        <p className="ptag">
          Welcome to Cookify, your ultimate destination for celebrating the joy
          of cooking and creating a positive impact on lives around the world.
          At Cookify, we believe that cooking is more than just a daily routine
          it's a powerful means of expression, connection, and well-being. Our
          platform is dedicated to empowering home cooks of all levels to
          explore their culinary creativity, share their knowledge, and inspire
          one another in a vibrant, global community.
          <br></br>
          <br></br>
          Our mission at Cookify is simple: to foster a thriving community where
          cooking is embraced as a gateway to a happier and healthier life. We
          are passionate about the art of cooking and its ability to bring
          people together, nourish both body and soul, and create lasting
          memories. Whether you're a seasoned chef or just starting out in the
          kitchen, Cookify is here to support your culinary journey with a
          wealth of recipes, tips, and insights from fellow food enthusiasts.
          <br></br>
          <br></br>
          At Cookify, we understand that cooking is a universal language that
          transcends borders and cultures. It’s an activity that connects
          individuals, strengthens communities, and contributes to a more
          sustainable planet. By sharing recipes, techniques, and experiences,
          our members contribute to a collective knowledge base that enhances
          everyone's culinary skills and fosters a deeper appreciation for the
          joys of home cooking.
          <br></br>
          <br></br>
          Cookify is more than just a recipe-sharing platform it's a place where
          every dish tells a story and every meal is an opportunity to create
          joy. We invite you to join our community, where you can discover new
          recipes, master cooking techniques, and share your own culinary
          adventures with like-minded individuals. Together, we can craft
          unforgettable moments in the kitchen and beyond, enriching our lives
          and the lives of those around us. At Cookify, we are excited to be a
          part of your culinary journey. Let's cook, create, and celebrate the
          joy of cooking, one meal at a time.
        </p>
        <img className="img" src={img} alt=""></img>
      </div>
    </div>
  );
};

export default AboutUs;
