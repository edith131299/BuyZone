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

  const getBlog = () => {
    dispatch(getAllBlogs());
  };

  const blogs = useSelector((state) => state.blogState.allBlogs?.blogs);

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <BreadCrumb title={"Blogs"} />
      <MetaData title={"Blogs"} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Find By Categories</h3>
              <ul className="ps-0">
                <li>Watch</li>
                <li>Tv</li>
                <li>Camera</li>
                <li>laptop</li>
              </ul>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              {blogs &&
                blogs.map((item, index) => {
                  return (
                    <div key={index} className="col-6 mb-3">
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
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
