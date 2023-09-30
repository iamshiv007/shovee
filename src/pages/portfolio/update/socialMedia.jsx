// Import necessary modules and components
"use client";
import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/components/application/layout/navbar/Navbar";
import SubmitLoader from "@/components/application/layout/loader/SubmitLoader";
import { InputElement } from "@/components/application/layout/input/InputElement";
import { useAuthContext } from "@/context/authContext";
import { useAlert } from "@/context/alertContext";
import { authGetHome, updateHome } from "@/redux/actions/portfolioActions";
import { clearErrors } from "@/redux/reducers/homeDataReducer";
import {
  resetHome,
  clearErrors as clearErrors2,
} from "@/redux/reducers/homeReducer";
import Loader from "@/components/application/layout/loader/Loader";

// Main Page component
const SocialMedia = () => {
  const [socialMediaForm, setSocialMediaForm] = useState({
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { showAlert } = useAlert();

  const { home, error, loading } = useSelector((state) => state.homeData);
  const {
    homeUpdated,
    error: error2,
    loading: loading2,
  } = useSelector((state) => state.home);

  useEffect(() => {
    if (homeUpdated) {
      showAlert("Social Media data updated successfully", "success");
      dispatch(resetHome());
      router.push("/auth/profile");
    }
    if (error) {
      showAlert(error, "error");
      dispatch(clearErrors());
      router.push("/");
    }
    if (error2) {
      showAlert(error2, "error");
      dispatch(clearErrors2());
    }
  }, [homeUpdated, error, error2, dispatch, router, showAlert]);

  useEffect(() => {
    if (user?.uid) {
      dispatch(authGetHome(user?.uid));
    } else {
      router.push("/");
    }
  }, [user, dispatch, router]);

  useEffect(() => {
    setSocialMediaForm(home?.socialMedia);
  }, [home]);

  const handleInputChange = (e) => {
    setSocialMediaForm({
      ...socialMediaForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateHome(home._id, {
        socialMedia: socialMediaForm,
      })
    );
  };

  return (
    <Fragment>
      <Head>
        <title>Update Social Media</title>
      </Head>

      {/* Navbar */}
      <Navbar />

      {loading2 && <SubmitLoader />}

      {!user?.uid || loading ? (
        <Loader />
      ) : (
        <>
          <div className='px-[20px] pb-[30px] pt-[80px] m-auto min-h-[100vh] md:w-[600px]'>
            {/* Form Heading */}
            <h2 className='text-3xl text-center mb-3'>Update Social Media</h2>
            <form action='put' onSubmit={submitHandler}>
              <div className='md:px-[20px] py-[20px] md:border border-gray-600 flex flex-col gap-4 rounded dark:md:bg-[#0a0a0a]'>
                {/* Github */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='github'
                  label='GitHub'
                  name='github'
                  placeholder='Write Your GitHub Account URL'
                  required={false}
                  type={"url"}
                  value={socialMediaForm?.github || ""}
                />
                {/* LinkedIn */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='linkedin'
                  label='LinkedIn'
                  name='linkedin'
                  placeholder='Write Your LinkedIn Account URL'
                  required={false}
                  type={"url"}
                  value={socialMediaForm?.linkedin || ""}
                />
                {/* twitter */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='twitter'
                  label='Twitter'
                  name='twitter'
                  placeholder='Write Your Twitter Account URL'
                  required={false}
                  type={"url"}
                  value={socialMediaForm?.twitter || ""}
                />
                {/* Instagram */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='instagram'
                  label='Instagram'
                  name='instagram'
                  placeholder='Write Your Instagram Account URL'
                  required={false}
                  type={"url"}
                  value={socialMediaForm?.instagram || ""}
                />
              </div>

              {/* Button - Submit and back */}
              <div className='flex justify-between items-center mt-6'>
                <Link
                  className='text-white py-1 px-3 font-semibold bg-gray-600 hover:bg-gray-700 border border-gray-950  dark:border-gray-400 rounded'
                  href='/auth/profile'
                >
                  Back to Profile
                </Link>

                <button
                  className='py-1 px-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded'
                  disabled={loading2}
                  type='submit'
                >
                  {loading2 ? "Sending..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default SocialMedia;
