import { Route, Routes } from "react-router-dom";
import AboutUs from "./aboutUs/AboutUs";
import Home from "./home/Home";
import UserForm from "./user/form/UserForm";
import UserLogin from "./user/userLogin/UserLogin";
import MyProfile from "./user/myProfile/MyProfile";
import VerifyUser from "./user/verifyUser/VerifyUser";
import AddRecipe from "./recipe/form/AddRecipe";
import RecipeDetails from "./recipe/recipeDetails/RecipeDetails";
import ReadAllRecipe from "./recipe/readAllRecipe/ReadAllRecipe";
import ChangePassword from "./user/resetPassword/ChangePassword";
import ForgotPassword from "./user/forgotPassword/ForgotPassword";
import ResetPassword from "./user/resetPassword/ResetPassword";
import MyRecipe from "./user/myRecipe/MyRecipe";
import ReviewForm from "./review/form/ReviewForm";
import MyForm from "./user/form/Myform";
import PageNotFound from "./pageNotFound/PageNotFound";

const MyRoute = () => {
  return (
    <div>
      <Routes>
        <Route>
          <Route path={""} element={<Home />}></Route>
          <Route path="user">
            <Route path={"about-us"} element={<AboutUs />}></Route>
            <Route path={"verify-user"} element={<VerifyUser />}></Route>
            <Route path={"login"} element={<UserLogin />}></Route>
            <Route path={"my-profile"} element={<MyProfile />}></Route>
            <Route path={"my-recipe"} element={<MyRecipe />}></Route>{" "}
            <Route
              path={"change-password"}
              element={<ChangePassword />}
            ></Route>
            <Route
              path={"forgot-password"}
              element={<ForgotPassword />}
            ></Route>
            <Route path={"reset-password"} element={<ResetPassword />}></Route>
            <Route
              path={"register"}
              element={<UserForm type={"create"} />}
            ></Route>
            <Route
              path={"update-profile"}
              element={<UserForm type={"update"} />}
            ></Route>
          </Route>

          <Route path="recipe">
            <Route index element={<ReadAllRecipe />}></Route>
            <Route path={"add-recipe"} element={<AddRecipe />}></Route>
            <Route path={":id"} element={<RecipeDetails />}></Route>{" "}
            <Route path={"create/:id"} element={<ReviewForm />}></Route>
            <Route path={"update/:id"} element={<AddRecipe />}></Route>
          </Route>
          <Route path="review">
            {/* <Route index element={<ReadAllReview />}></Route> */}
            {/*  <Route path={":id"} element={<ReviewDetails />}></Route>
            <Route path={"update/:id"} element={<ReviewForm />}></Route> */}
          </Route>
        </Route>

        <Route path={"*"} element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
};

export default MyRoute;
