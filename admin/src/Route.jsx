import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./dashboard/AdminDashboard";
import ReadAllUser from "./user/readAllUser/ReadAllUser";
import ReadSpecificRecipe from "./recipe/readSpecificRecipe/ReadSpecificRecipe";
import ReadSpecificUser from "./user/readSpecificUser/ReadSpecificUser";
import ReadAllrecipe from "./recipe/readAllRecipe/ReadAllRecipe";
import ReadAllReview from "./review/readAllReview/ReadAllReview";
import ReadSpecificReview from "./review/readSpecificReview/ReadSpecificRecipe";
import Login from "./adminLogin/Login";
import AdminForm from "./form/AdminForm";

const MyRoute = () => {
  return (
    <div>
      <Routes>
        <Route>
          <Route path="admin">
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<AdminForm />}></Route>
            <Route path="dashboard" element={<AdminDashboard />}></Route>
            <Route path={"users"} element={<ReadAllUser />}></Route>
            <Route path={"recipe"} element={<ReadAllrecipe />}></Route>
            <Route path={"review"} element={<ReadAllReview />}></Route>
            <Route
              path={"review-details/:id"}
              element={<ReadSpecificReview />}
            ></Route>
            <Route
              path={"user-details/:id"}
              element={<ReadSpecificUser />}
            ></Route>
            <Route
              path={"recipe-details/:id"}
              element={<ReadSpecificRecipe />}
            ></Route>
          </Route>
        </Route>
        <Route path={"*"} element={<div>Page Not Found</div>}></Route>
      </Routes>
    </div>
  );
};

export default MyRoute;
