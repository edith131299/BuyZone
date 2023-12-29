import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import Metadata from "../components/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  emptyMyCart,
  getUserCart,
} from "../features/User/userSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const shippmentSchema = yup.object({
  firstName: yup.string().required("Please enter the First Name"),
  lastName: yup.string().required("Please enter the Last Name"),
  address: yup.string().required("Please enter address"),
  state: yup.string().required("Please enter the state"),
  city: yup.string().required("Please enter the city"),
  country: yup.string().required("Please enter the country"),
  pincode: yup.string().required("Please enter the pincode"),
});

const Checkout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cart = useSelector((state) => state.authState);

  const { myOrders } = useSelector((state) => state.authState);

  const [totalAmount, setTotalAmount] = useState(null);

  const [shippingInfo, setShippingInfo] = useState({});

  const [paymentInfo, setPaymentInfo] = useState(null);

  const [orderProduct, setOrderProduct] = useState([]);

  const order = {
    totalPrice: totalAmount,
    totalPriceAfterDiscount: totalAmount,
    shippingInfo: shippingInfo,
    orderItems: orderProduct,
    paymentInfo: paymentInfo,
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
    },
    validationSchema: shippmentSchema,
    onSubmit: (values) => {
      localStorage.setItem("address", JSON.stringify(values));
      setTimeout(() => {
        checkOutHandler();
      }, 300);
    },
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const checkOutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to Load");
      return;
    }

    // Authenticate error in below code
    const result = await axios.post(
      "http://13.48.70.125:8000/api/user/order/checkout",
      { amount: totalAmount }
    );

    if (!result) {
      alert("Something Went Wrong");
      return;
    }
    const { amount, id: order_id, currency } = result.data.order;
    const options = {
      key: "rzp_test_zsGUOoVXrbc9fP", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Buy Zone",
      description: "Test Transaction",

      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://13.48.70.125:8000/api/user/order/paymentVerification",
          data
        );

        dispatch(
          createOrder({
            ...order,
            paymentInfo: result.data,
            shippingInfo: JSON.parse(localStorage.getItem("address")),
          })
        );

        if (myOrders) {
          localStorage.removeItem("address");
          dispatch(emptyMyCart());
          navigate("/my-orders");
        }
      },
      prefill: {
        name: "BuyZone",
        email: "BuyZone@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "BuyZone Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    dispatch(getUserCart());
  }, []);
  useEffect(() => {
    let total = 0;
    cart.myCart &&
      cart.myCart.forEach((cart) => {
        total += cart.quantity * cart.price;
      });
    if (total < 1000) {
      setTotalAmount(total + 5);
    } else {
      setTotalAmount(total);
    }
  }, [cart.myCart]);

  useEffect(() => {
    const items = [];

    cart.myCart.forEach((cart) => {
      items.push({
        product: cart.productId._id,
        quantity: cart.quantity,
        price: cart.price,
        color: cart.color._id,
      });
    });
    setOrderProduct(items);
  }, []);

  return (
    <>
      <Metadata title={"Checkout-Buy Zone"} />
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        {" "}
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data"></div>
            <h3 className="website-name">Buy Zone</h3>
            <nav
              style={{ "--bs-breadcrumb-divider": ">" }}
              aria-label="breadcrumb"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link className="text-dark total-price" to={"/cart"}>
                    Cart
                  </Link>
                </li>
                &nbsp;/
                <li
                  className="breadcrumb-item total-price active"
                  aria-current="page"
                >
                  Information
                </li>
                &nbsp;/
                <li className="breadcrumb-item total-price">Shipping</li>
                &nbsp;/
                <li className="breadcrumb-item active" aria-current="page">
                  Payment
                </li>
              </ol>
            </nav>

            <h4 className="title total">Contact Information</h4>

            <p className="user-details total">Sudakar V (emailid)</p>

            <h4 className="mb-3">Shipping Address</h4>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex flex-wrap gap-15 justify-content-between"
            >
              <div className="w-100">
                <select
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange("country")}
                  onBlur={formik.handleBlur("country")}
                  id=""
                  className="form-control form-select"
                >
                  <option value="" selected disabled>
                    Select Country
                  </option>
                  <option value="India">India</option>
                </select>

                <div className="error text-danger ms-2 my-2 ">
                  {formik.touched.country && formik.errors.country}
                </div>
              </div>

              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                />
                <div className="error text-danger ms-2 my-2 ">
                  {formik.touched.firstName && formik.errors.firstName}
                </div>
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                />
                <div className="error text-danger ms-2 my-2 ">
                  {formik.touched.lastName && formik.errors.lastName}
                </div>
              </div>
              <div className="w-100">
                <input
                  type="text"
                  placeholder="Address"
                  className="form-control"
                  value={formik.values.address}
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                />
                <div className="error text-danger ms-2 my-2 ">
                  {formik.touched.address && formik.errors.address}
                </div>
              </div>
              <div className="w-100">
                <input
                  type="text"
                  placeholder="Appartment"
                  className="form-control "
                />
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="City"
                  className="form-control "
                  value={formik.values.city}
                  onChange={formik.handleChange("city")}
                  onBlur={formik.handleBlur("city")}
                />
                <div className="error text-danger ms-2 my-2 ">
                  {formik.touched.city && formik.errors.city}
                </div>
              </div>
              <div className="w-100">
                <select
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange("state")}
                  onBlur={formik.handleBlur("state")}
                  id=""
                  className="form-control form-select"
                >
                  <option value={"Select State"} selected>
                    Select State
                  </option>
                  <option value="TamilNadu">TamilNadu</option>
                </select>

                <div className="error text-danger ms-2 my-2 ">
                  {formik.touched.state && formik.errors.state}
                </div>
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="ZipCode"
                  className="form-control"
                  value={formik.values.pincode}
                  onChange={formik.handleChange("pincode")}
                  onBlur={formik.handleBlur("pincode")}
                />
                <div className="error text-danger ms-2 my-2 ">
                  {formik.touched.pincode && formik.errors.pincode}
                </div>
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-center ">
                  <Link to="/cart" className="text-dark">
                    <BiArrowBack className="me-2" />
                    Return to Cart
                  </Link>
                  <Link to="/cart" className="button bg-danger">
                    Continue to Shipping
                  </Link>
                  <button className="button " type="submit">
                    Place Order
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-5">
            <div className="border-bottom   py-4">
              {cart.myCart &&
                cart.myCart.map((cart, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-2 align-items-center"
                    >
                      <div className="d-flex w-75 align-items-center gap-10">
                        <div className="w-25 position-relative">
                          <span
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                            style={{ top: "-10px", right: "2px" }}
                          >
                            {cart.quantity}
                          </span>
                          <img
                            src={cart.productId.images[0]?.image}
                            width={100}
                            height={100}
                            alt=""
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {cart.productId.title}{" "}
                          </h5>
                          <p className="total-price">{cart.color.title} </p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">
                          $ {cart.price * cart.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">
                  $ {totalAmount ? totalAmount : "0"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Shipping</p>

                <p className="total-price">
                  $ {totalAmount && totalAmount > Number(1000) ? "0" : "5"}{" "}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">$ {totalAmount ? totalAmount : 0}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
