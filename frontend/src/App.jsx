import { createContext } from "react";
import NavBar from "./component/navbar/NavBar";
import "./index.css";
import MyRoute from "./Route";
import Footer from "./component/footer/Footer";

export const globalVariable = createContext("token");

function App() {
  return (
    <>
      <NavBar />
      <MyRoute />

      {/* <Footer /> */}
    </>
  );
}

export default App;
