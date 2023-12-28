import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { passwordUpdate } from "../features/User/userSlice";

const updateSchema = yup.object({
  oldPassword: yup.string().required("Please Enter the oldPassword"),
  newPassword: yup.string().required("Please enter  the newPassword"),
});

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: updateSchema,
    onSubmit: (values) => {
      dispatch(passwordUpdate(values));
    },
  });
  return (
    <>
      <BreadCrumb title={"Reset Password"} />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-4 mt-3">Update Password</h3>
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                  action=""
                >
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Old Password"
                      className="form-control mt-1"
                      value={formik.values.oldPassword}
                      onChange={formik.handleChange("oldPassword")}
                      onBlur={formik.handleBlur("oldPassword")}
                    />

                    <div className="error">
                      {formik.touched.oldPassword && formik.errors.oldPassword}
                    </div>
                  </div>
                  <div>
                    <input
                      type="password"
                      name="confpassword"
                      placeholder="New Password"
                      className="form-control mt-1"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange("newPassword")}
                      onBlur={formik.handleBlur("newPassword")}
                    />

                    <div className="error">
                      {formik.touched.newPassword && formik.errors.newPassword}
                    </div>
                  </div>

                  <div className="d-flex mt-3 justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Update
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

export default UpdatePassword;
