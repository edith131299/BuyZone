import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import { forgotPasswordAction } from "../features/User/userSlice";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    console.log(formData.email);
    dispatch(forgotPasswordAction(formData));
  };
  return (
    <>
      <BreadCrumb title={"Forgot Password"} />

      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Reset Password</h3>
                <p className="text-center my-2">
                  We will send you an email to reset your password
                </p>
                <form
                  onSubmit={submitHandler}
                  className="d-flex flex-column gap-15"
                  action=""
                >
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required="true"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="d-flex flex-column mt-3 justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                    <Link to="/login">Cancel</Link>
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

export default ForgotPassword;
