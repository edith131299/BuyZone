import React, { useEffect } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../features/User/userSlice";
import Metadata from "../components/MetaData";
import Loader from "./Utils/loader";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.authState.myOrders);

  const { isLoading } = useSelector((state) => state.authState);

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

  return (
    <>
      <BreadCrumb title="My Orders" />
      <Metadata title={"Orders"} />
      {
        isLoading?<Loader/>:(
          <>
             <Container class1="cart-wrapper home-wrapper-2 py-5  ">
        {orders && orders.length === 0 ? (
          <div className="text-center  ">No Orders Placed</div>
        ) : (
          <div className="row">
            {orders && (
              <div className="col-12 ">
                <div className="row order-header">
                  <div className="col-3">
                    <h5>Order Id</h5>
                  </div>
                  <div className="col-3">
                    <h5>Total Amount</h5>
                  </div>
                  <div className="col-3">
                    <h5>Total Amount After Discount</h5>
                  </div>
                  <div className="col-3">
                    <h5>Status</h5>
                  </div>
                </div>
              </div>
            )}
            {orders &&
              orders.map((order, index) => {
                return (
                  <div key={index} className="col-12 mt-3">
                    <div className="row order-details">
                      <div className="col-3">
                        <p>{order._id} </p>
                      </div>
                      <div className="col-3">
                        <p>{order.totalPrice} </p>
                      </div>
                      <div className="col-3">
                        <p>{order.totalPriceAfterDiscount}</p>
                      </div>
                      <div className="col-3">
                        <p>{order.status}</p>
                      </div>
                      <div className="col-12">
                        {order.orderItems.map((item, index) => {
                          return (
                            <div key={index} className="row item-details py-3">
                              <div className="col-3">
                                <p>Product Name</p>
                                <p>{item.product.title}</p>
                              </div>
                              <div className="col-3">
                                <p>Quantity</p>
                                <p>{item.quantity}</p>
                              </div>
                              <div className="col-3">
                                <p>Price</p>
                                <p>{item.price}</p>
                              </div>
                              <div className="col-3">
                                <p>Color</p>
                                <li
                                style={{ backgroundColor: item.title , fontSize:"30px" }}
                                ></li>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </Container>
          </>
        )
      }

   
    </>
  );
};

export default MyOrders;
