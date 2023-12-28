import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "./Utils/Data";
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

  const { products } = useSelector(
    (state) => state.productState.products
  );
  const { isLoading } = useSelector(
    (state) => state.productState
  );

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
          <Container class1="home-wrapper-1 py-5">
            <div className="row">
              <div className="col-6">
                <div className="main-banner position-relative ">
                  <img
                    src="/images/main-banner-1.jpg"
                    className="img-fluid rounded-3"
                    alt="main-banner"
                  />
                  <div className="main-banner-content position-absolute">
                    <h4>SUPERCHARGED FOR PROS</h4>
                    <h5>iPad S13+ Pro</h5>
                    <p>
                      From $999.00 or $41.62/no <br /> for 24mo.Footnote*
                    </p>
                    <Link className="button">Buy Now</Link>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex flex-wrap justify-content-between gap-10 align-items-center">
                  <div className="small-banner position-relative ">
                    <img
                      src="/images/catbanner-01.jpg"
                      className="img-fluid rounded-3"
                      alt="main-banner"
                    />
                    <div className="small-banner-content position-absolute">
                      <h4>best sale</h4>
                      <h5>Laptops Max</h5>
                      <p>
                        From $1699.00 or
                        <br /> $41.62/no
                      </p>
                    </div>
                  </div>
                  <div className="small-banner position-relative ">
                    <img
                      src="/images/catbanner-02.jpg"
                      className="img-fluid rounded-3"
                      alt="main-banner"
                    />
                    <div className="small-banner-content position-absolute">
                      <h4>New Normal</h4>
                      <h5>Buy IPAD Air</h5>
                      <p>
                        From $599 or <br />
                        $41.62/no for 12 mo*
                      </p>
                    </div>
                  </div>
                  <div className="small-banner position-relative ">
                    <img
                      src="/images/catbanner-03.jpg"
                      className="img-fluid rounded-3"
                      alt="main-banner"
                    />
                    <div className="small-banner-content position-absolute">
                      <h4>New Normal</h4>
                      <h5>Buy IPAD Air</h5>
                      <p>
                        From $599 or <br />
                        $41.62/no for 12 mo*
                      </p>
                    </div>
                  </div>
                  <div className="small-banner position-relative ">
                    <img
                      src="/images/catbanner-04.jpg"
                      className="img-fluid rounded-3"
                      alt="main-banner"
                    />
                    <div className="small-banner-content position-absolute">
                      <h4>New Normal</h4>
                      <h5>Buy IPAD Air</h5>
                      <p>
                        From $599 or <br />
                        $41.62/no for 12 mo*
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <Container class1="home-wrapper-2 py-5">
            <div className="row">
              <div className="col-12">
                <div className="services d-flex col-12 align-items-center justify-content-between ">
                  {services?.map((service, i) => {
                    return (
                      <div key={i} className="d-flex align-items-center gap-15">
                        <img src={service.image} alt="shipping" />
                        <div>
                          <h6>{service.title}</h6>
                          <p className="mb-0">{service.tagline}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>

          <Container class1="home-wrapper-2 py-5">
            <div className="row">
              <div className="col-12">
                <div className="categories d-flex flex-wrap justify-content-between align-items-center">
                  <div className="d-flex gap-30 align-items-center">
                    <div>
                      <h6>Camera</h6>
                      <p>10 Items</p>
                    </div>
                    <img src="/images/camera.jpg" alt="camera" />
                  </div>
                  <div className="d-flex gap-30 align-items-center">
                    <div>
                      <h6>Smart Tv</h6>
                      <p>10 Items</p>
                    </div>
                    <img src="/images/tv.jpg" alt="camera" />
                  </div>
                  <div className="d-flex gap-30 align-items-center">
                    <div>
                      <h6>Smart Watches</h6>
                      <p>10 Items</p>
                    </div>
                    <img src="/images/camera.jpg" alt="camera" />
                  </div>
                  <div className="d-flex gap-30 align-items-center">
                    <div>
                      <h6>Camera</h6>
                      <p>10 Items</p>
                    </div>
                    <img src="/images/headphone.jpg" alt="camera" />
                  </div>
                  <div className="d-flex gap-30 align-items-center">
                    <div>
                      <h6>Camera</h6>
                      <p>10 Items</p>
                    </div>
                    <img src="/images/camera.jpg" alt="camera" />
                  </div>
                  <div className="d-flex gap-30 align-items-center">
                    <div>
                      <h6>Smart Tv</h6>
                      <p>10 Items</p>
                    </div>
                    <img src="/images/tv.jpg" alt="camera" />
                  </div>
                  <div className="d-flex gap-30 align-items-center">
                    <div>
                      <h6>Smart Watches</h6>
                      <p>10 Items</p>
                    </div>
                    <img src="/images/camera.jpg" alt="camera" />
                  </div>
                  <div className="d-flex gap-30 align-items-center">
                    <div>
                      <h6>Camera</h6>
                      <p>10 Items</p>
                    </div>
                    <img src="/images/headphone.jpg" alt="camera" />
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <Container class1="featured-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h3 className="section-heading">Featured Collection</h3>
              </div>
            </div>
            <div className="row">
              {products &&
                products.map((item, index) => {
                  if (item.tags === "featured") {
                    return (
                      <div key={index} className={"col-3"}>
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
                              onClick={() => navigate(`/product/${item._id}`)}
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
                            <p className={`description `}>
                              {item.description.substr(0, 60) + ".."}
                            </p>
                            <p className="price">{item.price}</p>
                          </div>
                          {/* <div className="action-bar position-absolute ">
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
                      </div>
                    );
                  }
                })}
            </div>
          </Container>

          <Container class1="famous-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-3">
                <div className="famous-card position-relative">
                  <img
                    className="img-fluid"
                    src="/images/catbanner-01.jpg"
                    alt="banner"
                  />
                  <div className="famous-content position-absolute">
                    <h5>Big Screen</h5>
                    <h6>Smart Watch Series 7</h6>
                    <p>From $399 or $16.62/mo. for 24 mo.</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="famous-card position-relative">
                  <img
                    className="img-fluid"
                    src="/images/catbanner-01.jpg"
                    alt="banner"
                  />
                  <div className="famous-content position-absolute">
                    <h5>Big Screen</h5>
                    <h6>Smart Watch Series 7</h6>
                    <p>From $399 or $16.62/mo. for 24 mo.</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="famous-card position-relative">
                  <img
                    className="img-fluid"
                    src="/images/catbanner-01.jpg"
                    alt="banner"
                  />
                  <div className="famous-content position-absolute">
                    <h5>Big Screen</h5>
                    <h6>Smart Watch Series 7</h6>
                    <p>From $399 or $16.62/mo. for 24 mo.</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="famous-card position-relative">
                  <img
                    className="img-fluid"
                    src="/images/catbanner-01.jpg"
                    alt="banner"
                  />
                  <div className="famous-content position-absolute">
                    <h5>Big Screen</h5>
                    <h6>Smart Watch Series 7</h6>
                    <p>From $399 or $16.62/mo. for 24 mo.</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <Container class1="special-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h3 className="section-heading">Special Product</h3>
              </div>
            </div>
            <div className="row ">
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

          <Container class1="popular-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h3 className="section-heading">Our Popular Products</h3>
              </div>
            </div>
            <div className="row">
              {products &&
                products.map((item, index) => {
                  if (item.tags === "popular") {
                    return (
                      <div key={index} className={"col-3"}>
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
                              onClick={() => navigate(`/product/${item._id}`)}
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
                            <p className={`description `}>
                              {item.description.substr(0, 60) + ".."}
                            </p>
                            <p className="price">{item.price}</p>
                          </div>
                          {/* <div className="action-bar position-absolute ">
                            <div className="d-flex flex-column gap-15">
                              <button className="border-0  bg-transparent">
                                <img
                                  src="/images/prodcompare.svg"
                                  alt="compare"
                                />
                              </button>
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
                      </div>
                    );
                  }
                })}
            </div>
          </Container>

          <Container class1="marque-wrapper py-5">
            <div className="row">
              <div className="col-12">
                <div className="marquee-inner-wrapper card-wrapper">
                  <Marquee className="d-flex">
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
              </div>
            </div>
          </Container>

          <Container class1="blog-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h3 className="section-heading">Our Latest News</h3>
              </div>
            </div>
            <div className="row">
              {blogs &&
                blogs.map((item, index) => {
                  if (index < 4) {
                    return (
                      <div key={index} className="col-3">
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
        </>
      )}
    </>
  );
};

export default Home;
