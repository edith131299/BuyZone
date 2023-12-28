import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useLocation, useParams } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBlog } from "../features/Blog/blogSlice";

const SingleBlog = () => {
  const location = useLocation();
  const { id } = useParams();

  const dispatch = useDispatch();

  const singleBlog = useSelector((state) => state?.blogState?.singleBlog?.blog);

  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, []);
  return (
    <>
      <BreadCrumb title={"Sign Up"} />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link
                  to={"/blogs"}
                  className="d-flex align-items-center gap-10 "
                >
                  <HiOutlineArrowLeft className="fs-5" />
                  Go Back to Blogs
                </Link>
                <h3 className="title" style={{ "margin-top": "24px" }}>
                  {singleBlog?.title}
                </h3>
                <img
                  src={singleBlog?.images[0].image}
                  alt="blog-image"
                  className="blog-image w-100 my-4"
                />
                <p className="mt-10">{singleBlog?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
