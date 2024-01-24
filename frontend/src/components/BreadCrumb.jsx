import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
  const { title } = props;
  return (
    <div className="bg-white mb-0 py-4">
      <div className="flex justify-center">
        <p className="text-center mb-0">
          <Link to="/" className="text-dark">
            Home &nbsp;
          </Link>
          / {title}
        </p>
      </div>
    </div>
  );
};

export default BreadCrumb;
