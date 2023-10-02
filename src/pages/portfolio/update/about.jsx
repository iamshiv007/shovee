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
import { useAuthContext } from "@/context/authContext";
import { useAlert } from "@/context/alertContext";
import { InputElement } from "@/components/application/layout/input/InputElement";
import { SelectElement } from "@/components/application/layout/input/SelectElement";
import { TextAreaElement } from "@/components/application/layout/input/TextAreaElement";
import { ExperienceOptions } from "@/components/application/layout/input/optionsData/experienceOptions";
import { authGetAbout, updateAbout } from "@/redux/actions/portfolioActions";
import { clearErrors } from "@/redux/reducers/aboutDataReducer";
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
  const [imageFile, setImageFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuthContext();
  const { showAlert } = useAlert();
  const { about, loading, error } = useSelector((state) => state.aboutData);
  const {
    aboutUpdated,
    loading: loading2,
    error: error2,
  } = useSelector((state) => state.about);

  // Handle Inputs
  const handleInputChange = async (e) => {
    // Handle image File
    if (e.target.name === "imageFile") {
      const file = e.target.files[0];
      const reader = new FileReader();

      if (file) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        reader.onload = (event) => {
          const imageUrl = event.target.result;
          setImagePreview(imageUrl);
        };
        reader.readAsDataURL(compressedFile);
        setImageFile(compressedFile);
        return;
      } else {
        setImagePreview(""); // Clear the preview
        setImageFile(""); // Clear the image file
        return;
      }
    }
    setAboutFormData({ ...aboutFormData, [e.target.name]: e.target.value });
  };

  // Submit Form
  const submitHandler = (e) => {
    e.preventDefault();

    const { fullName, location, age, experience, projects, objective } =
      aboutFormData;

    dispatch(
      updateAbout(about?._id, {
        fullName,
        location,
        age,
        experience,
        projects,
        objective,
        imageFile,
      })
    );
  };

  useEffect(() => {
    if (aboutUpdated) {
      showAlert("About data updated successfully !", "success");
      dispatch(resetAbout());
      router.push("/auth/profile");
    }
    if (error) {
      showAlert(error, "error");
      dispatch(clearErrors());
      router.push("/auth/profile");
    }
    if (error2) {
      showAlert(error2, "error");
      dispatch(clearErrors2());
    }
    if (about.userName) {
      setAboutFormData(about);
      setImagePreview(about?.image?.imageUrl);
    }
  }, [aboutUpdated, error, error2, router, dispatch, about, showAlert]);

  useEffect(() => {
    if (user?.uid) {
      dispatch(authGetAbout(user.uid));
    } else {
      router.push("/");
    }
  }, [user, router, dispatch]);

  return (
    <Fragment>
      <Head>
        <title>Update About</title>
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
            <h2 className='text-3xl text-center mb-3'>Update About</h2>
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
                  value={aboutFormData.experience}
                />
                {/* Projects Completed */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='projects'
                  label='Projects Completed'
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
                {/* image Preview */}
                <div>
                  <Image
                    alt='person'
                    className='m-auto bg-blue-200 rounded'
                    height={200}
                    src={imagePreview ? imagePreview : "/images/person.png"}
                    width={200}
                  />
                </div>
                {/* imageFile */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='imageFIle'
                  label='Your imageFile'
                  name='imageFile'
                  required={false}
                  type={"file"}
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

                {/* Update Button */}
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

export default About;
