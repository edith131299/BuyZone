import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services, collection, famousCard } from "./Utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/Blog/blogSlice";
import moment from "moment";
import { getAllProducts } from "../features/Product/productSlice";
//special product
import ReactStars from "react-rating-stars-component";
import { addToWishList } from "../features/Product/productSlice";
import Loader from "./Utils/loader";
import Metadata from "../components/MetaData";

const Home = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getBlog = () => {
    dispatch(getAllBlogs());
  };

  const blogs = useSelector((state) => state.blogState.allBlogs?.blogs);

  const { products } = useSelector((state) => state.productState.products);
  const { isLoading } = useSelector((state) => state.productState);

  const addToWish = (id) => {
    dispatch(addToWishList(id));
  };

  useEffect(() => {
    dispatch(getAllProducts());
    getBlog();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Metadata title={"Home"} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
         
         <section className="bg-white">

         <div className=" mt-4 max-w-screen-xl  mx-auto py-12 mb-8 flex gap-6 max-sm:flex-col items-center max-sm:text-xs ">
            <div className="relative w-6/12 max-sm:w-11/12 ">
              <img
                src="/images/main-banner-1.jpg"
                className=" rounded-md"
                alt="main-banner"
              />
              <div className="absolute flex flex-col gap-5 top-[10%] left-[10%] max-sm:top-[10%]">
                <h4 className="text-[#bf4800]">SUPERCHARGED FOR PROS</h4>
                <h5 className="text-4xl font-medium my-3 max-sm:my-0 max-sm:text-xl">
                  iPad S13+ Pro
                </h5>
                <p>
                  From $999.00 or $41.62/no <br /> for 24mo.Footnote*
                </p>
                <Link className="rounded-3xl font-medium text-xs bg-blue text-white py-2 px-1 text-center  hover:bg-yellow hover:text-black w-2/5 max-sm:text-[8px] max-sm:w-2/5 max-sm:p-1 max-sm:font-light">
                  Buy Now
                </Link>
              </div>
            </div>

            <div className="w-6/12 flex flex-wrap  items-center gap-3 max-sm:w-full max-sm:items-center max-sm:justify-center ">
              <div className=" w-sm-b rounded-md relative max-sm:w-2/5 ">
                <img
                  src="/images/catbanner-01.jpg"
                  className="rounded-md  "
                  alt="main-banner"
                />
                <div className="absolute inset-y-[20%] left-[10%] max-sm:top-[18%] ">
                  <h4 className="text-[#bf4800] capitalize max-sm:text-[12px]">
                    best sale
                  </h4>
                  <h5 className="font-medium text-xl my-3 max-sm:text-xs max-sm:my-1">
                    Laptops Max
                  </h5>
                  <p className="max-sm:text-[10px]">
                    From $1699.00 or
                    <br /> $41.62/no
                  </p>
                </div>
              </div>

              <div className="w-sm-b rounded-md relative max-sm:w-2/5 ">
                <img
                  src="/images/catbanner-02.jpg"
                  className="rounded-md"
                  alt="main-banner"
                />
                <div className="absolute inset-y-[20%] left-[10%] max-sm:top-[18%] ">
                  <h4 className="text-[#bf4800] capitalize max-sm:text-[12px]">
                    best sale
                  </h4>
                  <h5 className="font-medium text-xl my-3 max-sm:text-xs max-sm:my-1">
                    Laptops Max
                  </h5>
                  <p className="max-sm:text-[10px]">
                    From $1699.00 or
                    <br /> $41.62/no
                  </p>
                </div>
              </div>

              <div className=" w-sm-b rounded-md relative max-sm:w-2/5 ">
                <img
                  src="/images/catbanner-03.jpg"
                  className="rounded-md"
                  alt="main-banner"
                />
                <div className="absolute inset-y-[20%] left-[10%] max-sm:top-[18%] ">
                  <h4 className="text-[#bf4800] capitalize max-sm:text-[12px]">
                    best sale
                  </h4>
                  <h5 className="font-medium text-xl my-3 max-sm:text-xs max-sm:my-1">
                    Laptops Max
                  </h5>
                  <p className="max-sm:text-[10px]">
                    From $1699.00 or
                    <br /> $41.62/no
                  </p>
                </div>
              </div>

              <div className=" w-sm-b rounded-md relative max-sm:w-2/5 ">
                <img
                  src="/images/catbanner-04.jpg"
                  className="rounded-md"
                  alt="main-banner"
                />
                <div className="absolute inset-y-[20%] left-[10%] max-sm:top-[18%] ">
                  <h4 className="text-[#bf4800] capitalize max-sm:text-[12px]">
                    best sale
                  </h4>
                  <h5 className="font-medium text-xl my-3 max-sm:text-xs max-sm:my-1">
                    Laptops Max
                  </h5>
                  <p className="max-sm:text-[10px]">
                    From $1699.00 or
                    <br /> $41.62/no
                  </p>
                </div>
              </div>
            </div>
          </div>

         </section>

          <section className="bg-[#f5f5f7]">

            <Container class1="py-5 ">
              <div className="flex mt-8 items-center flex-wrap justify-between max-sm:justify-start max-sm:gap-4 max-sm:ml-7 max-sm:text-xs max-sm:w-full ">
                {services?.map((service, i) => {
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-5 max-sm:w-2/5 max-sm:mb-3 "
                    >
                      <img
                        className="max-sm:w-1/5 object-contain"
                        src={service.image}
                        alt="shipping"
                      />
                      <div>
                        <h6 className="font-medium mb-1">{service.title}</h6>
                        <p className="mb-0">{service.tagline}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Container>

            <Container class1="py-5">
              <div className=" bg-white mt-12 flex flex-wrap p-4 items-center justify-center shadow-box-shadow max-sm:mt-4 max-sm:text-xs max-sm:p-2">
                {collection.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="p-3 pl-5 w-1/4 flex items-center justify-center gap-12 border-r border-b border-[#ededed] border-solid max-sm:gap-6 max-sm:w-6/12 max-sm:p-4 max-sm:items-start "
                    >
                      <div className="flex flex-col max-sm:gap-2">
                        <h6>{item.name}</h6>
                        <p>{item.count}</p>
                      </div>
                      <img
                        className="object-contain max-sm:w-1/3"
                        src={item.image}
                        alt="camera"
                      />
                    </div>
                  );
                })}
              </div>
            </Container>

            <Container class1="py-5 max-sm:ml-8 max-sm:text-xs  ">
              <h3 className="text-2xl font-medium  ">Featured Collection</h3>

              <div className=" flex mt-8  gap-16 max-sm:flex-col max-sm:justify-center  ">
                {products &&
                  products.map((item, index) => {
                    if (item.tags === "featured") {
                      return (
                        <div className="bg-white rounded-xl flex flex-col items-center w-1/4 p-4 max-sm:w-10/12 relative">
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

                          <div className="h-72 flex items-center justify-center object-contain max-sm:h-40 [&>*:nth-child(1)]:hover:hidden [&>*:nth-child(1)]:block [&>*:nth-child(2)]:hover:block                     [&>*:nth-child(2)]:hidden  ">
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
                    }
                  })}
              </div>
            </Container>

            <Container class1="my-16 py-5 max-sm:my-10">
              <div className=" flex gap-10 max-sm:flex-wrap max-sm:mx-4 ">
                {famousCard.map((item, i) => {
                  return (
                    <div className=" rounded-lg max-sm:w-2/5 relative ">
                      <img
                        className="rounded-lg "
                        src={item.image}
                        alt="banner"
                      />
                      <div className=" font-medium absolute top-1/4 text-white left-4 max-sm:text-[10px]  max-sm:top-[10%] ">
                        <h5>{item.h5}</h5>
                        <h6>{item.h6}</h6>
                        <p>{item.p}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Container>

            <Container class1="py-5 max-sm:mx-5 ">
              <h3 className="text-2xl font-medium mb-8  ">Special Product</h3>

              <div className="flex gap-8 ">
                {products &&
                  products.map((product, index) => {
                    if (product.tags === "special") {
                      return (
                        <SpecialProduct
                          key={index}
                          id={product._id}
                          brand={product.brand}
                          title={product.title}
                          image={product.images[0].image}
                          totalratings={product.totalrating}
                          price={product.price}
                          quantity={product.quantity}
                          sold={product.sold}
                        />
                      );
                    }
                  })}
              </div>
            </Container>

            <Container class1=" mt-4 py-5 max-sm:mx-6">
              <h3 className="text-2xl font-medium">Our Popular Products</h3>

              <div className="flex mt-8  gap-16">
                {products &&
                  products.map((item, index) => {
                    if (item.tags === "popular") {
                      return (
                        <div className="bg-white rounded-xl flex flex-col items-center relative w-1/4 p-6 max-sm:w-4/5 ">
                          <div className="wishlist-icon absolute right-5 top-5">
                          <button
                            className="border-0  bg-transparent"
                            onClick={() => {
                              addToWish(item._id);
                            }}
                          >
                            <img src="/images/wish.svg" alt="wishlist" />
                          </button>
                        </div>

                          <div className="h-72 flex items-center justify-center object-contain max-sm:h-40">
                            <img
                              src={item.images[0]?.image}
                              className="block "
                              alt="watch"
                            />
                            <img
                              src={item.images[1]?.image}
                              className="hidden "
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
                            <p className="text-sm text-[#777777] mb-4">
                              {item.description.substr(0, 60) + ".."}
                            </p>
                            <p className=" text-sm mb-4">{item.price}</p>
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
                    }
                  })}
              </div>
            </Container>

            <Container class1=" my-24 py-5 max-sm:my-12">
              <div className="shadow-box-shadow p-2 bg-white">
                <Marquee className="flex">
                  <div className="mx-4 w-25">
                    <img src="/images/brand-01.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-02.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-03.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-04.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-05.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-06.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-07.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </Container>

            <Container class1=" py-5 max-sm:mx-6 max-sm:text-xs">
              <h3 className="text-3xl font-medium">Our Latest News</h3>

              <div className="flex gap-7">
                {blogs &&
                  blogs.map((item, index) => {
                    if (index < 4) {
                      return (
                        <div key={index} className="w-1/4 max-sm:w-4/5">
                          <BlogCard
                            id={item?._id}
                            title={item?.title}
                            description={item?.description.substr(0, 70) + ".."}
                            image={item?.images[0]?.image}
                            date={moment(item?.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            </Container>
            
          </section>
        </>
      )}
    </>
  );
};

export default Home;
