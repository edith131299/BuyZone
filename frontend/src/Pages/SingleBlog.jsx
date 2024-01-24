import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useLocation, useParams } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBlog } from "../features/Blog/blogSlice";
import Container from "../components/Container";
import Metadata from "../components/MetaData";

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
      <BreadCrumb title={"Blogs"} />
      <Metadata title={"Blog"} />
      <Container class1="py-5 max-sm:mx-3">
        <Link to={"/blogs"} className="flex items-center gap-3 mt-1 text-[#777]">
          <HiOutlineArrowLeft className="text-2xl " />
          Go Back to Blogs
        </Link>
        <h3 className="mt-6 font-medium text-2xl" >
          {singleBlog?.title}
        </h3>
        <img
          src={singleBlog?.images[0].image}
          alt="blog-image"
          className="w-4/5 my-4"
        />
        <p className="my-10 text-justify whitespace-break-spaces ">{singleBlog?.description}</p>
      </Container>
    </>
  );
};

export default SingleBlog;
