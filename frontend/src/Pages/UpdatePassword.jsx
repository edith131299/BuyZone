import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { passwordUpdate } from "../features/User/userSlice";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";

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
      <Container class1="py-12 flex flex-col justify-center  ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col  shadow-xl w-[450px]   px-7 py-4 my-5 bg-white rounded-md justify-evenly  max-sm:text-sm max-sm: max-sm:w-[320px]"
          action=""
        >
        <h3 className="text-center  text-2xl font-medium mb-4 mt-3 max-sm:text-xl">Update Password</h3>
          <div>
            <CustomInput
              type="password"
              name="password"
              placeholder="Old Password"
              className=" mt-2"
              value={formik.values.oldPassword}
              onChange={formik.handleChange("oldPassword")}
              onBlur={formik.handleBlur("oldPassword")}
            />

            <div className="error mt-2">
              {formik.touched.oldPassword && formik.errors.oldPassword}
            </div>
          </div>

          <div>
            <CustomInput
              type="password"
              name="confpassword"
              placeholder="New Password"
              className=" mt-8"
              value={formik.values.newPassword}
              onChange={formik.handleChange("newPassword")}
              onBlur={formik.handleBlur("newPassword")}
            />

            <div className="error mt-2">
              {formik.touched.newPassword && formik.errors.newPassword}
            </div>
          </div>

          <div className="flex my-6 justify-center items-center rounded-3xl font-normal bg-yellow w-1/4 px-4 py-2 max-sm:w-2/5">

            <button type="submit" className="button border-0">
              Update
            </button>
          </div>

        </form>
      </Container>
    </>
  );
};

export default UpdatePassword;
