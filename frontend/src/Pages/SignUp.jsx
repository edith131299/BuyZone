import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/User/userSlice";
import { useNavigate } from "react-router-dom";
import PreviewImage from "../utils/previewImage";
import Container from "../components/Container";

const signUpSchema = yup.object({
  firstName: yup.string().required("Please enter the First Name"),
  lastName: yup.string().required("Please enter the Last Name"),
  email: yup.string().nullable().email("Please enter the email"),
  mobile: yup.string().required("Please enter the mobile"),
  password: yup.string().required("Please enter the password"),
  avatar: yup
    .mixed()
    .required("Required")
    .test(
      "FILE_TYPE",
      "INVALID!",
      (value) =>
        value && ["image/png/", "image/jpg", "image/jpeg"].includes(value.type)
    ),
});

const SignUp = () => {
  const dispatch = useDispatch();

  const fileRef = useRef();

  const authState = useSelector((state) => state.authState);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      avatar: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("password", values.password);
      formData.append("avatar", values.avatar);
      dispatch(registerUser(formData));
    },
  });

  useEffect(() => {
    if (authState?.user?.user?._id && authState.isError === false) {
      navigate("/");
    }
  }, [authState]);
  return (
    <>
      <BreadCrumb title={"Sign Up"} />

      <Container class1="mt-12 py-5 flex justify-center mb-10">
        <div className="bg-white w-[500px]  rounded-lg p-3 px-6 max-sm:w-[320px] max-sm:text-xs  ">
          <h3 className="text-center  p-4  font-medium text-[#777]   ">
            Create Account
          </h3>

          <form
            className="flex flex-col gap-4"
            action=""
            onSubmit={formik.handleSubmit}
          >
            <CustomInput
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange("firstName")}
              onBlur={formik.handleBlur("firstName")}
            />

            <div className="error">
              {formik.touched.firstName && formik.errors.firstName}
            </div>

            <CustomInput
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange("lastName")}
              onBlur={formik.handleBlur("lastName")}
            />

            <div className="error">
              {formik.touched.lastName && formik.errors.lastName}
            </div>
            <CustomInput
              type="telphone"
              name="mobile"
              placeholder="Mobile Number"
              value={formik.values.mobile}
              onChange={formik.handleChange("mobile")}
              onBlur={formik.handleBlur("mobile")}
            />

            <div className="error">
              {formik.touched.mobile && formik.errors.mobile}
            </div>
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

            <div>
              <label
                className="p-3 rounded-md w-full outline-none"
                htmlFor="avatar_upload"
              >
                Avatar
              </label>

              <div className="flex  items-center mt-1 py-4 gap-7">
                <div className="flex items-center">
                  <figure className="w-16 h-16 	">
                    {<PreviewImage file={formik.values.avatar} />}
                  </figure>
                </div>

                <div className="flex items-center border border-gray-300 gap-12 rounded">
                  <label
                    htmlFor="customFile"
                    className="cursor-pointer bg-blue-500 text-black py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Choose Avatar
                  </label>

                  <input
                    type="file"
                    label="Choose Avatar"
                    name="avatar"
                    id="customFile"
                    className="hidden"
                    ref={fileRef}
                    onChange={(e) =>
                      formik.setFieldValue("avatar", e.target.files[0])
                    }
                  />

                  <label
                    className="bg-gray-200 text-gray-500 p-2 rounded-r w-32 text-center cursor-pointer hover:bg-gray-300"
                    htmlFor="customFile"
                  >
                    Browse
                  </label>
                </div>
              </div>
            </div>

            <div className="error">
              {formik.touched.avatar && formik.errors.avatar}
            </div>

            <div className="flex mt-3 justify-center items-center gap-5 text-sm max-sm:text-xs">
              <button
                type="submit"
                className="rounded-3xl font-normal bg-yellow text-black py-3 px-6 text-center  mb-7 hover:bg-blue hover:text-white"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
