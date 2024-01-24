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
import Container from "../components/Container";

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
    if (!user) {
      toast.error("Please login to add product to cart");
      return navigate("/login");
    }

    if (color === null) {
      return toast.error("Please Set the Color");
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
    <>
      <BreadCrumb title={"Product Details "} />
      <Container class1="py-4 max-sm:mx-4">
        {isLoading ? (
          <Loader />
        ) : (
          product && (
            <fragment>
              <section className="main-product-wrapper py-5 flex gap-4 max-sm:flex-col ">
                <div className="rounded-lg w-1/2 bg-white py-4 px-3 max-sm:w-full">
                  <div className="border mb-6 border-zinc-400  ">
                    <Zoom
                      img={`${product?.images[0].image}`}
                      zoomScale={2}
                      width={500}
                      height={500}
                      className="w-full p-4 max-sm:hidden"
                      style={{}}
                    />
                    <Zoom
                      img={`${product?.images[0].image}`}
                      zoomScale={2}
                      width={300}
                      height={300}
                      className=" max-sm:w-1/5 hidden max-sm:block"
                      style={{}}
                    />
                  </div>

                  <div className=" other-product-image flex justify-center flex-wrap w-full gap-3">
                    {product &&
                      product?.images.map((image, index) => {
                        return (
                          <div
                            className="border border-zinc-400 w-[45%] flex items-center justify-center p-5"
                            key={index}
                          >
                            <img
                              src={image.image}
                              className="img-fluid object-contain"
                              alt=""
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="rounded-lg w-1/2 bg-white py-6 px-5 max-sm:w-full ">
                  <div className="border-b">
                    <h3 className="text-sm font-medium mb-5 ">
                      {product?.title}
                    </h3>
                  </div>

                  <div className="border-b py-5">
                    <p className="price">${product?.price}</p>
                    <div className="flex items-center gap-5">
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        value={Number(product?.totalrating)}
                        edit={false}
                      />
                      <p className="mb-0 text-[#777] text-sm">
                        {Number(product?.ratings.length)} Reviews
                      </p>
                    </div>
                    <a
                      className="review-btn text-[#777] text-sm"
                      href="#review"
                    >
                      Write a Review
                    </a>
                  </div>

                  <div className="border-b flex flex-col gap-7  py-3">
                    <div className="flex gap-3 items-center ">
                      <h3 className="text-md text-black font-medium">Type:</h3>
                      <p className="text-sm">{product?.category}</p>
                    </div>
                    <div className="flex gap-3 items-center ">
                      <h3 className="text-md text-black font-medium">Brand:</h3>
                      <p className="text-sm">{product?.brand}</p>
                    </div>
                    <div className="flex gap-3 items-center ">
                      <h3 className="text-md text-black font-medium">
                        Category:
                      </h3>
                      <p className="text-sm">{product?.category}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <h3 className="text-md text-black font-medium">Tags:</h3>
                      <p className="text-sm">{product?.tags}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <h3 className="text-md text-black font-medium">
                        Availability:
                      </h3>
                      <p className="text-sm">
                        {product?.quantity > 0 ? "In Stock" : "Out Of Stock"}
                      </p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <h3 className="text-md text-black font-medium">Color:</h3>
                      <Colors setColor={setColor} color={product?.color} />
                    </div>

                    <div className="flex gap-5 items-center flex-row">
                      <h3 className="text-md text-black font-medium">
                        Quantity:
                      </h3>

                      <div>
                        <input
                          type="number"
                          min={1}
                          max={product?.quantity}
                          name=""
                          className="border outline-none h-9 w-12 pl-3 ms-2 "
                          id=""
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        />
                      </div>
                      <div className="text-sm rounded-3xl font-medium bg-blue text-white py-3 px-4 text-center  hover:bg-yellow hover:text-black  ms-3">
                        {alreadyAdded ? (
                          <button
                            className=""
                            onClick={() => navigate("/cart")}
                            disabled={product?.quantity < 0}
                          >
                            Go To Cart
                          </button>
                        ) : (
                          <button
                            className=""
                            onClick={() => addCart()}
                            disabled={Boolean(product?.quantity < 0)}
                          >
                            {product?.quantity < 0
                              ? "Notify Me"
                              : "Add to Cart"}
                          </button>
                        )}

                        {/*   <button className="button signup border-0">
                       Buy Now 
                      </button> */}
                      </div>
                    </div>

                    <div className="flex items-center ">
                      <button
                        className="border-0 flex items-center  bg-transparent"
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

                    <div className="flex flex-col gap-3 my-4  ">
                      <h3 className="text-md font-medium">
                        Shipping &Returns :
                      </h3>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Reiciendis veniam hic aut dignissimos temporibus,
                        aliquid iusto asperiores deleniti magni odit cupiditate
                        minus in sint voluptate, nulla incidunt error numquam!
                        Voluptatem?
                      </p>
                    </div>

                    <div className="flex gap-3 items-center mb-6  ">
                      <h3 className="text-md font-medium"> Product Link:</h3>
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
              </section>

              <section className="description-wrapper py-5 home-wrapper-2">
                <h4 className="text-3xl font-medium my-4">Description</h4>
                <div className="bg-white p-4 text-md text-[#777] text-justify pb-8">
                  <p>{product?.description}</p>
                </div>
              </section>

              <section id="review" className="reviews-wrapper  home-wrapper-2">
                <h4 className="text-3xl font-medium my-4">Reviews</h4>

                <div className="bg-white py-6 px-4">
                  <div className="border-b border-black">
                    <h4 className="text-lg font-medium mb-5">
                      Customer Review
                    </h4>
                    {product && (
                      <div className="flex items-center gap-5 mb-10">
                        <ReactStars
                          count={5}
                          size={24}
                          activeColor="#ffd700"
                          value={Number(product?.totalrating)}
                          edit={false}
                        />
                        <p className="text-[#777] ">
                          Based on {product?.ratings.length} Reviews
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 py-6 border-b border-black ">
                    <h4 className="text-[#777] mb-2 font-medium">
                      Write A Review
                    </h4>

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
                        className="w-full border p-2 border-black outline-none rounded-md  mt-2"
                        id=""
                        cols="30"
                        rows="4"
                        value={comment}
                        placeholder="Write Review here"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={submitRating}
                        className="text-md rounded-3xl font-medium bg-blue text-white py-2 px-4 text-center  mb-2 hover:bg-yellow hover:text-black mt-4"
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
                          <div className="">
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
                      );
                    })}
                </div>
              </section>

              <section className="popular-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                  <div className="w-3/4 max-sm:w-full">
                    <h4 className="text-3xl font-medium my-4">
                      Our Popular Products
                    </h4>

                    <ProductCard data={popularPrd} />
                  </div>
                </div>
              </section>
            </fragment>
          )
        )}
      </Container>
    </>
  );
};

export default SingleProduct;
