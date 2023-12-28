import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import Zoom from "react-img-hover-zoom";
import Colors from "../components/Colors";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  addToWishList,
  getAllProducts,
  getSingleProduct,
} from "../features/Product/productSlice";
import { addToCart, getUserCart } from "../features/User/userSlice";
import { toast } from "react-toastify";
import Loader from "./Utils/loader";

const SingleProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { product } = useSelector((state) => state.productState.singleProduct);

  const { isLoading } = useSelector((state) => state.productState);

  const { user } = useSelector((state) => state.authState.user);

  const { products } = useSelector((state) => state.productState.products);

  const [quantity, setQuantity] = useState(1);

  const [color, setColor] = useState(null);

  const { myCart } = useSelector((state) => state.authState);

  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  let cart = {
    productId: product?._id,
    quantity: quantity,
    color: color,
    price: product?.price,
  };

  const addCart = () => {
    if (!user._id) {
      alert("Please login to add product to cart");
      return navigate("/login");
    }


    if (color === null) {
      return alert("Please Set the Color");
    }

    dispatch(addToCart(cart));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 100);
  };

  const submitRating = () => {
    const data = {
      prodId: id,
      star: rating,
      comment: comment,
    };

    if (rating && comment) {
      dispatch(addRating(data));
      setRating(0);
      setComment("");
      toast.success("Review Submitted Successfull");
    } else {
      return alert("Please add rating and comment");
    }
  };

  const props = {
    width: 400,
    height: 500,
    zoomWidth: 500,
    img: product?.images[0].image,
  };

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const addToWish = (id) => {
    dispatch(addToWishList(id));
  };

  useEffect(() => {
    myCart &&
      myCart.forEach((cart) => {
        if (id === cart.productId._id) {
          setAlreadyAdded(true);
        }
      });
  }, [myCart]);

  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getAllProducts());
  }, [dispatch, id]);

  const [popularPrd, setPopularProduct] = useState([]);

  useEffect(() => {
    let popularProducts = [];

    products &&
      products.map((product) => {
        if (product.tags === "popular") {
          popularProducts.push(product);
        } else {
          return false;
        }
      });
    setPopularProduct(popularProducts);
  }, [products]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <fragment>
      <BreadCrumb title={"Product Details "} />

      {isLoading ? (
        <Loader />
      ) : (
        product&&
        <fragment>
          <div className="main-product-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
              <div className="row">
                <div className="col-6">
                  <div className="main-product-image">
                    <div>
                     
                        <Zoom
                          img={`${product?.images[0].image}`}
                          zoomScale={2}
                          width={600}
                          height={600}
                          className=""
                          style={{}}
                        />
                    
                    </div>
                  </div>
                  <div className="other-product-image d-flex flex-wrap gap-15">
                    {product &&
                      product?.images.map((image, index) => {
                        return (
                          <div key={index}>
                            <img
                              src={image.image}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="col-6">
                  <div className="main-product-details">
                    <div className="border-bottom">
                      <h3 className="title">{product?.title}</h3>
                    </div>
                    <div className="border-bottom py-3">
                      <p className="price">${product?.price}</p>
                      <div className="d-flex align-items-center gap-10">
                        <ReactStars
                          count={5}
                          size={24}
                          activeColor="#ffd700"
                          value={Number(product?.totalrating)}
                          edit={false}
                        />
                        <p className="mb-0 t-review">
                          {Number(product?.ratings.length)} Reviews
                        </p>
                      </div>
                      <a className="review-btn" href="#review">
                        Write a Review
                      </a>
                    </div>
                    <div className="boder-bottom row gap-30  py-3">
                      <div className="d-flex gap-10 align-items-center ">
                        <h3 className="product-heading">Type:</h3>
                        <p className="product-data">{product?.category}</p>
                      </div>
                      <div className="d-flex gap-10 align-items-center ">
                        <h3 className="product-heading">Brand:</h3>
                        <p className="product-data">{product?.brand}</p>
                      </div>
                      <div className="d-flex gap-10 align-items-center ">
                        <h3 className="product-heading">Category:</h3>
                        <p className="product-data">{product?.category}</p>
                      </div>
                      <div className="d-flex gap-10 align-items-center">
                        <h3 className="product-heading">Tags:</h3>
                        <p className="product-data">{product?.tags}</p>
                      </div>
                      <div className="d-flex gap-10 align-items-center">
                        <h3 className="product-heading">Availability:</h3>
                        <p className="product-data">
                          {product?.quantity>0?"In Stock":"Out Of Stock"} 
                        </p>
                      </div>

                      <div className="d-flex gap-10 flex-column">
                        <h3 className="product-heading">Color:</h3>
                        <Colors setColor={setColor} color={product?.color} />
                      </div>
                      <div className="d-flex gap-10 align-items-center flex-row">
                        <h3 className="product-heading">Quantity:</h3>

                        <div>
                          <input
                            type="number"
                            min={1}
                            max={product?.quantity}
                            name=""
                            className="form-control ms-4"
                            style={{ width: "70px" }}
                            id=""
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                          />
                        </div>
                        <div className="d-flex align-items-cente gap-30 ms-3">
                          {alreadyAdded ? (
                            <button
                              className="button border-0"
                              onClick={() => navigate("/cart")}
                              disabled={product?.quantity<0}
                            >
                              Go To Cart
                            </button>
                          ) : (
                            <button
                              className="button border-0"
                              onClick={() => addCart()}
                              disabled={Boolean(product?.quantity<0)}
                            >
                              {product?.quantity<0?"Notify Me":"Add to Cart"}
                           
                            </button>
                          )}

                          {/*   <button className="button signup border-0">
                       Buy Now 
                      </button> */}
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-15">
                        <div>
                          <button
                            className="border-0  bg-transparent"
                            onClick={() => {
                              addToWish(product._id);
                            }}
                          >
                            <img
                              className="me-2"
                              src="/images/wish.svg"
                              alt="wishlist"
                            />
                            Add to WishList
                          </button>
                        </div>
                      </div>
                      <div className="d-flex flex-column gap-10  ">
                        <h3 className="product-heading">Shipping &Returns :</h3>
                        <p className="product-data">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Reiciendis veniam hic aut dignissimos
                          temporibus, aliquid iusto asperiores deleniti magni
                          odit cupiditate minus in sint voluptate, nulla
                          incidunt error numquam! Voluptatem?
                        </p>
                      </div>
                      <div className="d-flex gap-10 align-items-center   ">
                        <h3 className="product-heading"> Product Link</h3>
                        <a
                          href="#!"
                          onClick={() => {
                            copyToClipboard(window.location.href);
                          }}
                        >
                          copy product link
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="description-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <h4>Description</h4>
                  <div className="bg-white p-3">
                    <p>{product?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section id="review" className="reviews-wrapper  home-wrapper-2">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <h3>Reviews</h3>
                  <div className="review-inner-wrapper">
                    <div className="review-head d-flex justify-content-between align-items-end py-4">
                      <div>
                        <h4 className="mb-3">Customer Review</h4>
                        {product && (
                          <div className="d-flex align-items-center gap-10">
                            <ReactStars
                              count={5}
                              size={24}
                              activeColor="#ffd700"
                              value={Number(product?.totalrating)}
                              edit={false}
                            />
                            <p className="mb-0">
                              Based on {product?.ratings.length} Reviews
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="review-form py-4">
                      <h4>Write A Review</h4>

                      <div>
                        <ReactStars
                          count={5}
                          size={24}
                          activeColor="#ffd700"
                          value={rating}
                          edit={true}
                          onChange={(e) => setRating(e)}
                        />
                      </div>

                      <div>
                        <textarea
                          name=""
                          className="w-100  form-control"
                          id=""
                          cols="30"
                          rows="4"
                          value={comment}
                          placeholder="Write Review here"
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          onClick={submitRating}
                          className="button border-0 mt-2"
                          type="button"
                        >
                          Submit Review
                        </button>
                      </div>
                    </div>
                    {product &&
                      product.ratings.map((rating, index) => {
                        return (
                          <div key={index} className="reviews mt-4">
                            <div className="review ">
                              <div className="dflex gap-10 align-items-center ">
                                <h6 className="mb-0">
                                  {rating.postedBy.firstName}
                                </h6>
                                <ReactStars
                                  count={5}
                                  size={24}
                                  activeColor="#ffd700"
                                  value={Number(rating.star)}
                                  edit={false}
                                />
                              </div>

                              <p className="mt-3">{rating.comment}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="popular-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <h3 className="section-heading">Our Popular Products</h3>
                </div>
                <ProductCard data={popularPrd} />
              </div>
            </div>
          </section>
        </fragment>
      )}
    </fragment>
  );
};

export default SingleProduct;
