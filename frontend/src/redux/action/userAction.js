import { loginFail, loginRequest, loginSuccess } from "../reducer/userSlice";
import userApiService from "../../services/userApi/userApiService/service";

export const loginAction = (userData) => async (dispatch) => {
  const userService = new userApiService();
  try {
    dispatch(loginRequest());
    const { data } = await userService.loginUser(userData);
    console.log(data);
    dispatch(loginSuccess(data));
  } catch (err) {
    // console.log(err);
    dispatch(loginFail(err.response.message));
  }
};
