import expressAsyncHandler from "express-async-handler";

const handleSingleFileController = expressAsyncHandler(
  async (req, res, next) => {
    // write other code
    // console.log(req.file);
    let link = `http://localhost:8000/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      result: link,
    });
  },
);

export default handleSingleFileController;
