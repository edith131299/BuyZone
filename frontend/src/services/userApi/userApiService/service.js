import axios from "../userApiConfig/config";

class userApiService {
  loginUser(userData) {
    return axios.post("/user/login", userData);
  }
}

export default userApiService;
