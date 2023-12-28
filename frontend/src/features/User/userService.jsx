import axios from "axios";

const register = async (userData) => {
  const response = await axios.post(`/api/newuser`, userData);
  if (response.data) {
    return response.data;
  }
};
const login = async (userData) => {
  const response = await axios.post(`/api/user/login`, userData);

  if (response.data) {
    return response.data;
  }
};
const myProfile = async () => {
  const response = await axios.get(`/api/user/myprofile`);
  if (response.data) {
    return response.data;
  }
};
const updateProfile = async (data) => {

  const response = await axios.put(`/api/user/edit-user`, data);
  if (response.data) {
    return response.data;
  }
};
const logout = async () => {
  const response = await axios.put(`/api//user/logout`);
  if (response.data) {
    return response.data;
  }
};
const forgotPassword = async (data) => {
  const config = {
    headers: { "Content-type": "application/json" },
  };
  const response = await axios.post(`/api/user/forgotpassword`, data, config);
  if (response.data) {
    return response.data;
  }
};
const resetPassword = async (data) => {
  const response = await axios.post(
    `/api/user/reset-password/${data.token}`,
    data
  );
  if (response.data) {
    return response.data;
  }
};
const updatePassword = async (data) => {
  const response = await axios.put(`/api/user/changepassword`, data);
  if (response.data) {
    return response.data;
  }
};
const userWishList = async () => {
  const response = await axios.get(`/api/user/wishlist`);
  if (response.data) {
    return response.data;
  }
};
const addCart = async (cart) => {
  const response = await axios.post(`/api/user/add-cart`, cart);
  if (response.data) {
    return response.data;
  }
};
const userCart = async (cart) => {
  const response = await axios.get(`/api/user/get-cart`);
  if (response.data) {
    return response.data;
  }
};
const deleteProductFromCart = async (cartID) => {
  const response = await axios.delete(`/api/user/delete/oneItem-cart`, {
    cartID,
  });
  if (response.data) {
    return response.data;
  }
};

const emptyCart = async()=>{
  const response = await axios.delete(`/api/user/empty-cart`)
  if(response.data){
    return response.data
  }
}
const updateQTCart = async (cart) => {
  const response = await axios.put(`/api/user/update/quantity`, {
    cartId: cart.cartId,
    quantity: cart.quantity,
  });
  if (response.data) {
    return response.data;
  }
};
const order = async (order) => {
  const response = await axios.post(`/api/user/create-order`, order);
  if (response.data) {
    return response.data;
  }
};
const myOrder = async () => {
  const response = await axios.get(`/api/user/myorders`);
  if (response.data) {
    return response.data;
  }
};

export const authService = {
  register,
  login,
  userWishList,
  addCart,
  userCart,
  deleteProductFromCart,
  updateQTCart,
  order,
  myOrder,
  myProfile,
  updateProfile,
  updatePassword,
  logout,
  forgotPassword,
  resetPassword,
  emptyCart
};
