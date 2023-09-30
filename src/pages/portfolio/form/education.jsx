// Import necessary modules and components
"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/components/application/layout/navbar/Navbar";
import SubmitLoader from "@/components/application/layout/loader/SubmitLoader";
import Loader from "@/components/application/layout/loader/Loader";
import { InputElement } from "@/components/application/layout/input/InputElement";
import { useAlert } from "@/context/alertContext";
import { useAuthContext } from "@/context/authContext";
import { authGetHome, createEducation } from "@/redux/actions/portfolioActions";
import { clearErrors } from "@/redux/reducers/homeDataReducer";
import {
  resetEducation,
  clearErrors as clearErrors2,
} from "@/redux/reducers/educationReducer";
import { SavedEducationBox } from "@/components/application/boxes/savedEducationBox";

const Education = () => {
  const [educationArray, setEducationArray] = useState([]);
  const [educationForm, setEducationForm] = useState({
    degree: "",
    institution: "",
    studyPeriod: "",
    status: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuthContext();
  const { showAlert } = useAlert();
  const { home, loading, error } = useSelector((state) => state.homeData);
  const {
    educationCreated,
    loading: loading2,
    error: error2,
  } = useSelector((state) => state.education);

  // Handle Inputs
  const handleInputChange = (e) => {
    setEducationForm({ ...educationForm, [e.target.name]: e.target.value });
  };

  // Save Education
  const saveEducation = (e) => {
    e.preventDefault();

    setEducationArray([...educationArray, educationForm]);
    setEducationForm({
      degree: "",
      institution: "",
      studyPeriod: "",
      status: "",
    });
  };

  // Clear Form
  const clearEducationForm = () => {
    setEducationForm({
      degree: "",
      institution: "",
      studyPeriod: "",
      status: "",
    });
  };

  // Form Submit
  const submitHandler = () => {
    const { degree, institution, studyPeriod, status } = educationForm;

    if (degree || institution || studyPeriod || status) {
      return showAlert("Save form data otherwise clear it.", "error");
    }

    dispatch(
      createEducation({
        userId: user.uid,
        userName: home.userName,
        educations: educationArray,
      })
    );
  };

  useEffect(() => {
    if (educationCreated) {
      showAlert("Education created successfully !", "success");
      dispatch(resetEducation());
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
  }, [educationCreated, error, error2, router, dispatch, showAlert]);

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
  }, [educationArray]);

  return (
    <Fragment>
      <Head>
        <title>Create Education</title>
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
            <h2 className='text-3xl text-center mb-3'>Create Education</h2>
            <form action='post' onSubmit={saveEducation}>
              <div className='md:px-[20px] py-[20px] md:border border-gray-600 flex flex-col gap-4 rounded dark:md:bg-[#0a0a0a]'>
                {/* Degree Name */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='degree'
                  label='Degree Name*'
                  name='degree'
                  placeholder='Write Degree Name'
                  required={true}
                  type={"text"}
                  value={educationForm.degree}
                />
                {/* Institution Name */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='institution'
                  label='Institution Name*'
                  name='institution'
                  placeholder='Write Institution Name'
                  required={true}
                  type={"text"}
                  value={educationForm.institution}
                />
                {/* Study Period */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='studyPeriod'
                  label='Study Period'
                  name='studyPeriod'
                  placeholder='Example - 2020-2023'
                  required={false}
                  type={"text"}
                  value={educationForm.studyPeriod}
                />
                {/* Degree Status */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='status'
                  label='Degree Status'
                  name='status'
                  placeholder='Write your degree Status'
                  required={false}
                  type={"text"}
                  value={educationForm.status}
                />
              </div>

              {/* Back Button */}
              <div className='flex justify-between items-center mt-6'>
                <Link
                  className='text-white py-1 px-3 font-semibold bg-gray-600 hover:bg-gray-700 border border-gray-950  dark:border-gray-400 rounded'
                  href='/auth/profile'
                >
                  Back to Profile
                </Link>

                {/* Clear Button */}
                <div className='flex gap-3'>
                  <button
                    className='py-1 px-3 font-semibold bg-amber-600 hover:bg-amber-700 rounded'
                    onClick={clearEducationForm}
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

              {/* Saved Education */}
              <div className='mt-6'>
                {educationArray.map((education, index) => {
                  return (
                    <SavedEducationBox
                      degree={education.degree}
                      educationArray={educationArray}
                      index={index}
                      institution={education.institution}
                      key={index}
                      setEducationArray={setEducationArray}
                      setEducationForm={setEducationForm}
                      status={education.status}
                      studyPeriod={education.studyPeriod}
                    />
                  );
                })}
              </div>

              {/* Submit Button */}

              {educationArray.length !== 0 && (
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

export default Education;
