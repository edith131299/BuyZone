const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null
        ? getTokenFromLocalStorage.refreshToken
        : ""
    }`,
    Accept: "application/json",
  },
};
