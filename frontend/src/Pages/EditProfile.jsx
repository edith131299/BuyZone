import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { profileUpdate } from "../features/User/userSlice";
import PreviewImage from "../utils/previewImage";
import { useNavigate } from "react-router-dom";

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
    <Container class1="cart-wrapper home-wrapper-2 py-5">
      <div className="row  ">
        <div
          className="col-12 px-5"
          style={{ width: "500px", marginLeft: "30%" }}
        >
          <form
            onSubmit={formik.handleSubmit}
            className="shadow-lg p-5 mb-5 mt-5 bg-white rounded"
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form">
              <label htmlFor="firstname_field">First Name</label>
              <input
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
            <div className="form">
              <label htmlFor="lastName_field">Last Name</label>
              <input
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

            <div className="form">
              <label htmlFor="email_field">Email</label>
              <input
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

            <div className="form">
              <label htmlFor="number">Mobile</label>
              <input
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

            <div className="form">
              <label htmlFor="avatar">Avatar</label>
              <div className="d-flex align-items-center gap-4 form-control">
                <div>
                  <figure className="avatar mr-3 item-rtl">
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

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default EditProfile;
