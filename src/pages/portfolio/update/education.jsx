// Import necessary modules and components
"use client";
import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/components/application/layout/navbar/Navbar";
import SubmitLoader from "@/components/application/layout/loader/SubmitLoader";
import Loader from "@/components/application/layout/loader/Loader";
import { InputElement } from "@/components/application/layout/input/InputElement";
import { useAlert } from "@/context/alertContext";
import { useAuthContext } from "@/context/authContext";
import {
  authGetEducation,
  updateEducation,
} from "@/redux/actions/portfolioActions";
import { clearErrors } from "@/redux/reducers/educationDataReducer";
import {
  resetEducation,
  clearErrors as clearErrors2,
} from "@/redux/reducers/educationReducer";
import { SavedEducationBox } from "@/components/application/boxes/savedEducationBox";

// Main Page component
const Education = () => {
  const [educationArray, setEducationArray] = useState([]);
  const [educationForm, setEducationForm] = useState({
    degree: "",
    institution: "",
    studyPeriod: "",
    status: "",
    institutionImageFile: "",
    institutionImagePreview: "",
  });
  const [fileInputValue, setFileInputValue] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuthContext();
  const { showAlert } = useAlert();
  const { education, loading, error } = useSelector(
    (state) => state.educationData
  );
  const {
    educationUpdated,
    loading: loading2,
    error: error2,
  } = useSelector((state) => state.education);

  // Handle Input
  const handleInputChange = async (e) => {
    // Handle Image
    if (e.target.name === "institutionImage") {
      setFileInputValue(e.target.value);
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        reader.onload = (e) => {
          const imageUrl = e.target.result;
          setEducationForm({
            ...educationForm,
            institutionImageFile: compressedFile,
            institutionImagePreview: imageUrl,
          });
        };

        reader.readAsDataURL(compressedFile);
      } else {
        setEducationForm({
          ...educationForm,
          institutionImageFile: "",
          institutionImagePreview: "",
        });
      }
    } else {
      setEducationForm({ ...educationForm, [e.target.name]: e.target.value });
    }
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

  // Save Education
  const saveEducation = (e) => {
    e.preventDefault();

    // Reset the file input value
    setFileInputValue("");

    setEducationArray([...educationArray, educationForm]);
    setEducationForm({
      degree: "",
      institution: "",
      studyPeriod: "",
      status: "",
      institutionImageFile: "",
      institutionImagePreview: "",
    });
  };

  // Submit Form
  const submitHandler = () => {
    const {
      degree,
      institution,
      studyPeriod,
      status,
      institutionImageFile,
      institutionImagePreview,
    } = educationForm;

    if (
      degree ||
      institution ||
      studyPeriod ||
      status ||
      institutionImageFile ||
      institutionImagePreview
    ) {
      return showAlert("Save form data otherwise clear it.", "error");
    }
    dispatch(
      updateEducation(education._id, {
        educations: educationArray,
      })
    );
  };

  useEffect(() => {
    if (educationUpdated) {
      showAlert("Education data updated successfully !", "success");
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
    if (education.userName) {
      const educations = education.educations.map((education) => {
        return {
          ...education,
          institutionImagePreview: education?.institutionImage?.imageUrl,
        };
      });
      setEducationArray(educations);
    }
  }, [educationUpdated, error, error2, education, router, dispatch, showAlert]);

  useEffect(() => {
    if (user?.uid) {
      dispatch(authGetEducation(user.uid));
    } else {
      router.push("/");
    }
  }, [user, router, dispatch]);

  useEffect(() => {
    const { degree } = educationForm;

    if (!degree) {
      window.scrollTo({
        top: document.documentElement.scrollHeight, // Scroll to the bottom of the page
        behavior: "smooth", // Use smooth scrolling animation
      });
    }
  }, [educationArray, educationForm]);

  return (
    <Fragment>
      <Head>
        <title>Update Education</title>
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
            <h2 className='text-3xl text-center mb-3'>Update Education</h2>
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
                <Image
                  alt='institution image'
                  className='m-auto'
                  height={150}
                  src={
                    educationForm?.institutionImagePreview ||
                    "/images/noImage.png"
                  }
                  width={150}
                />
                {/* Institution Image */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='institutionImage'
                  label='Institution Image'
                  name='institutionImage'
                  required={false}
                  type={"file"}
                  value={fileInputValue || ""}
                />
              </div>

              {/* Button - Save and back */}

              <div className='flex justify-between items-center mt-6'>
                <Link
                  className='text-white py-1 px-3 font-semibold bg-gray-600 hover:bg-gray-700 border border-gray-950  dark:border-gray-400 rounded'
                  href='/auth/profile'
                >
                  Back to Profile
                </Link>

                <div className='flex gap-3'>
                  <button
                    className='py-1 px-3 font-semibold bg-amber-600 hover:bg-amber-700 rounded'
                    onClick={clearEducationForm}
                    type='button'
                  >
                    Clear
                  </button>
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
                      institutionImagePreview={
                        education?.institutionImagePreview
                      }
                      key={index}
                      setEducationArray={setEducationArray}
                      setEducationForm={setEducationForm}
                      setFileInputValue={setFileInputValue}
                      status={education.status}
                      studyPeriod={education.studyPeriod}
                    />
                  );
                })}
              </div>

              {/* Update Button */}
              {educationArray.length !== 0 && (
                <div className='mt-6 flex justify-end'>
                  <button
                    className='py-1 px-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded'
                    disabled={loading2}
                    onClick={submitHandler}
                    type='button'
                  >
                    {loading2 ? "Sending..." : "Update"}
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
