import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, logoutUser } from "../features/User/userSlice";
import { Dropdown, Image } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAllProducts } from "../features/Product/productSlice";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const myCart = useSelector((state) => state.authState?.myCart);

  const { products } = useSelector((state) => state?.productState?.products);

  const { user } = useSelector((state) => state.authState.user);

  const [total, setTotal] = useState(0);

  const [orderLength, setOrderLength] = useState(0);

  const [paginate, setPaginate] = useState(true);

  const [search, setSearch] = useState(null);

  const searchEvent = () => {
    console.log(search)
    dispatch(getAllProducts({ search }));
    navigate(`/products`);
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

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Return
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <Link className="text-white" href="tel:+91 91384857592">
                  +91 91384857592
                </Link>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className=" header-upper py-3">
        <div className="container-xxl">
          <div className="row align-center">
            <div className="col-2">
              <h2>
                <Link to="/" className="text-white">
                  Buy Zone{" "}
                </Link>
              </h2>
            </div>
            <div className="col-5 ">
              <form onSubmit={searchEvent} className="input-group ">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product"
                  aria-label="Search Product"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="input-group-text p-3"
                  id="basic-addon2"
                >
                  <BsSearch className="fs-6" />
                </button>
              </form>
            </div>
            <div className="col-5  ">
              <div className="header-upper-links d-flex ms-5  align-items-center gap-4">
                <div>
                  <Link
                    to={"wishlist"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/wishlist.svg" alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> wishlist{" "}
                    </p>
                  </Link>
                </div>
                <div>
                  <div className="d-flex align-items-center gap-10 text-white">
                    {user ? (
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="default text-white px-2 i"
                          id="dropdown-basic"
                          className="d-flex align-items-center"
                        >
                          <figure className="avatar pt-2 avatar-nav">
                            <Image
                              className=" "
                              width="50px"
                              src={user.avatar}
                            ></Image>
                          </figure>

                          <p className="mb-0 mt-1 mx-2">
                            Welcome
                            <br /> {user.firstName}
                          </p>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            className="text-dark"
                            onClick={() => navigate("/myprofile")}
                          >
                            Profile
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => logoutHandler()}
                            className="text-danger"
                          >
                            Logout
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <Link to={"/Login"}>
                        <p className="text-white mb-0 mt-1 mx-2">
                          Log in <br /> My Account
                        </p>
                      </Link>
                    )}
                  </div>
                </div>
                <div>
                  <Link
                    to={"cart"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/cart.svg" alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {orderLength}
                      </span>
                      <p className="mb-0">$ {total}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3 ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src="/images/menu.svg" alt="menu" />
                    <span className="me-5 d-inline-block">Shop categories</span>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link className="dropdown-item text-white" to="">
                        Action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="">
                        Another action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="">
                        Something else here
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center  gap-15">
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={`/products`}>Our Store</NavLink>
                    <NavLink to={"/my-orders"}>My Orders</NavLink>
                    <NavLink to={"/blogs"}>Blogs</NavLink>
                    <NavLink to={"/contact"}>Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
