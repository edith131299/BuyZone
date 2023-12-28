import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Colors from "../components/Colors";
import Container from "../components/Container";

const CompareProduct = () => {
  return (
    <>
      <BreadCrumb title={"Compare Product"} />
      <Container class1="compare-product-wrapper py-5 home-wrapper-2">
        {" "}
        <div className="row">
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src="/images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="product-card-image">
                <img src="/images/watch.jpg" alt="watch" />
              </div>
              <div className="compare-product-details">
                <h5 className="title">
                  Honor T1 7.0 1GB RAM 8 Gb ROM 7 Inch with Wifi+3G Tablet
                </h5>
                <h6 className="price mb-3 mt-3">$500</h6>
              </div>
              <div>
                <div className="product-detail">
                  <h5>Brand:</h5>
                  <p>Havells</p>
                </div>
                <div className="product-detail">
                  <h5>Type:</h5>
                  <p>watch</p>
                </div>
                <div className="product-detail">
                  <h5>Availablity:</h5>
                  <p>In Stock</p>
                </div>
                <div className="product-detail">
                  <h5>Color:</h5>
                  <Colors />
                </div>
                <div className="product-detail">
                  <h5>Size:</h5>
                  <div className="d-flex gap-10">
                    <p>S</p>
                    <p>M</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src="/images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="product-card-image">
                <img src="/images/watch.jpg" alt="watch" />
              </div>
              <div className="compare-product-details">
                <h5 className="title">
                  Honor T1 7.0 1GB RAM 8 Gb ROM 7 Inch with Wifi+3G Tablet
                </h5>
                <h6 className="price mb-3 mt-3">$500</h6>
              </div>
              <div>
                <div className="product-detail">
                  <h5>Brand:</h5>
                  <p>Havells</p>
                </div>
                <div className="product-detail">
                  <h5>Type:</h5>
                  <p>watch</p>
                </div>
                <div className="product-detail">
                  <h5>Availablity:</h5>
                  <p>In Stock</p>
                </div>
                <div className="product-detail">
                  <h5>Color:</h5>
                  <Colors />
                </div>
                <div className="product-detail">
                  <h5>Size:</h5>
                  <div className="d-flex gap-10">
                    <p>S</p>
                    <p>M</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CompareProduct;
