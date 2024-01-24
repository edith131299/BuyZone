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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Container class1=" py-5  ">
            {orders && orders.length === 0 ? (
              <div className="text-center  ">No Orders Placed</div>
            ) : (
              <div className="flex flex-col  ">
                {orders && (

                  <div className="flex justify-center items-center bg-[#164863] p-4 text-white font-medium text-xl max-sm:text-xs ">
                    <h5 className="w-2/5 ml-8 max-sm:w-full max-sm:ml-0 " >Order Id</h5>

                    <h5 className="w-1/5 max-sm:w-full" >Total Amount</h5>

                    <h5 className="w-1/4 mr-14 max-sm:w-full max-sm:mr-5" >Total Amount After Discount</h5>

                    <h5 className="w-1/5  max-sm:w-[10%]" >Status</h5>
                  </div>
                  
                )}
                {orders &&
                  orders.map((order, index) => {
                    return (

                      <div
                        key={index}
                        className=" flex items-center  bg-[#427d9d] text-white mt-3 p-5 max-sm:text-xs"
                      >
                        <div className="flex flex-col justify-start w-full ">

                          <div className="flex  my-3 gap-3 items-center justify-center ">
                            <p className="w-2/5 flex items-center mr-12">{order._id} </p>

                            <p className="w-1/5 mr-4 ">{order.totalPrice} </p>

                            <p className="w-1/4">{order.totalPriceAfterDiscount}</p>

                            <p className="w-1/5">{order.status}</p>
                          </div>

                          <div>
                            {order.orderItems.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="text-black flex   bg-[#9bbec8]  p-3"
                                >
                                  <div className="w-2/5 flex flex-col gap-3 ">
                                    <p>Product Name</p>
                                    <p className="w-4/5" >{item.product.title}</p>
                                  </div>
                                  <div className="w-1/5 flex flex-col gap-3  ">
                                    <p>Quantity</p>
                                    <p>{item.quantity}</p>
                                  </div>
                                  <div className="w-1/5 flex flex-col gap-3  ">
                                    <p>Price</p>
                                    <p>{item.price}</p>
                                  </div>
                                  <div className="w-1/5 flex flex-col  gap-1  ">
                                    <p>Color</p>
                                    <li
                                      style={{
                                        backgroundColor: item.title,
                                        fontSize: "30px",
                                      }}
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
      )}
    </>
  );
};

export default MyOrders;
