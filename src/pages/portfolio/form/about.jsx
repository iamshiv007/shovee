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
import { SelectElement } from "@/components/application/layout/input/SelectElement";
import { TextAreaElement } from "@/components/application/layout/input/TextAreaElement";
import { ExperienceOptions } from "@/components/application/layout/input/optionsData/experienceOptions";
import { useAuthContext } from "@/context/authContext";
import { useAlert } from "@/context/alertContext";
import { authGetHome, createAbout } from "@/redux/actions/portfolioActions";
import { clearErrors } from "@/redux/reducers/homeDataReducer";
import {
  resetAbout,
  clearErrors as clearErrors2,
} from "@/redux/reducers/aboutReducer";

// Main Page component
const About = () => {
  const [aboutFormData, setAboutFormData] = useState({
    fullName: "",
    location: "",
    age: "",
    experience: "",
    projects: "",
    objective: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuthContext();
  const { showAlert } = useAlert();
  const { home, loading, error } = useSelector((state) => state.homeData);
  const {
    aboutCreated,
    loading: loading2,
    error: error2,
  } = useSelector((state) => state.about);

  // Handle Inputs
  const handleInputChange = (e) => {
    setAboutFormData({ ...aboutFormData, [e.target.name]: e.target.value });
  };

  // Form Submit
  const submitHandler = (e) => {
    e.preventDefault();

    const { fullName, location, age, experience, projects, objective } =
      aboutFormData;

    dispatch(
      createAbout({
        userId: user.uid,
        userName: home.userName,
        fullName,
        location,
        age,
        experience,
        projects,
        objective,
      })
    );
  };

  useEffect(() => {
    if (aboutCreated) {
      showAlert("About created successfully !", "success");
      dispatch(resetAbout());
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
  }, [aboutCreated, error, error2, router, dispatch, showAlert]);

  useEffect(() => {
    if (user?.uid) {
      dispatch(authGetHome(user.uid));
    } else {
      router.push("/");
    }
  }, [user, router, dispatch]);

  return (
    <Fragment>
      <Head>
        <title>Create About</title>
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
            <h2 className='text-3xl text-center mb-3'>Create About</h2>
            <form action='post' onSubmit={submitHandler}>
              <div className='md:px-[20px] py-[20px] md:border border-gray-600 flex flex-col gap-4 rounded dark:md:bg-[#0a0a0a]'>
                {/* Full Name */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='fullName'
                  label='Full Name*'
                  name='fullName'
                  placeholder='Write Your Full Name'
                  required={true}
                  type={"text"}
                  value={aboutFormData.fullName}
                />
                {/* Location */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='location'
                  label='Location*'
                  name='location'
                  placeholder='City, State, Country'
                  required={true}
                  type={"text"}
                  value={aboutFormData.location}
                />
                {/* Age */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='age'
                  label='Age'
                  name='age'
                  placeholder='Write Your Age'
                  required={false}
                  type={"number"}
                  value={aboutFormData.age}
                />
                {/* Experience */}
                <SelectElement
                  handleInputChange={handleInputChange}
                  id='experience'
                  label='Experience'
                  name='experience'
                  placeholder='Select Your Exeperience Level'
                  required={false}
                  selectOptions={ExperienceOptions}
                  type={"text"}
                  value={aboutFormData.experience}
                />
                {/* Projects */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='projects'
                  label='Projects'
                  name='projects'
                  placeholder='How Many Projects Have You Completed?'
                  required={false}
                  type={"number"}
                  value={aboutFormData.projects}
                />
                {/* Objective */}
                <TextAreaElement
                  handleInputChange={handleInputChange}
                  id='objective'
                  label='Objective'
                  name='objective'
                  placeholder='Write Your Objective'
                  required={false}
                  rows={4}
                  type={"textArea"}
                  value={aboutFormData.objective}
                />
              </div>

              {/*  Back Button */}
              <div className='flex justify-between items-center mt-6'>
                <Link
                  className='text-white py-1 px-3 font-semibold bg-gray-600 hover:bg-gray-700 border border-gray-950  dark:border-gray-400 rounded'
                  href='/auth/profile'
                >
                  Back to Profile
                </Link>

                {/* Submit Button */}
                <button
                  className='py-1 px-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded'
                  disabled={loading2}
                  type='submit'
                >
                  {loading2 ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default About;
