import React from "react";
import { BsGithub, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import Container from "./Container";

const Footer = () => (
  <section className=" bg-blue">

    <section className="max-w-screen-xl mx-auto flex flex-col max-sm:mx-4">
    
    <footer className="py-8 flex items-center justify-between border-b border-grey border-solid max-sm:flex-col max-sm:items-start max-sm:gap-7">
      
          <div className="w-2/5 max-sm:w-full max-sm:gap-4 ">
            <div className="flex gap-5">
              <img src="/images/newsletter.png" alt="newsletter" />
              <h2 className="text-white text-4xl font-medium max-sm:text-2xl">Sign Up For Newsletter</h2>
            </div>
          </div>
         
            <div className="flex w-3/5 max-sm:w-full">
              <input
                type="text"
                className="rounded outline-none p-2 w-full "
                placeholder="Email Address"
                aria-label="Email Address"
                aria-describedby="basic-addon2"
              />
              <span className="text-white bg-black p-2 border border-solid border-white ml-[-2px] hover:shadow-box-shadow" id="basic-addon2">
                Subscribe
              </span>
            </div>
     
    </footer>

    <footer className="py-4 max-sm:text-xs">
     
        <div className="flex justify-between flex-wrap max-sm:gap-4">

          <div className="  text-white mb-4">
            <h4 className="text-2xl font-medium mb-8">Contact Us</h4>
            <div className=" flex flex-col">

              <address className="text-white fs-6">
                No.7,Perumal Kovil Street <br />
                Pudur,Ambattur,
                <br />
                chennai-600053
              </address>

              <a
                href="tel:+91 825689648 "
                className="mt-3 text-white d-block mb-1"
              >
                +91 8276573893
              </a>

              <a
                href="mailto: sudakarvenkat023@gmail.com"
                className="mt-2 d-block text-white mb-0"
              >
               sudakarvenkat023@gmail.com
              </a>

              <div className=" flex items-center gap-7 mt-6">
                <a className="text-white" href="javascrip">
                  <BsLinkedin className="fs-4" />
                </a>
                <a className="text-white" href="javascrip">
                  <BsInstagram className="fs-4" />
                </a>
                <a className="text-white" href="javascrip">
                  <BsYoutube className="fs-4" />
                </a>
                <a className="text-white" href="javascrip">
                  <BsGithub className="fs-4" />
                </a>
              </div>

            </div>
          </div>

          <div className=" text-white mb-4">
            <h4 className="text-2xl font-medium mb-4">Information</h4>
            <div className=" flex flex-col  ">
              <Link to={"privacy-policy"} className="text-white py-2 mb-1">
                Policy
              </Link>
              <Link to={"refund-policy"} className="text-white py-2 mb-1">
                Refund Policy
              </Link>
              <Link to={"shipping-policy"} className="text-white py-2 mb-1">
                Shipping Policy{" "}
              </Link>
              <Link to={"terms&condition"} className="text-white py-2 mb-1">
                Terms & Condition
              </Link>
              <Link to={"/blogs"} className="text-white py-2 mb-1">
                Blogs
              </Link>
            </div>
          </div>

          <div className=" text-white mb-4">
            <h4 className="text-2xl font-medium mb-4">Accounts</h4>
            <div className="flex flex-col">
              <Link className="text-white py-2 mb-1">About Us</Link>
              <Link className="text-white py-2 mb-1">FAQ</Link>
              <Link className="text-white py-2 mb-1">Contact</Link>
            </div>
          </div>

          <div className=" text-white mb-4">
            <h4 className="text-2xl font-medium mb-4">Ouick Links</h4>
            <div className="flex flex-col">
              <Link className="text-white py-2 mb-1">Laptops</Link>
              <Link className="text-white py-2 mb-1">HeadPhones</Link>
              <Link className="text-white py-2 mb-1">Tablets</Link>
              <Link className="text-white py-2 mb-1">Watch</Link>
            </div>
          </div>
        </div>

    </footer>

    <footer className="py-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className="text-center mb-0 text-white">
              &copy;{new Date().getFullYear()};Powered by Developer's Corner
            </p>
          </div>
        </div>
      </div>
    </footer>

    </section>

  </section>
);

export default Footer;
