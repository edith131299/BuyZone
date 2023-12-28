import React from "react";
import BreadCrumb from "../components/BreadCrumb";

const TermAndCondition = () => {
  return (
    <>
      <BreadCrumb title={"Terms and Condition"} />
      <section className="policy-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermAndCondition;
