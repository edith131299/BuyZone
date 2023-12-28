import React from "react";
import { BsGithub, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import Container from "./Container";

const Footer = () => (
  <>
    <footer className="py-4">
      <div className="container-xxl ">
        <div className="row align-items-center">
          <div className="col-5">
            <div className="footer-top-data d-flex gap-30 align-items-center">
              <img src="/images/newsletter.png" alt="newsletter" />
              <h2>Sign Up For Newsletter</h2>
            </div>
          </div>
          <div className="col-7">
            <div className="input-group ">
              <input
                type="text"
                className="form-control py-1"
                placeholder="Email Address"
                aria-label="Email Address"
                aria-describedby="basic-addon2"
              />
              <span className="input-group-text p-2" id="basic-addon2">
                Subscribe
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <footer className="py-4">
      <div className="container-xxl ">
        <div className="d-flex row">
          <div className="col-4 text-white mb-4">
            <h4>Contact Us</h4>
            <div className="mt-4">
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
                +91 sudakarvenkat023@gmail.com
              </a>
              <div className="social-icons d-flex align-items-center gap-30 mt-4">
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
          <div className="col-3 text-white mb-4">
            <h4>Information</h4>
            <div className="footer-links d-flex flex-column">
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
          <div className="col-3 text-white mb-4">
            <h4>Accounts</h4>
            <div className="footer-Links d-flex flex-column">
              <Link className="text-white py-2 mb-1">About Us</Link>
              <Link className="text-white py-2 mb-1">FAQ</Link>
              <Link className="text-white py-2 mb-1">Contact</Link>
            </div>
          </div>
          <div className="col-2 text-white mb-4">
            <h4>Ouick Links</h4>
            <div className="footer-links d-flex flex-column">
              <Link className="text-white py-2 mb-1">Laptops</Link>
              <Link className="text-white py-2 mb-1">HeadPhones</Link>
              <Link className="text-white py-2 mb-1">Tablets</Link>
              <Link className="text-white py-2 mb-1">Watch</Link>
            </div>
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
  </>
);

export default Footer;
