// Import necessary modules and components
"use client";
import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/components/application/layout/navbar/Navbar";
import SubmitLoader from "@/components/application/layout/loader/SubmitLoader";
import { InputElement } from "@/components/application/layout/input/InputElement";
import { useAlert } from "@/context/alertContext";
import { createFeedback } from "@/redux/actions/feedbackActions";
import { clearErrors } from "@/redux/reducers/feedbackReducer";

const Home = () => {
  const [feedbackFormData, setFeedbackFormData] = useState({
    name: "",
    email: "",
    rating: "",
    message: "",
  });

  const { showAlert } = useAlert();
  const dispatch = useDispatch();

  const { feedbackCreated, error, loading } = useSelector(
    (state) => state.feedback
  );

  // Handle Inputs
  const handleInputChange = (e) => {
    const updatedFeedbackFormData = {
      ...feedbackFormData,
      [e.target.name]: e.target.value,
    };
    setFeedbackFormData(updatedFeedbackFormData);
  };

  // Submit Form
  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(createFeedback(feedbackFormData));
  };

  useEffect(() => {
    if (error) {
      showAlert(error, "error");
      dispatch(clearErrors());
    }
    if (feedbackCreated) {
      showAlert("Mail sent successfully", "success");
      dispatch(clearErrors());
      setFeedbackFormData({
        name: "",
        email: "",
        rating: "",
        message: "",
      });
    }
  }, [error, feedbackCreated, dispatch, showAlert]);

  return (
    <Fragment>
      <Head>
        <title>Feedback to Shovee</title>
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Submit Loader */}
      {loading && <SubmitLoader />}

      <>
        <div className='px-[20px] pb-[30px] pt-[80px] m-auto min-h-[100vh] md:w-[600px]'>
          {/* Form Heading */}
          <h2 className='text-3xl text-center mb-3'>Feedback</h2>
          <form action='post' onSubmit={submitHandler}>
            <div className='md:px-[20px] py-[20px] md:border border-gray-600 flex flex-col gap-4 rounded dark:md:bg-[#0a0a0a]'>
              {/* Name */}
              <InputElement
                handleInputChange={handleInputChange}
                id='name'
                label='Name*'
                name='name'
                placeholder='Write your name'
                required={true}
                type='text'
                value={feedbackFormData.name || ""}
              />
              {/* Email */}
              <InputElement
                handleInputChange={handleInputChange}
                id='email'
                label='Email Id*'
                name='email'
                placeholder='Write your email address'
                required={true}
                type='email'
                value={feedbackFormData.email || ""}
              />
              {/* Rating */}
              <InputElement
                handleInputChange={handleInputChange}
                id='rating'
                label='Rating*'
                name='rating'
                placeholder='Give ratings out of 5'
                required={true}
                type='number'
                value={feedbackFormData.rating || ""}
              />
              {/* Message */}
              <InputElement
                handleInputChange={handleInputChange}
                id='message'
                label='Message*'
                name='message'
                placeholder='Write your message'
                required={true}
                type='text'
                value={feedbackFormData.message || ""}
              />
            </div>

            {/* Back Button */}
            <div className='flex justify-between items-center mt-6'>
              <Link
                className='text-white py-1 px-3 font-semibold bg-gray-600 hover:bg-gray-700 border border-gray-950  dark:border-gray-400 rounded'
                href='/'
              >
                Back To Home
              </Link>

              {/* Submit Button */}
              <button
                className='py-1 px-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded'
                disabled={loading}
                type='submit'
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </>
    </Fragment>
  );
};

export default Home;
