import axios from "axios";

const getProducts = async (data) => {
  const response = await axios.get(
    `/api/product?${data?.sort ? `sort=${data.sort}&&` : ""}${
      data?.brand ? `brand=${data.brand}&&` : ""
    }${data?.tag ? `tags=${data.tag}&&` : ""}${
      data?.category ? `category=${data.category}&&` : ""
    }${data?.minPrice ? `price[gte]=${data.minPrice}&&` : ""}${
      data?.maxPrice ? `price[lte]=${data.maxPrice}&&` : ""
    }${data?.search ? `search=${data.search}&&` : ""}`
  );
  if (response.data) {
    return response.data;
  }
};
const addToWishlist = async (prodId) => {
  const response = await axios.put(`/api/product/wishlist`, { prodId });
  if (response.data) {
    return response.data;
  }
};

const singleProduct = async (prodId) => {
  const response = await axios.get(`/api/product/${prodId}`);
  if (response.data) {
    return response.data;
  }
};

const rating = async (data) => {
  const response = await axios.put(`/api/product/rating`, data);
  if (response.data) {
    return response.data;
  }
};

const search = async(data)=>{
  const response = await axios.get(`/api/product/search`,data);
  if(response.data){
    return response.data
  }
}

export const productService = {
  getProducts,
  addToWishlist,
  singleProduct,
  rating,
  search
};
