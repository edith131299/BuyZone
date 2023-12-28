import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import { resetPasswordAction } from "../features/User/userSlice";
import { useNavigate, useParams } from "react-router-dom";

const updateSchema = yup.object({
  password: yup.string().required("Please Enter the oldPassword"),
  confirmPassword: yup.string().required("Please enter  the newPassword"),
});

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: updateSchema,
    onSubmit: (values) => {
      if (values.password === values.confirmPassword) {
        try {
          dispatch(resetPasswordAction({ password: values.password, token }));
          navigate("/");
        } catch (error) {
          return alert("Something error");
        }
      } else {
        return alert("Password mismatch");
      }
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
                <h3 className="text-center mb-4 mt-3">Reset Password</h3>
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                  action=""
                >
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="New Password"
                      className="form-control mt-1"
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                    />

                    <div className="error">
                      {formik.touched.password && formik.errors.password}
                    </div>
                  </div>
                  <div>
                    <input
                      type="password"
                      name="confpassword"
                      placeholder="Confirm Password"
                      className="form-control mt-1"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange("confirmPassword")}
                      onBlur={formik.handleBlur("confirmPassword")}
                    />

                    <div className="error">
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword}
                    </div>
                  </div>

                  <div className="d-flex mt-3 justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Submit
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

export default ResetPassword;
