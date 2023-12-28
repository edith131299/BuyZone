import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/inject-style";

export default function Layouts() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
