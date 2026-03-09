import { Router } from "express";
import upload from "../utils/upload.js";
import handleSingleFileController from "../controllers/filecontroller.js";

const fileRouter = Router();

fileRouter
  .route("/single")
  .post(upload.single("docs"), handleSingleFileController);

export default fileRouter;

/* 

locahost:8000/file/single
    send file 
    stor file in public 
    send link of that file to postman

*/
