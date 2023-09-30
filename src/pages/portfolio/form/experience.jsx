// Import necessary modules and components
"use client";
import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/components/application/layout/navbar/Navbar";
import SubmitLoader from "@/components/application/layout/loader/SubmitLoader";
import Loader from "@/components/application/layout/loader/Loader";
import { InputElement } from "@/components/application/layout/input/InputElement";
import { TextAreaElement } from "@/components/application/layout/input/TextAreaElement";
import { SavedExperienceBox } from "@/components/application/boxes/savedExperienceBox";
import { useAlert } from "@/context/alertContext";
import { useAuthContext } from "@/context/authContext";
import {
  authGetHome,
  createExperience,
} from "@/redux/actions/portfolioActions";
import { clearErrors } from "@/redux/reducers/homeDataReducer";
import {
  resetExperience,
  clearErrors as clearErrors2,
} from "@/redux/reducers/experienceReducer";

const Experience = () => {
  const [experienceArray, setExperienceArray] = useState([]);
  const [experienceForm, setExperienceForm] = useState({
    companyName: "",
    location: "",
    role: "",
    jobPeriod: "",
    details: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuthContext();
  const { showAlert } = useAlert();
  const { home, loading, error } = useSelector((state) => state.homeData);
  const {
    experienceCreated,
    loading: loading2,
    error: error2,
  } = useSelector((state) => state.experience);

  // Handle Inputs
  const handleInputChange = (e) => {
    setExperienceForm({ ...experienceForm, [e.target.name]: e.target.value });
  };

  // Save Experience
  const saveExperience = (e) => {
    e.preventDefault();

    setExperienceArray([...experienceArray, experienceForm]);
    setExperienceForm({
      companyName: "",
      location: "",
      role: "",
      jobPeriod: "",
      details: "",
    });
  };

  // Clear Form
  const clearExperienceForm = () => {
    setExperienceForm({
      companyName: "",
      location: "",
      role: "",
      jobPeriod: "",
      details: "",
    });
  };

  // Form Submit
  const submitHandler = () => {
    const { companyName, location, role, jobPeriod, details } = experienceForm;

    if (companyName || location || role || jobPeriod || details) {
      return showAlert("Save form data otherwise clear it.", "error");
    }

    dispatch(
      createExperience({
        userId: user.uid,
        userName: home.userName,
        experiences: experienceArray,
      })
    );
  };

  useEffect(() => {
    if (experienceCreated) {
      showAlert("Experience page created successfully !", "success");
      dispatch(resetExperience());
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
  }, [experienceCreated, error, error2, router, dispatch, showAlert]);

  useEffect(() => {
    if (user?.uid) {
      dispatch(authGetHome(user.uid));
    } else {
      router.push("/");
    }
  }, [user, router, dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight, // Scroll to the bottom of the page
      behavior: "smooth", // Use smooth scrolling animation
    });
  }, [experienceArray]);

  return (
    <Fragment>
      <Head>
        <title>Create Experience</title>
      </Head>

      {/* Navbar */}
      <Navbar />
      {/* Submit Loader */}
      {loading2 && <SubmitLoader />}

      {/* Loader */}
      {!user?.email || loading ? (
        <Loader />
      ) : (
        <>
          <div className='px-[20px] pb-[30px] pt-[80px] m-auto min-h-[100vh] md:w-[600px]'>
            {/* Form Heading */}
            <h2 className='text-3xl text-center mb-3'>Create Experience</h2>
            <form action='post' onSubmit={saveExperience}>
              <div className='md:px-[20px] py-[20px] md:border border-gray-600 flex flex-col gap-4 rounded dark:md:bg-[#0a0a0a]'>
                {/* Company Name */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='companyName'
                  label='Company Name*'
                  name='companyName'
                  placeholder='Write Company Name'
                  required={true}
                  type={"text"}
                  value={experienceForm.companyName}
                />
                {/* Location */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='location'
                  label='Location*'
                  name='location'
                  placeholder='Write Company Location'
                  required={true}
                  type={"text"}
                  value={experienceForm.location}
                />
                {/* Job Role */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='role'
                  label='Job Role*'
                  name='role'
                  placeholder='Write Your Job Role'
                  required={true}
                  type={"text"}
                  value={experienceForm.role}
                />
                {/* Job Period */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='jobPeriod'
                  label='Job period*'
                  name='jobPeriod'
                  placeholder='Example - December 2022 to March 2023'
                  required={true}
                  type={"text"}
                  value={experienceForm.jobPeriod}
                />
                {/* Job Details */}
                <TextAreaElement
                  handleInputChange={handleInputChange}
                  id='details'
                  label='Details'
                  name='details'
                  placeholder='Write about your responsibilities and achievements'
                  required={false}
                  rows={4}
                  value={experienceForm.details}
                />
              </div>

              {/* back button */}
              <div className='flex justify-between items-center mt-4'>
                <Link
                  className='text-white py-1 px-3 font-semibold bg-gray-600 hover:bg-gray-700 border border-gray-950  dark:border-gray-400 rounded'
                  href='/auth/profile'
                >
                  Back to Profile
                </Link>

                {/* Clear Button */}
                <div className='flex gap-3'>
                  <button
                    className='py-1 px-3 font-semibold bg-orange-600 hover:bg-orange-700 rounded'
                    onClick={clearExperienceForm}
                    type='button'
                  >
                    Clear
                  </button>

                  {/* Save Button */}
                  <button
                    className='py-1 px-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded'
                    type='submit'
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Saved Experience */}
              <div className='mt-6'>
                {experienceArray.map((experience, index) => {
                  return (
                    <SavedExperienceBox
                      companyName={experience.companyName}
                      details={experience.details}
                      experienceArray={experienceArray}
                      index={index}
                      jobPeriod={experience.jobPeriod}
                      key={index}
                      location={experience.location}
                      role={experience.role}
                      setExperienceArray={setExperienceArray}
                      setExperienceForm={setExperienceForm}
                    />
                  );
                })}
              </div>

              {/* Submit Button */}
              {experienceArray.length !== 0 && (
                <div className='mt-6 flex justify-end'>
                  <button
                    className='py-1 px-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded'
                    disabled={loading2}
                    onClick={submitHandler}
                    type='button'
                  >
                    {loading2 ? "Sending..." : "Submit"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Experience;
