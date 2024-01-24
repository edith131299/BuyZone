import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const SpecialProduct = (props) => {
  const { brand, image, title, totalratings, price, quantity, sold, id } =
    props;

  return (
    <div className="bg-white  flex w-1/2  p-1 rounded-xl max-sm:flex-col max-sm:p-6 max-sm:w-4/5 ">
      <img className=" h-1/2 object-contain" src={image} alt="watch" />

      <div className="flex flex-col justify-center w-10/12 ">
        <h5 className="text-xl font-medium mb-2 capitalize">{brand}</h5>
        <h6 className="text-base font-medium mb-4 leading-5 w-full">{title}</h6>
        <ReactStars
          count={5}
          size={24}
          activeColor="#ffd700"
          value={Number(totalratings)}
          edit={false}
        />
        <p className="my-2">
          <span className="red-p">{`$${price}`}</span> &nbsp;{" "}
          <strike>$200</strike>
        </p>
        <div className="flex items-center gap-5 flex-nowrap  ">
          <div className="mb-0">
            <b className="">5 </b>days
          </div>
          <div className="flex gap-4 items-center">
            <span className="rounded-[50%] bg-[#dc3545] p-2 text-xs  text-white font-medium">
              1
            </span>
            :
            <span className="rounded-[50%] bg-[#dc3545] p-2 text-xs text-white font-medium">
              1
            </span>
            :
            <span className="rounded-[50%] bg-[#dc3545] p-2 text-xs text-white font-medium">
              1
            </span>
          </div>
        </div>
        <div className="prod-count my-6">
          <p className="text-lg font-medium" >Products:{quantity}</p>
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
        <Link to={`/product/${id}`} className="rounded-3xl font-medium bg-blue text-white py-3 px-5 text-center w-1/3 hover:bg-yellow hover:text-black  max-sm:w-4/5">
          View Product
        </Link>
      </div>
    </div>
  );
};

export default SpecialProduct;
