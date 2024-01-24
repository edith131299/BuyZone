import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard";
import MetaData from "../components/MetaData";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/Blog/blogSlice";
import moment from "moment";

const Blog = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogState.allBlogs?.blogs);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  return (
    <>
      <BreadCrumb title={"Blogs"} />
      <MetaData title={"Blogs"} />
      <Container class1="py-5  ">
        <section className="flex gap-8 mt-5 max-sm:flex-col mx-3">

          <div className=" bg-white flex flex-col p-5 rounded gap-5 w-1/5 h-1/2 max-sm:w-full ">

            <h3 className="font-medium text-black">Find By Categories</h3>

            <ul className=" text-[#777] flex flex-col gap-2 max-sm:flex-row max-sm:gap-4">
              <li>Watch</li>
              <li>Tv</li>
              <li>Camera</li>
              <li>laptop</li>
            </ul>

          </div>

          <div className="max-sm:w-4/5 flex gap-6 flex-wrap ">
            {blogs &&
              blogs.map((item, index) => {
                return (
                  <div key={index} className="mb-3 w-80">
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
              })}
          </div>
        </section>
      </Container>
    </>
  );
};

export default Blog;
