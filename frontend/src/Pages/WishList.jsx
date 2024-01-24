import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishList } from "../features/User/userSlice";
import { addToWishList } from "../features/Product/productSlice";
import Container from "../components/Container";
import Loader from "./Utils/loader";
import Metadata from "../components/MetaData";

const WishList = () => {
  const dispatch = useDispatch();

  const [wishListRemoved, setWishListRemoved] = useState(false);

  const wishList = useSelector((state) => state?.authState?.wishList);

  const removeWishList = (id) => {
    dispatch(addToWishList(id));
    setWishListRemoved(true);
  };

  useEffect(() => {
    dispatch(getUserWishList());
    setWishListRemoved(false);
  }, [wishListRemoved]);
  return (
    <>
      <Metadata title={"Whishlist"} />

      <BreadCrumb title={"WishList"} />
      
      <Container class1=" py-5 ">
            {wishList && wishList?.length === 0 ? (
              <div className="text-center text-3xl font-medium my-6">No Data </div>
            ) : (
              <div className="flex  gap-6 text-wrap text-justify flex-wrap max-sm:justify-center whitespace-nowrap my-8">
                {wishList &&
                  wishList?.map((item, index) => {
                    return (
                      
                        <div className="bg-white w-1/4 flex flex-col items-center py-4 px-2  relative max-sm:w-2/5 max-sm:text-sm text-pretty">
                          <img
                            src="/images/cross.svg"
                            alt="cross"
                            className="absolute right-5 top-5  w-4 h-4 max-sm:w-3 max-sm:h-4  "
                            onClick={() => removeWishList(item?._id)}
                          />
                          <div className="wishlist-card-image">
                            <img
                              src={item && item?.images[0]?.image}
                              className="object-cover h-full w-full   max-sm:h-20   my-6"
                              alt="watch"
                            />
                          </div>
                          <div className="px-3 py-3">
                            <h5 className="title">{item.description.substr(0, 120) + ".."}</h5>
                            <h6 className="price mb-3 mt-3">{`$${item.price}`}</h6>
                          </div>
                        </div>
                     
                    );
                  })}
              </div>
            )}
         
       
      </Container>
    </>
  );
};

export default WishList;
