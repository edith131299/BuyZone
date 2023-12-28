import Loader from "../Pages/Utils/loader";

const { useSelector } = require("react-redux");
const { Navigate } = require("react-router-dom");

export const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.authState.user);

  const { isLoading ,isAuthenticated} = useSelector((state) => state.authState);

 
  // if (isLoading) {
  //   return <Loader />;
  // }

  if (!isAuthenticated && isLoading === false ) {
    return <Navigate to="/login" />;
  }
  else{
    return children
  }
 
};
