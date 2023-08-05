import axios from "axios";
import { Form } from "react-router-dom";

const API_URL = "/api/files/";


// Delete files
const deleteFile = async (fileid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + fileid, config);
  return response.data;
};


const fileService = {
    deleteFile
};

export default fileService;
