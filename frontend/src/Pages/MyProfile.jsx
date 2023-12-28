import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Metadata from "../components/MetaData";

const MyProfile = () => {
  const { user } = useSelector((state) => state.authState.user);

  return (
    <>
      <Metadata title={"My Profile"} />
      <Container class1="cart-wrapper home-wrapper-2 py-5  ">
        <div className="row mt-5 ">
          <div className="col-12 profile-header  ">
            <div className=" profile-Picture">
              <figure className="avatar-img">
                <img
                  className="rounded-circle img-fluid "
                    style={{height:"200px",width:"230px"}}
                  src={user?.avatar ?? "/images/default_avatar.png"}
                  alt={user?.name}
                />
              </figure>
              <Link
                to="/myprofile/update"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>
            <div className="col-6 col-md-5 ">
              <h4>Full Name</h4>
              <p>{user?.firstName + " " + user?.lastName}</p>

              <h4>Email Address</h4>
              <p>{user?.email}</p>

              <h4>Mobile Number</h4>
              <p>{user?.mobile}</p>

              <Link to={"/orders"} className="btn btn-danger  mt-5 me-3">
                My Orders
              </Link>

              <Link to="/changePassword" className="btn btn-primary  mt-5">
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyProfile;
