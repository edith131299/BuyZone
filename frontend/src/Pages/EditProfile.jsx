import React, { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { profileUpdate } from "../features/User/userSlice";
import PreviewImage from "../utils/previewImage";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";


const updateSchema = yup.object({
  firstName: yup.string().required("Please enter the First Name"),
  lastName: yup.string().required("Please enter the Last Name"),
  email: yup.string().nullable().email("Please enter the email"),
  mobile: yup.string().required("Please enter the mobile"),
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

const EditProfile = () => {
  const { user } = useSelector((state) => state.authState.user);
  const { isSuccess } = useSelector((state) => state.authState);

  const fileRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      mobile: user?.mobile,
      avatar: "",
    },
    validationSchema: updateSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("avatar", values.avatar);
      dispatch(profileUpdate(formData));
      if (isSuccess) {
        navigate("/myProfile");
      }
    },
  });

  // useEffect(() => {
  //   if (authState?.isSuccess===true && authState.isError === false) {
  //     navigate("/myprofile");
  //   }
  // }, [authState]);

  return (
    <Container class1=" py-5 my-5">
      <div
        className="flex justify-center px-5 "
        
      >
        <form
          onSubmit={formik.handleSubmit}
          className="shadow-xl w-2/5 px-7 py-4 my-5 bg-white rounded flex flex-col justify-evenly max-sm:w-[90%] max-sm:text-sm"
          encType="multipart/form-data "
        >
          <h1 className="text-3xl font-medium mt-5 mb-5 max-sm:text-2xl">Update Profile</h1>

          <div className="flex flex-col gap-4 mt-3 justify-center ">
            <label htmlFor="firstname_field">First Name</label>

            <CustomInput
              type="text"
              id="firstname_field"
              className="form-control"
              name="firtstName"
              value={formik.values.firstName}
              onChange={formik.handleChange("firstName")}
              onBlur={formik.handleBlur("firstName")}
            />

            <div className="error">
              {formik.touched.firstName && formik.errors.firstName}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-3 justify-center  ">
            <label htmlFor="lastName_field">Last Name</label>

            <CustomInput
              type="text"
              id="lastName_field"
              className="form-control"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange("lastName")}
              onBlur={formik.handleBlur("lastName")}
            />

            <div className="error">
              {formik.touched.lastName && formik.errors.lastName}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-3 justify-center ">
            <label htmlFor="email_field">Email</label>
            <CustomInput
              type="text"
              id="email_field"
              className="form-control"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />

            <div className="error">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-3 justify-center ">
            <label htmlFor="number">Mobile</label>
            <CustomInput
              type="telphone"
              id="number"
              className="form-control"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange("mobile")}
              onBlur={formik.handleBlur("mobile")}
            />

            <div className="error">
              {formik.touched.mobile && formik.errors.mobile}
            </div>
          </div>

          <div className="flex flex-col ">

            <label htmlFor="avatar">Avatar</label> 

            <div className="flex items-center px-1 py-2    mt-3  border">

              <div>

                <figure className="h-16 w-16 inline-block mx-4  mr-3 ">
                  {formik.values?.avatar && (
                    <PreviewImage file={formik.values.avatar} />
                  )}
                </figure>

              </div>

              <div>
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
                  Change Profile
                </button>
              </div>

            </div>

          </div>

          <div className="error">
            {formik.touched.avatar && formik.errors.avatar}
          </div>

          <button type="submit" className="rounded-3xl font-normal bg-yellow text-black py-3 px-6 text-center  my-8 hover:bg-blue hover:text-white  felx mx-[30%] ">
            Update
          </button>
          
        </form>
      </div>
    </Container>
  );
};

export default EditProfile;
