import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Metadata from "../components/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCart,
  removeProductFromCart,
  updateQTCart,
} from "../features/User/userSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const { myCart } = useSelector((state) => state.authState);

  const [productQTUpdate, setProductQTUpdate] = useState(null);

  const [totalAmount, setTotalAmount] = useState(null);

  const deleteOneCart = (cartId) => {
    dispatch(removeProductFromCart(cartId));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  let cart = {
    cartId: productQTUpdate?.cartId,
    quantity: productQTUpdate?.quantity,
  };

  useEffect(() => {
    dispatch(getUserCart());
    console.log(productQTUpdate);
    if (productQTUpdate !== null) {
      setProductQTUpdate(null);
      dispatch(updateQTCart(cart));
    }
  }, [productQTUpdate]);

  useEffect(() => {
    let total = 0;
    myCart &&
      myCart.forEach((cart) => {
        total += cart.quantity * cart.price;
      });
    setTotalAmount(total);
  }, [myCart]);

  return (
    <>
      <BreadCrumb title="Cart" />
      <Metadata title={"Cart"} />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          {myCart && myCart.length === 0 ? (
            <div className="text-center font-medium text-2xl my-8 ">Your Cart is Empty</div>
          ) : (
            <>
              {myCart &&
                myCart.map((cart, index) => {
                  return (
                    <div
                      className="flex flex-col  mx-6  text-[#777] "
                      key={index}
                    >
                      <div className=" py-3 flex  justify-between mb-4  ">
                        <h4 className="w-2/5">Product</h4>
                        <h4 className="w-1/5">Price</h4>
                        <h4 className="w-1/5">Quantity</h4>
                        <h4 className="w-1/5 ml-4">Total</h4>
                      </div>

                      <div className=" py-7 flex justify-around text-justify items-center border-b border-t border-zinc-500 max-sm:items-start   ">

                        <div className=" flex gap-6 items-center w-2/5  max-sm:flex-col">
                          <div className="w-1/5">
                            <img
                              className="img-fluid"
                              src={cart.productId.images[0].image}
                              alt=""
                            />
                          </div>
                          <div className="w-1/2 text-sm flex flex-col gap-4">
                            <p>{cart.productId.title}</p>
                            <p>Size:</p>
                            <p>Color:{cart.color.title}</p>
                          </div>
                        </div>

                        <div className="w-1/5">
                          <h5 className="text-black">$ {cart.price}</h5>
                        </div>

                        <div className="w-1/5 flex items-center gap-3 text-black ">
                          <div>
                            <input
                              className="w-20 px-2 pl-4 py-2 outline-black border border-black max-sm:w-10"
                              type="number"
                              name=""
                              id={"cart" + cart?._id}
                              min={1}
                              max={10}
                              value={cart.quantity}
                              onChange={(e) =>
                                setProductQTUpdate({
                                  cartId: cart?._id,
                                  quantity: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div>
                            <AiFillDelete
                              onClick={() => deleteOneCart(cart._id)}
                              className="text-red-600 text-xl"
                            />
                          </div>
                        </div>

                        <div className="w-1/5">
                          <h5 className="text-black">
                            $ {cart.price * cart.quantity}
                          </h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
          )}

          <div className="col-12 py-2 mt-4">
            <div className="flex justify-between items-center max-sm:flex-col-reverse max-sm:gap-16">
              <Link
                to="product"
                className="rounded-3xl text-sm font-medium bg-blue text-white py-3 px-6 text-center  mb-7 hover:bg-yellow hover:text-black"
              >
                Continue to Shopping
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="flex  flex-col items-end">
                  <h4 className="text-2xl mb-2 font-medium">
                    Sub Total: $ {totalAmount}
                  </h4>
                  <p>Taxes and shipping calculated at checkout </p>

                  {totalAmount !== 0 ? (
                    <Link
                      to={"checkout"}
                      className="rounded-3xl text-sm font-medium bg-blue text-white py-3 px-6 text-center  my-5 hover:bg-yellow hover:text-black"
                    >
                      Checkout
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
