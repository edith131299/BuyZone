import React, { useEffect, useState } from "react";
import { Dropdown, Image } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";

import Menu, { Item as MenuItem, Divider } from "rc-menu";
import "rc-dropdown/assets/index.css";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAllProducts } from "../features/Product/productSlice";
import { getUserCart, logoutUser } from "../features/User/userSlice";
import OurStore from "../Pages/OurStore";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const myCart = useSelector((state) => state.authState?.myCart);

  const { user } = useSelector((state) => state.authState.user);

  const [total, setTotal] = useState(0);

  const [orderLength, setOrderLength] = useState(0);

  const [search, setSearch] = useState(null);

  const searchEvent = (e) => {
    e.preventDefault();
    
    navigate(`/products?search=${search}`);
  };

  const totalPrice = () => {
    let sum = 0;

    myCart?.forEach((cart) => {
      sum += cart.quantity * cart.price;
    });
    setTotal(sum);
  };

  const logoutHandler = () => {
    setTotal(0);
    setOrderLength(0);
    dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      dispatch(getUserCart());
    }
  }, [user]);

  useEffect(() => {
    totalPrice();
    setOrderLength(myCart?.length);
  }, [myCart]);

  // useEffect(() => {
  //   let data = [];
  //   products &&
  //     products.forEach((product, index) => {
  //       data.push({ id: index, prod: product.id, name: product.title });
  //     });
  // }, [products]);

  // const menu = (
  //   <Menu className="bg-black outline-none ">
  //     <MenuItem  key="1" onClick={() => navigate("/myprofile")} >Profile</MenuItem>

  //     <MenuItem key="2" onClick={() => logoutHandler()}>Logout</MenuItem>
  //   </Menu>
  // );

  return (
    <>
      <header className=" bg-slate-900 py-4 border-b border-grey border-solid max-sm:hidden ">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <p className="text-white ">Free Shipping Over $100 & Free Return</p>

          <p className="text-end text-white   ">
            Hotline:
            <Link className="text-white" href="tel:+91 91384857592">
              +91 91384857592
            </Link>
          </p>
        </div>
      </header>

      <header className=" bg-slate-900 py-5">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between max-sm:flex-col max-sm:gap-7  max-sm:items-center max-sm:mx-6">
          <h2 className="text-white text-4xl font-medium  max-sm:hidden">
            <Link to="/">Buy Zone </Link>
          </h2>

          <div className=" max-sm:w-full">
            <form
              onSubmit={searchEvent}
              className="flex items-center w-[500px] max-sm:w-full "
            >
              <input
                type="text"
                className="flex-1  py-2 px-2 h-12 outline-none rounded border-b border-solid border-[#ced4da]  rounded-tr-none rounded-br-none shadow max-sm:h-10 "
                placeholder="Search Product"
                aria-label="Search Product"
                aria-describedby="basic-addon2"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="bg-yellow h-12 p-3 rounded ml-[-1] rounded-tl-none rounded-bl-none w-12 flex items-center max-sm:h-10"
                id="basic-addon2"
              >
                <BsSearch className="fs-6" />
              </button>
            </form>
          </div>

          <div className=" flex text-lg justify-start gap-8  text-white items-center  max-sm:w-auto max-sm:text-sm max-sm:gap-3 ">
            <Link
              to={"wishlist"}
              className="flex gap-4  items-center justify-center max-sm:gap-3"
            >
              <img
                src="/images/wishlist.svg"
                alt="wishlist"
                className="max-sm:h-8"
              />
              <p>Wishlist </p>
            </Link>

            <div className="">
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="default text-white px-2 i"
                    id="dropdown-basic"
                    className="flex items-center"
                  >
                    <figure className="avatar pt-2 avatar-nav">
                      <Image
                        className=" "
                        width="30px"
                        src={user.avatar}
                      ></Image>
                    </figure>

                    <p className="mb-0 mt-1 mx-2">
                      Welcome
                      <br /> {user.firstName}
                    </p>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-white flex flex-col">
                    <Dropdown.Item
                      className="text-black"
                      onClick={() => navigate("/myprofile")}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => logoutHandler()}
                      className="text-red-600"
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link to={"/Login"}>
                  <p className="text-white mb-0 mt-1 mx-2">
                    Log in <br />
                    My Account
                  </p>
                </Link>
              )}
            </div>

            <Link
              to={"cart"}
              className="flex justify-center items-center gap-2 "
            >
              <img src="/images/cart.svg" alt="cart" />
              <div className="flex flex-col gap-1  ">
                <span className=" rounded-lg bg-white text-black text-center px-1 text-sm font-medium max-sm:text-xs max-sm:px-0 ">
                  {orderLength}
                </span>
                <p className="mb-0">$ {total}</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <header className="bg-blue text-white py-5 ">
        <div className="max-w-screen-xl mx-auto flex items-center gap-16 justify-start max-sm:w-full max-sm:gap-5">
          <div className="flex items-center gap-4 max-sm:hidden ">
            <img src="/images/menu.svg" alt="menu" />
            <span className="max-sm:block">Shop At Your Ease</span>
          </div>

          <div className="flex gap-8 max-sm:mx-2 max-sm:text-xs items-center  ">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={`/products`}>Our Store</NavLink>
            <NavLink to={"/my-orders"}>My Orders</NavLink>
            <NavLink to={"/blogs"}>Blogs</NavLink>
            <NavLink to={"/contact"}>Contact</NavLink>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
