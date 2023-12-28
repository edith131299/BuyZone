import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const SpecialProduct = (props) => {
  const { brand, image, title, totalratings, price, quantity, sold, id } =
    props;

  return (
    <div className="col-6 mb-3">
      <div className="special-product-card  ">
        <div className="d-flex justify-content-between">
          <div>
            <img className="img-fluid" src={image} alt="watch" />
          </div>
          <div className="special-product-content ">
            <h5 className="brand">{brand}</h5>
            <h6 className="title">{title}</h6>
            <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              value={Number(totalratings)}
              edit={false}
            />
            <p className="price">
              <span className="red-p">{`$${price}`}</span> &nbsp;{" "}
              <strike>$200</strike>
            </p>
            <div className="discount-till d-flex align-items-center gap-10">
              <p className="mb-0">
                <b>5 </b>days
              </p>
              <div className="d-flex gap-10 align-items-center">
                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                <span className="badge rounded-circle p-3 bg-danger">1</span>
              </div>
            </div>
            <div className="prod-count my-3">
              <p>Products:{quantity}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: quantity / quantity + sold * 100 + "%" }}
                  aria-valuenow={quantity / quantity + sold * 100}
                  aria-valuemin={quantity}
                  aria-valuemax={quantity + sold}
                ></div>
              </div>
            </div>
            <Link to={`/product/${id}`} className="button">
              View Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
