import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/Product/productSlice";
import Metadata from "../components/MetaData";
import Loader from "./Utils/loader";
import Container from "../components/Container";

const OurStore = (search) => {

  console.log(search);

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
      getAllProducts({ sort, brand, tag, minPrice, maxPrice, category ,search})
    );
  };

  // Get All Products UseEffect
  useEffect(() => {
    
      getProducts();
    
    
  }, [sort, brand, tag, minPrice, maxPrice, category,search]);


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
    console.log(brand);
  }, []);

  return (
    <>
      <BreadCrumb title="Our Store" />
      <Metadata title={"Our Store"} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Container class1=" my-6 py-5 ">
            <div className="flex gap-8 max-sm:flex-col max-sm:justify-center max-sm:items-center ">
              <div className="w-1/4 flex flex-col gap-4 max-sm:w-4/5">
                <div className=" bg-white p-6 mb-3 rounded-lg max-sm:py-4">
                  <h3 className="text-xl font-medium mb-4 max-sm:text-md ">
                    Show By Categories
                  </h3>
                  <div className="max-sm:flex max-sm:gap-4 max-sm:flex-wrap max-sm:text-sm">
                    {categories &&
                      categories.map((category, index) => {
                        return (
                          <ul
                            key={index}
                            onClick={() => setCategory(category)}
                            className=" "
                          >
                            <li className="mb-5 text-[#777] text-base">
                              {category}
                            </li>
                          </ul>
                        );
                      })}
                  </div>
                </div>

                <div className="  bg-white p-6 mb-3 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Filter By </h3>

                  <div>
                    <h5 className="font-medium mb-3">Price</h5>

                    <div className="flex  items-center ">
                      <div className=" ">
                        <input
                          type="number"
                          className="border border-zinc-400 outline-none px-2 py-3 w-4/5  text-black "
                          id="floatingInput"
                          placeholder="From"
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <label
                          className="hidden text-black"
                          htmlFor="floatingInput"
                        >
                          From
                        </label>
                      </div>

                      <div className=" ">
                        <input
                          type="number"
                          className=" outline-none border border-zinc-400 px-2 py-3 w-4/5 text-black "
                          id="floatingInput"
                          placeholder="To"
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <label className="hidden" htmlFor="floatingInput1">
                          To
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className=" mt-4 mb-4">
                    <h5 className="font-medium mb-4">Product Tags</h5>
                    <div>
                      <div className="flex flex-wrap items-center gap-4">
                        {tags &&
                          tags.map((tag, index) => {
                            return (
                              <span
                                key={index}
                                onClick={() => setTag(tag)}
                                className=" bg-[#f8f9fa] text-base font-bold text-[#6c757d]  rounded-md py-2 px-3"
                              >
                                {tag}
                              </span>
                            );
                          })}
                      </div>
                    </div>
                  </div>

                  <div className="sub-title">
                    <h3 className="font-medium mb-4">Product brands</h3>

                    <div className="flex flex-wrap items-center gap-4">
                      {brands &&
                        brands.map((brand, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => setBrand(brand)}
                              className="bg-[#f8f9fa] text-base font-bold text-[#6c757d]  rounded-md py-2 px-3"
                            >
                              {brand}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-3/4 flex flex-col">
                <div className="flex justify-between items-center bg-white rounded-md py-4 px-4 max-sm:text-sm max-sm:flex-col max-sm:items-start max-sm:gap-2 ">
                  <div className="flex items-center gap-3">
                    <p className="mb-0 d-block ">Sort By:</p>

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

                  <div className="flex items-center gap-10">
                    <p className="totalproducts mb-0 ">21 Products</p>
                    {/* <div className="flex  gap-4 items-center">
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
                    </div> */}
                  </div>
                </div>

                <div className="products-list pb-5">
                  <div className="flex gap-4 flex-wrap">
                    <ProductCard data={products} grid={grid} />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default OurStore;
