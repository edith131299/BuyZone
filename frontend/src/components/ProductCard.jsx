import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, getSingleProduct } from "../features/Product/productSlice";

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
      {data &&
        data.map((item, index) => {
          return (
            <div
              key={index}
              className={
                location.pathname === "/store" ? `gr-${grid}` : "col-3"
              }
            >
              <div className="product-card position-relative  ">
                <div className="wishlist-icon position-absolute">
                  <button
                    className="border-0  bg-transparent"
                    onClick={() => {
                      addToWish(item._id);
                    }}
                  >
                    <img src="/images/wish.svg" alt="wishlist" />
                  </button>
                </div>
                <div className="product-image d-flex align-items-center justify-content-center">
                  <img
                    src={item.images[0].image}
                    className="img-fluid"
                    alt="watch"
                  />
                  <img
                    src={item.images[1]?.image}
                    className="img-fluid"
                    alt="watch"
                    onClick={() => {
                      dispatch(getSingleProduct(item._id));
                      navigate(`/product/${item._id}`)
                    }}
                  />
                </div>
                <div className="product-details">
                  <p className="brand">{item.brand}</p>
                  <h5 className="product-title">{item.title}</h5>
                  <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    value={Number(item.totalrating)}
                    edit={false}
                  />
                  <p
                    className={`description ${
                      grid === 12 ? "d-block" : "d-none"
                    }`}
                  >
                    {item.description}
                  </p>
                  <p className="price">${item.price}</p>
                </div>
                {/* <div className="action-bar position-absolute ">
                  <div className="d-flex flex-column gap-15">
                    <button className="border-0  bg-transparent">
                      <img
                        onClick={() => navigate(`/product/${item._id}`)}
                        src="/images/view.svg"
                        alt="view"
                      />
                    </button>
                    <button className="border-0  bg-transparent">
                      <img src="/images/add-cart.svg" alt="add-cart" />
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductCard;
