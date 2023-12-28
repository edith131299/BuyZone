import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/Product/productSlice";
import Metadata from "../components/MetaData";
import Loader from "./Utils/loader";

const OurStore = () => {
  const [grid, setGrid] = useState();

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productState.products);

  const { isLoading } = useSelector((state) => state.productState);

  // For storing the filter value

  const [brand, setBrand] = useState(null);

  const [category, setCategory] = useState(null);

  const [tag, setTag] = useState(null);

  const [minPrice, setMinPrice] = useState(null);

  const [maxPrice, setMaxPrice] = useState(null);

  const [sort, setSort] = useState(null);

  // To remove duplicates in filter

  const [brands, setBrands] = useState([]);

  const [categories, setCategories] = useState([]);

  const [tags, setTags] = useState([]);

  const getProducts = () => {
    dispatch(
      getAllProducts({ sort, brand, tag, minPrice, maxPrice, category })
    );
  };

  // Get All Products UseEffect
  useEffect(() => {
    if (!products) {
      getProducts();
    }
  }, [sort, brand, tag, minPrice, maxPrice, category]);

  //Filter Use Effect

  useEffect(() => {
    let newBrands = [];
    let newCategories = [];
    let newTags = [];
    products &&
      products.map((product) => {
        newBrands.push(product.brand);
        newCategories.push(product.category);
        newTags.push(product.tags);
      });

    setBrands([...new Set(newBrands)]);
    setCategories([...new Set(newCategories)]);
    setTags([...new Set(newTags)]);
  }, []);

  return (
    <>
      <BreadCrumb title="Our Store" />
      <Metadata title={"Our Store"} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="store-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
              <div className="row">
                <div className="col-3">
                  <div className="filter-card mb-3">
                    <h3 className="filter-title">Show By Categories</h3>
                    {categories &&
                      categories.map((category, index) => {
                        return (
                          <ul
                            key={index}
                            onClick={() => setCategory(category)}
                            className="ps-0"
                          >
                            <li>{category}</li>
                          </ul>
                        );
                      })}
                  </div>
                  <div className="filter-card mb-3">
                    <h3 className="filter-title">Filter By </h3>

                    <div>
                      <h5 className="sub-title">Price</h5>
                      <div className="d-flex align-items-center gap-10">
                        <div className="form-floating ">
                          <input
                            type="email"
                            className="form-control "
                            id="floatingInput"
                            placeholder="From"
                            onChange={(e) => setMinPrice(e.target.value)}
                          />
                          <label htmlFor="floatingInput">From</label>
                        </div>
                        <div className="form-floating ">
                          <input
                            type="email"
                            className="form-control "
                            id="floatingInput"
                            placeholder="To"
                            onChange={(e) => setMaxPrice(e.target.value)}
                          />
                          <label htmlFor="floatingInput1">To</label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 mb-4">
                      <h3 className="filter-title">Product Tags</h3>
                      <div>
                        <div className="product-tag d-flex flex-wrap align-items-center gap-10">
                          {tags &&
                            tags.map((tag, index) => {
                              return (
                                <span
                                  key={index}
                                  onClick={() => setTag(tag)}
                                  className="badge fs-6 bg-light text-secondary  rounded-3 py-2 px-3"
                                >
                                  {tag}
                                </span>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    <div className="sub-title">
                      <h3 className="filter-title">Product brands</h3>
                      <div>
                        <div className="product-tag d-flex flex-wrap align-items-center gap-10">
                          {brands &&
                            brands.map((brand, index) => {
                              return (
                                <span
                                  key={index}
                                  onClick={() => setBrand(brand)}
                                  className="badge fs-6 bg-light text-secondary  rounded-3 py-2 px-3"
                                >
                                  {brand}
                                </span>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-9">
                  <div className="filter-sort-grid mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-10">
                        <p className="mb-0 d-block " style={{ width: "100px" }}>
                          Sort By:
                        </p>
                        <select
                          name=""
                          className="form-control form-select"
                          id=""
                          onChange={(e) => setSort(e.target.value)}
                        >
                          <option value="title">Alphabetically, A-Z</option>
                          <option value="-title">Alphabetically, Z-A</option>
                          <option value="price">Price, Low to High</option>
                          <option value="-price">Price, High to Low </option>
                          <option value="createdAt">Date, old to new</option>
                          <option value="-createdAt">Date, new to old</option>
                        </select>
                      </div>
                      <div className="d-flex align-items-center gap-10">
                        <p className="totalproducts mb-0 ">21 Products</p>
                        <div className="d-flex grid gap-10 align-items-center">
                          <img
                            onClick={() => setGrid(3)}
                            className="d-block img-fluid "
                            src="/images/gr4.svg"
                            alt="grid"
                          />

                          <img
                            onClick={() => setGrid(4)}
                            className="d-block img-fluid "
                            src="/images/gr3.svg"
                            alt="grid"
                          />
                          <img
                            onClick={() => setGrid(6)}
                            className="d-block img-fluid "
                            src="/images/gr2.svg"
                            alt="grid"
                          />

                          <img
                            onClick={() => setGrid(12)}
                            className="d-block img-fluid "
                            src="/images/gr.svg"
                            alt="grid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="products-list pb-5">
                    <div className="d-flex gap-10 flex-wrap">
                      <ProductCard data={products} grid={grid} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OurStore;
<img src="/images/watch.jpg" className="" alt="" />;
