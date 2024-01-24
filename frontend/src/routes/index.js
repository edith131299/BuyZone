import About from "../Pages/About";
import Blog from "../Pages/Blog";
import Cart from "../Pages/Cart";
import Checkout from "../Pages/Checkout";
import Contact from "../Pages/Contact";
import EditProfile from "../Pages/EditProfile";
import ForgotPassword from "../Pages/ForgotPassword";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import MyOrders from "../Pages/MyOrders";
import MyProfile from "../Pages/MyProfile";
import OurStore from "../Pages/OurStore";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import RefundPolicy from "../Pages/RefundPolicy";
import ResetPassword from "../Pages/ResetPassword";
import ShippingPolicy from "../Pages/ShippingPolicy";
import SignUp from "../Pages/SignUp";
import SingleBlog from "../Pages/SingleBlog";
import SingleProduct from "../Pages/SingleProduct";
import TermAndCondition from "../Pages/TermAndCondition";
import UpdatePassword from "../Pages/UpdatePassword";
import WishList from "../Pages/WishList";
import { PrivateRoute } from "./privateRoute";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "products",
    element: <OurStore />,
  },
  {
    path: "product/:id",
    element: <SingleProduct />,
  },
  {
    path: "blogs",
    element: <Blog />,
  },
  {
    path: "my-orders",
    element: (
      <PrivateRoute>
        <MyOrders />
      </PrivateRoute>
    ),
  },
  {
    path: "blog/:id",
    element: <SingleBlog />,
  },

  {
    path: "wishlist",
    element: (
      <PrivateRoute>
        <WishList />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/myprofile",
    element: (
      <PrivateRoute>
        <MyProfile />
      </PrivateRoute>
    ),
  },

  {
    path: "/myprofile/update",
    element: (
      <PrivateRoute>
        <EditProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PrivateRoute>
        <ForgotPassword />
      </PrivateRoute>
    ),
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/user/resetpassword/:token",
    element: <ResetPassword />,
  },
  {
    path: "/changePassword",
    element: (
      <PrivateRoute>
        <UpdatePassword />
      </PrivateRoute>
    ),
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/refund-policy",
    element: <RefundPolicy />,
  },
  {
    path: "/shipping-policy",
    element: <ShippingPolicy />,
  },
  {
    path: "/terms&condition",
    element: <TermAndCondition />,
  },
  {
    path: "/cart",
    element: (
      <PrivateRoute>
        <Cart />
      </PrivateRoute>
    ),
  },
  {
    path: "/cart/checkout",
    element: <Checkout />,
  },
];
