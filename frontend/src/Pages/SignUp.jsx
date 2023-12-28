import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/User/userSlice";
import { useNavigate } from "react-router-dom";
import PreviewImage from "../utils/previewImage";

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
      (value) => value && ["image/png/","image/jpg","image/jpeg"].includes(value.type)
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
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-4 mt-3">Create Account</h3>
                <form
                  className="d-flex flex-column gap-15"
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

                  <div className="d-flex form-control align-items-center mt-3 py-4 gap-5  ">
                  <figure className="avatar mr-3 item-rtl">
                      {formik.values.avatar && (
                        <PreviewImage file={formik.values.avatar} />
                      )}
                    </figure>
                    <input
                      type="file"
                      label="Choose Avatar"
                      name="avatar"
                      hidden
                      ref={fileRef}
                      onChange={(e) =>
                        formik.setFieldValue("avatar", e.target.files[0])
                      }
                    />
                    <button
                      className="border p-1 bg-body-tertiary text-secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        fileRef.current.click();

                      }}
                    >
                      Upload
                    </button>
                  </div>

                  <div className="error">
                    {formik.touched.avatar && formik.errors.avatar}
                  </div>

                  <div className="d-flex mt-3 justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Sign Up
                    </button>
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

export default SignUp;
