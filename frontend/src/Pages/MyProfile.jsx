import React from "react";
import Container from "../components/Container";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Metadata from "../components/MetaData";

const MyProfile = () => {
  const { user } = useSelector((state) => state.authState.user);

  return (
    <>
      <Metadata title={"My Profile"} />
      <Container class1="py-12  ">

        <div className="flex  justify-center gap-20 my-8 max-sm:flex-col max-sm:gap-6" >
          

            <div className="  flex flex-col items-center gap-5">

              <figure className="w-60 h-60 rounded-full overflow-hidden">
                <img
                  className=" object-cover w-full h-full  "
                    
                  src={user?.avatar ?? "/images/default_avatar.png"}
                  alt={user?.name}
                />
              </figure>

              <Link
                to="/myprofile/update"
                id="edit_profile"
                className="rounded-3xl font-medium  bg-blue text-white py-3 text-sm px-5 my-5 "
              >
                Edit Profile
              </Link>

            </div>

            <div className="flex flex-col gap-4 ml-8 ">
              <h4 className="text-2xl font-medium">Full Name</h4>
              <p className="mt-[-2px] text-base">{user?.firstName + " " + user?.lastName}</p>

              <h4 className="text-2xl font-medium">Email Address</h4>
              <p className="mt-[-2px text-base" >{user?.email}</p>

              <h4 className="text-2xl font-medium">Mobile Number</h4>
              <p className="mt-[-2px">{user?.mobile}</p>

              <div>
              <Link to={"/orders"} className="rounded-3xl font-medium  bg-blue text-white py-3 text-sm px-5 mt-5 me-6">
                My Orders
              </Link>

              <Link to="/changePassword" className="rounded-3xl font-medium  bg-red-600 text-white py-3 text-sm px-4 mt-5 me-3">
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
