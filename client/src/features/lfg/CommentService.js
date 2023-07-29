import axios from "axios";
const API_URL = "/api/lfg/";

// Create comment
export const createComment = async (content, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL + content.post_pid + "/comments", content, config);
    return response.data;
  };

// Get comments by postId
export const getComments = async (postId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + postId +"/comments", config);
    return response.data;
  };

// Update comment
export const updateComment = async (content, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(API_URL + content.post_id +"/comments/" + content.comment_id, content, config);
    return response.data;
  };

// Delete Comment
export const deleteComment = async (content, token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + content.post_id + "/comments/" + content.comment_id, config);
    return response.data;
};

// export default {
//     createComment,
//     getComments,
//     updateComment,
//     // deleteComment,
// };