import axios from "axios";

const allBlogs = async () => {
  const response = await axios.get(`/api/blog`);
  if (response.data) {
    return response.data;
  }
};
const singleBlog = async (id) => {
  const response = await axios.get(`/api/blog/${id}`);
  if (response.data) {
    return response.data;
  }
};

export const blogService = {
  allBlogs,
  singleBlog,
};
