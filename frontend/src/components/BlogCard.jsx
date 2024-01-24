import React from "react";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const { id, title, description, image, date } = props;

  return (
    <div className="bg-white max-sm:mt-8 ">
      <div className="">
        <img src={image} className="object-fit " alt="blog" />
      </div>
      <div className="flex flex-col items-start   p-4">
        <p className="text-[#777] uppercase mb-4">{date}</p>
        <h5 className="text-2xl font-medium mb-2 ">{title}</h5>
        <p className="text-[#777] mb-4    ">{description}</p>
        <Link
          to={`/blog/${id}`}
          className="rounded-3xl font-medium bg-blue text-white py-3 px-6 text-center  mb-7 hover:bg-yellow hover:text-black"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
