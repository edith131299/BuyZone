import React, { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import { routes } from "./routes";
import { getMyProfile } from "./features/User/userSlice";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);
  return (
    <>
      <HelmetProvider>
        <Router>
          <Header />
          <Routes>
            {routes.map((path, index) => (
              <Route key={index} path={path.path} element={path.element} />
            ))}
          </Routes>
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
        </Router>
      </HelmetProvider>
    </>
  );
}

export default App;
