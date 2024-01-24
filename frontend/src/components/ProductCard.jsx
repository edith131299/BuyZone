import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  getSingleProduct,
} from "../features/Product/productSlice";

const ProductCard = (props) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, grid } = props;

  const addToWish = (id) => {
    dispatch(addToWishList(id));
  };

  return (
    <>
    <div className="flex mt-8  gap-8 flex-wrap max-sm:flex-col max-sm:justify-center  ">
    {data &&
        data.map((item, index) => {
          return (
            <div className="bg-white rounded-xl flex flex-col items-center w-[30%] p-4 max-sm:w-full relative">
              <div className="wishlist-icon absolute right-5 top-5 ">
                <button
                  className="border-0  bg-transparent"
                  onClick={() => {
                    addToWish(item._id);
                  }}
                >
                  <img src="/images/wish.svg" alt="wishlist" />
                </button>
              </div>

              <div className="h-72 flex items-center justify-center object-contain max-sm:h-43 [&>*:nth-child(1)]:hover:hidden [&>*:nth-child(1)]:block [&>*:nth-child(2)]:hover:block [&>*:nth-child(2)]:hidden  ">
                <img
                  src={item.images[0]?.image}
                  className=" block"
                  alt="watch"
                />
                <img
                  src={item.images[1]?.image}
                  className="  "
                  alt="watch"
                  onClick={() => navigate(`/product/${item._id}`)}
                />
              </div>

              <div className="flex flex-col justify-between mt-8 ">
                <p className="uppercase text-[#bf4800] text-sm font-normal mb-4 ">
                  {item.brand}
                </p>
                <h5 className="text-base text-[#1c1c1b] font-medium leading-5 mb-4">
                  {item.title}
                </h5>
                <ReactStars
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  value={Number(item.totalrating)}
                  edit={false}
                />
                <p className="text-sm text-[#777777] mb-4 mt-4">
                  {item.description.substr(0, 60) + ".."}
                </p>
                <p className=" text-sm mb-6">{item.price}</p>
              </div>
              {/* 
                          <div className="action-bar position-absolute ">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0  bg-transparent">
                    <img
                      onClick={() =>
                        navigate(`/product/${item._id}`)
                      }
                      src="/images/view.svg"
                      alt="view"
                    />
                  </button>
                  <button className="border-0  bg-transparent">
                    <img
                      src="/images/add-cart.svg"
                      alt="add-cart"
                    />
                  </button>
                </div>
                          </div> */}
            </div>
          );
        })}
    </div>
      
    </>
  );
};

export default ProductCard;
