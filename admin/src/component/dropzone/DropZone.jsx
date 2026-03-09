import axios from "axios";
import "../dropzone/DropZone.css";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { api } from "../../config";

const DropZone = ({ image, setImage }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    // hit app
    // gives link
    //

    let formData = new FormData();
    formData.append("docs", acceptedFiles[0]);
    try {
      let result = await axios({
        url: `${api}/file/single`,
        method: "post",
        data: formData,
      });
      setImage(result.data.result);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div {...getRootProps()} className="drop-img">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {image ? <img src={image} alt="Image" /> : null}
    </div>
  );
};

export default DropZone;
