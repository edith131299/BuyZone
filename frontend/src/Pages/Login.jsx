import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/User/userSlice";
import CustomInput from "../components/CustomInput";
import Container from "../components/Container";

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
      <Container class1=" mt-12 py-5 flex justify-center mb-10 ">
        <div className="bg-white w-[500px]  rounded-lg p-3 px-6 max-sm:w-[320px] max-sm:text-xs  ">
          <h3 className="text-center  p-4  font-medium text-[#777]   ">
            Login
          </h3>
          <form
            className="flex flex-col gap-4"
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

            <Link
              className="mt-2 text-[#1c1c1b] font-normal text-sm"
              to="/forgot-password"
            >
              Forgot Password
            </Link>

            <div className="flex mt-3 justify-center items-center gap-5 text-sm max-sm:text-xs">
              <button type="submit" className="rounded-3xl font-medium bg-blue text-white py-3 px-6 text-center  mb-7 hover:bg-yellow hover:text-black">
                Login
              </button>
              <Link to="/signup" className="rounded-3xl font-normal bg-yellow text-black py-3 px-6 text-center  mb-7 hover:bg-blue hover:text-white">
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
