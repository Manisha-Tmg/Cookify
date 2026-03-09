// make express app
// attach port to it

import { json } from "express";
import { port } from "./src/config.js";
import express from "express";
import recipeRouter from "./src/Routes/recipeRouter.js";
import userRouter from "./src/Routes/userRouter.js";
import reviewRouter from "./src/Routes/reviewRouter.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import pageNotFound from "./src/middleware/pageNotFound.js";
import connectToDb from "./src/connectToDb/connectToDb.js";
import fileRouter from "./src/Routes/fileRouter.js";
import cors from "cors";
import totalCountRouter from "./src/Routes/totalCountRouter.js";
import adminRouter from "./src/Routes/adminRouter.js";

// alt+shift+o= remove unused imports

let app = express();

app.listen(port, () => {
  console.log(`<---- Apllication is listening at ${port} ---->`);
  connectToDb();
});
app.use(express.static("public"));

app.use(json()); //make our system capable to take json data , always place it at top
app.use(cors());
app.u;

app.use("/recipe", recipeRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/review", reviewRouter);
app.use("/total-counts", totalCountRouter);
app.use("/file", fileRouter);

// url middleware
app.use("/", pageNotFound);

// error middleware
app.use(errorMiddleware);
