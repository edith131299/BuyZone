import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import Metadata from "../components/MetaData";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { createEnquiry } from "../features/Contact/contactSlice";
import CustomInput from "../components/CustomInput";

const contactSchema = yup.object({
  name: yup.string().required("Please enter the Name"),
  email: yup.string().nullable().email("Please enter the email"),
  mobile: yup.string().required("Please enter the mobilenumber"),
  comment: yup.string().required("Please enter the comments"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createEnquiry(values));
    },
  });

  return (
    <>
      <BreadCrumb title={"Contact Us"} />
      <Metadata title="Contact-us" />
      <Container class1=" py-5 max-sm:mx-3 ">
        <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1942.756030630485!2d80.15884798857924!3d13.130067946799981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52630c1d224113%3A0x1ce5f7f340e639f8!2sPudur%2C%20Ambattur%2C%20Chennai%2C%20Tamil%20Nadu%20600053!5e0!3m2!1sen!2sin!4v1697112693646!5m2!1sen!2sin"
          width="600"
          height="450"
          className=" w-full"
          allowFullScreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className=" my-16 flex bg-white rounded-xl  p-8 max-sm:flex-col max-sm:gap-4   ">
          <div className="w-1/2 max-sm:w-full ">
            <h3 className="font-medium text-2xl mb-4">Contact</h3>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-4 "
            >
              <CustomInput
                type="text"
                className="w-11/12 py-2"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
              >
                <div className="error">
                  {formik.touched.name && formik.errors.name}
                </div>
              </CustomInput>

              <CustomInput
                type="text"
                className="w-11/12 py-2"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
              >
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
              </CustomInput>

              <CustomInput
                type="text"
                className="w-11/12 py-2"
                placeholder="Mobile Number"
                value={formik.values.mobile}
                onChange={formik.handleChange("mobile")}
              >
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </CustomInput>

              <div>
                <textarea
                  name=""
                  className="w-11/12 bg-grey p-3 rounded-md  outline-none "
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Comments"
                  value={formik.values.comment}
                  onChange={formik.handleChange("comment")}
                >
                  <div className="error">
                    {formik.touched.comment && formik.errors.comment}
                  </div>
                </textarea>
              </div>

              <button
                type="submit"
                className="w-[15%] text-sm rounded-3xl  bg-blue text-white py-3    mb-7 hover:bg-yellow hover:text-black max-sm:w-1/4"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="w-1/2 max-sm:w-full ">
            <h3 className="font-medium text-2xl mb-4">Get in touch with us</h3>

            <ul className="text-[#777] mt-7">
              <li className="mb-5 flex items-center gap-3  ">
                <AiOutlineHome className="text-black text-xl" />
                <address className=" text-[#777] mb-0">
                  Hno:7, Perumal Kovil Street,Pudur,Ambattur,Chennai-600053
                </address>
              </li>

              <li className="mb-5 flex items-center gap-3 ">
                <BiPhoneCall className="text-xl text-black" />
                <a href="tel:+91 857392748">+91 857392748</a>
              </li>

              <li className="mb-5 flex items-center gap-3 ">
                <AiOutlineMail className="text-xl text-black" />
                <a href="mailto:sudakarvenkat023@gmail.com">
                  sudakarvenkat023@gmail.com
                </a>
              </li>

              <li className="mb-5 flex items-center gap-3 ">
                <BiInfoCircle className="text-xl text-black" />
                <p>Monday - Friday 10 Am-8 PM</p>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
