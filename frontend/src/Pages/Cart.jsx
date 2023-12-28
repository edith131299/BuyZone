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
            <div className="text-center ">Your Cart is Empty</div>
          ) : (
            <>
              {myCart &&
                myCart.map((cart, index) => {
                  return (
                    <div className="col-12" key={index}>
                      <div className="cart-header py-3 d-flex justify-content-between align-content-center ">
                        <h4 className="cart-col-1">Product</h4>
                        <h4 className="cart-col-2">Price</h4>
                        <h4 className="cart-col-3">Quantity</h4>
                        <h4 className="cart-col-4">Total</h4>
                      </div>
                      <div className="cart-data py-3 d-flex justify-content-between align-content-center align-items-center ">
                        <div className="cart-col-1 gap-10 d-flex align-items-center ">
                          <div className="w-25">
                            <img
                              className="img-fluid"
                              src={cart.productId.images[0].image}
                              alt=""
                            />
                          </div>
                          <div className="w-75">
                            <p>{cart.productId.title}</p>
                            <p>Size:</p>
                            <p>Color:{cart.color.title}</p>
                          </div>
                        </div>
                        <div className="cart-col-2">
                          <h5 className="price">$ {cart.price}</h5>
                        </div>
                        <div className="cart-col-3 d-flex align-items-center  gap-15">
                          <div>
                            <input
                              className="form-control"
                              type="number"
                              name=""
                              id={"cart"+cart?._id}
                              min={1}
                              max={10}
                              value={
                                cart.quantity
                              }
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
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="cart-col-4">
                          <h5 className="price">
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
            <div className="d-flex justify-content-between align-items-center">
              <Link to="product" className="button">
                Continue to Shopping
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex  flex-column align-items-end">
                  <h4>Sub Total: $ {totalAmount}</h4>
                  <p>Taxes and shipping calculated at checkout </p>
                  <Link to={"checkout"} className="button">
                    Checkout
                  </Link>
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
