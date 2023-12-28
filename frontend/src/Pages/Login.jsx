import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/User/userSlice";
import CustomInput from "../components/CustomInput";

const userSchema = yup.object({
  email: yup
    .string()
    .nullable()
    .email("Please enter the email")
    .required("Please enter valid email id"),

  password: yup.string().required("Please enter the password"),
});

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.authState.user.user);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <BreadCrumb title={"Login"} />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Login</h3>
                <form
                  className="d-flex flex-column gap-15"
                  action=""
                  onSubmit={formik.handleSubmit}
                >
                  <CustomInput
                    type="text"
                    name="email"
                    placeholder="Email Id"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>

                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />

                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>
                  <div className="mt-3 ms-3">
                    <Link to="/forgot-password">Forgot Password</Link>
                  </div>
                  <div className="d-flex mt-3 justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
