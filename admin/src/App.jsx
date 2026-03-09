import "./App.css";
import SideBar from "./component/sideBar/SideBar";
import MyRoute from "./Route";

function App() {
  return (
    <>
      <div className="layout">
        <SideBar />
        <div className="main-content">
          <MyRoute />
        </div>
      </div>
    </>
  );
}

export default App;
