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
      "https://buyzone-gjb5.onrender.com/api/user/order/checkout",
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
          "https://buyzone-gjb5.onrender.com/api/user/order/paymentVerification",
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
      <Container class1="py-5 flex  mt-8">
        <div className="flex flex-row max-sm:flex-col max-sm:mx-4 ">
          <div className="w-3/5 max-sm:w-full ">
            <h3 className="text-3xl font-medium">Buy Zone</h3>

            <nav
              style={{ "--bs-breadcrumb-divider": ">" }}
              aria-label="breadcrumb"
            >
              <ol className="flex gap-2 my-3">
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

            <h4 className="text-md font-medium mt-6 mb-4">
              Contact Information
            </h4>

            <p className="text-md  ">Sudakar V (emailid)</p>

            <h4 className="text-3xl font-medium my-5">Shipping Address</h4>

            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="flex flex-col  flex-wrap gap-4 justify-between"
            >
              <div className="">
                <select
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange("country")}
                  onBlur={formik.handleBlur("country")}
                  id=""
                  className="w-11/12 rounded-sm p-2 border border-zinc-400 outline-none"
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

              <div className="flex gap-2  w-11/12">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full rounded-sm p-2 border border-zinc-400 outline-none"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="error text-danger ms-2 my-2 ">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>

                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full rounded-sm p-2 border border-zinc-400 outline-none"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className="error text-danger ms-2 my-2 ">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
              </div>

              <div className="w-100">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-11/12 rounded-sm p-2 border border-zinc-400 outline-none"
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
                  className="w-11/12 rounded-sm p-2 border border-zinc-400 outline-none "
                />
              </div>

              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="City"
                  className="w-11/12 rounded-sm p-2 border border-zinc-400 outline-none"
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
                  className="w-11/12 rounded-sm p-2 border border-zinc-400 outline-none"
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
                  className="w-11/12 rounded-sm p-2 border border-zinc-400 outline-none"
                  value={formik.values.pincode}
                  onChange={formik.handleChange("pincode")}
                  onBlur={formik.handleBlur("pincode")}
                />
                <div className="error text-danger ms-2 my-2 ">
                  {formik.touched.pincode && formik.errors.pincode}
                </div>
              </div>

              <div className="w-11/12 flex justify-between items-center center mt-4 max-sm:flex-col max-sm:items-start max-sm:hidden">
                <Link
                  to="/cart"
                  className="text-dark flex items-center gap-1 mt-[-20px] max-sm:mb-4"
                >
                  <BiArrowBack className="me-2" />
                  Return to Cart
                </Link>

                <div className="flex gap-5">
                  <Link
                    to="/cart"
                    className="rounded-3xl text-sm font-medium bg-blue text-white py-3 px-6 text-center  mb-7 hover:bg-yellow hover:text-black max-sm:px-4 "
                  >
                    Continue to Shipping
                  </Link>

                  <button
                    className="rounded-3xl font-medium text-sm bg-blue text-white py-3 px-6 text-center  mb-7 hover:bg-yellow hover:text-black "
                    type="submit"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="w-2/5 max-sm:w-full">
            <div className="flex flex-col items-center justify-center border-b  border-zinc-400 py-4 gap-5">
              {cart.myCart &&
                cart.myCart.map((cart, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-center gap-8 mb-8  "
                    >
                      <div className="flex justify-center items-center gap-4  ">
                        <div className=" relative object-contain  w-40">
                          <span
                            className="bg-neutral-500 text-white rounded-full px-2 py-1 text-xs absolute right-1 
                            top-[-12px]"
                          >
                            {cart.quantity}
                          </span>

                          <img
                            src={cart.productId.images[0]?.image}
                            className="w-80  bg-white"
                            alt=""
                          />
                        </div>

                        <div>
                          <h5 className="text-sm">{cart.productId.title} </h5>
                          <p className="text-sm">{cart.color.title} </p>
                        </div>
                      </div>

                      <div className="w-[30%] ">
                        <h5 className="text-sm">
                          $ {cart.price * cart.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="border-b  border-zinc-400 py-4">
              <div className="flex justify-between items-center mb-6">
                <p className="total">Subtotal</p>
                <p className="total-price">
                  $ {totalAmount ? totalAmount : "0"}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="total">Shipping</p>

                <p className="total-price">
                  $ {totalAmount && totalAmount > Number(1000) ? "0" : "5"}{" "}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">$ {totalAmount ? totalAmount : 0}</h5>
            </div>

            <div
              className="w-11/12 flex justify-between items-center center mt-4 max-sm:flex-col max-sm:items-start 
            min-[600px]:hidden max-sm:mt-8 max-sm:w-full"
            >
              <Link
                to="/cart"
                className="text-dark flex items-center gap-1 mt-[-20px] max-sm:mb-4"
              >
                <BiArrowBack className="me-2" />
                Return to Cart
              </Link>

              <div className="flex gap-5">
                <Link
                  to="/cart"
                  className="rounded-3xl text-sm font-medium bg-blue text-white py-3 px-6 text-center  mb-7 hover:bg-yellow hover:text-black max-sm:px-4 "
                >
                  Continue to Shipping
                </Link>

                <button
                  className="rounded-3xl font-medium text-sm bg-blue text-white py-3 px-6 text-center  mb-7 hover:bg-yellow hover:text-black "
                  type="submit"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
