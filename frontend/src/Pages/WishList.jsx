import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishList } from "../features/User/userSlice";
import { addToWishList } from "../features/Product/productSlice";

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
      <BreadCrumb title={"WishList"} />
      <div className="wishlist-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            {wishList && wishList?.length === 0 ? (
              <div className="text-center">No Data </div>
            ) : (
              <>
                {wishList &&
                  wishList?.map((item, index) => {
                    return (
                      <div key={index} className="col-3">
                        <div className="wishlist-card position-relative">
                          <img
                            src="/images/cross.svg"
                            alt="cross"
                            className="position-absolute cross img-fluid "
                            onClick={() => removeWishList(item?._id)}
                          />
                          <div className="wishlist-card-image">
                            <img
                              src={item && item?.images[0]?.image}
                              className="img-fluid w-100"
                              alt="watch"
                            />
                          </div>
                          <div className="px-3 py-3">
                            <h5 className="title">{item.description}</h5>
                            <h6 className="price mb-3 mt-3">{`$${item.price}`}</h6>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
