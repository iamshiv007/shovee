// Import necessary modules and components
"use client";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DebounceInput } from "react-debounce-input";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/components/application/layout/navbar/Navbar";
import SubmitLoader from "@/components/application/layout/loader/SubmitLoader";
import { InputElement } from "@/components/application/layout/input/InputElement";
import { SelectElement } from "@/components/application/layout/input/SelectElement";
import { GenderOptions } from "@/components/application/layout/input/optionsData/genderOptions";
import { profileOptions } from "@/components/application/layout/input/optionsData/profileOptions";
import { useAlert } from "@/context/alertContext";
import { useAuthContext } from "@/context/authContext";
import {
  authGetHome,
  authGetAbout,
  authGetTechStack,
  authGetEducation,
  authGetExperience,
  authGetProject,
  getSameFirstName,
  updateHome,
  updateAbout,
  updateTechStack,
  updateEducation,
  updateExperience,
  updateProject,
} from "@/redux/actions/portfolioActions";
import { clearErrors } from "@/redux/reducers/sameFirstNameDataReducer";
import { clearErrors as clearErrors2 } from "@/redux/reducers/homeDataReducer";
import { clearErrors as clearErrors3 } from "@/redux/reducers/aboutDataReducer";
import { clearErrors as clearErrors4 } from "@/redux/reducers/techStackDataReducer";
import { clearErrors as clearErrors5 } from "@/redux/reducers/educationDataReducer";
import { clearErrors as clearErrors6 } from "@/redux/reducers/experienceDataReducer";
import { clearErrors as clearErrors7 } from "@/redux/reducers/projectDataReducer";
import {
  clearErrors as clearErrors8,
  resetHome,
} from "@/redux/reducers/homeReducer";
import {
  clearErrors as clearErrors9,
  resetAbout,
} from "@/redux/reducers/aboutReducer";
import {
  clearErrors as clearErrors10,
  resetTechStack,
} from "@/redux/reducers/techStackReducer";
import {
  clearErrors as clearErrors11,
  resetEducation,
} from "@/redux/reducers/educationReducer";
import {
  clearErrors as clearErrors12,
  resetExperience,
} from "@/redux/reducers/experienceReducer";
import {
  clearErrors as clearErrors13,
  resetProject,
} from "@/redux/reducers/projectReducer";
import Loader from "@/components/application/layout/loader/Loader";

// Main Page component
const Home = () => {
  const [homeFormData, setHomeFormData] = useState({
    firstName: "",
    gender: "",
    profileName: "",
    email: "",
    cv: "",
  });
  const [dataLoading, setDataLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [iswritingProfileName, setIswritingProfileName] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { showAlert } = useAlert();

  const { sameFirstName, error } = useSelector(
    (state) => state.sameFirstNameData
  );
  const { home, error: error2 } = useSelector((state) => state.homeData);
  const { about, error: error3 } = useSelector((state) => state.aboutData);
  const { techStack, error: error4 } = useSelector(
    (state) => state.techStackData
  );
  const { education, error: error5 } = useSelector(
    (state) => state.educationData
  );
  const { experience, error: error6 } = useSelector(
    (state) => state.experienceData
  );
  const { project, error: error7 } = useSelector((state) => state.projectData);
  const { homeUpdated, error: error8 } = useSelector((state) => state.home);
  const { aboutUpdated, error: error9 } = useSelector((state) => state.about);
  const { techStackUpdated, error: error10 } = useSelector(
    (state) => state.techStack
  );
  const { educationUpdated, error: error11 } = useSelector(
    (state) => state.education
  );
  const { experienceUpdated, error: error12 } = useSelector(
    (state) => state.experience
  );
  const { projectUpdated, error: error13 } = useSelector(
    (state) => state.project
  );

  // Handle Inputs
  const handleInputChange = (e) => {
    const updatedHomeFormData = {
      ...homeFormData,
      [e.target.name]: e.target.value,
    };
    setHomeFormData(updatedHomeFormData);

    // First Name Validation
    if (e.target.name === "firstName") {
      if (e.target.value.length > 8 && e.target.value.includes(" ")) {
        setFirstNameError(
          "Note - First Name must be less than 8 characters and must not contain spaces !"
        );
      } else if (e.target.value.length > 8) {
        setFirstNameError("Note - First Name must be less than 8 characters !");
      } else if (e.target.value.includes(" ")) {
        setFirstNameError("Note - First Name must not contain spaces !");
      } else {
        setFirstNameError("");
        const { value } = e.target;
        dispatch(getSameFirstName(value));
      }
    }
  };

  // Profile Name Input Type
  const profileNameInputHandle = () => {
    setIswritingProfileName(!iswritingProfileName);
    setHomeFormData({ ...homeFormData, profileName: "" });
  };

  // Submit Form
  const submitHandler = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    const { firstName, gender, profileName, email, cv } = homeFormData;

    if (firstNameError) {
      showAlert("Please provide a valid First Name !", "error");
    } else {
      let userName = "";

      // User Name selection
      if (firstName !== home.firstName) {
        if (sameFirstName.length === 0) {
          userName = firstName.toLowerCase();
        } else {
          userName = firstName.toLowerCase() + sameFirstName.length;
        }

        // If selected user name exist
        let i = 1;
        const Increment = () => {
          let number = sameFirstName.length + i;
          userName = firstName.toLowerCase() + number;
          i++;
        };

        if (sameFirstName.some((home) => home.userName === userName)) {
          Increment();
        }

        // Update User Name
        if (about?.userName)
          await dispatch(updateAbout(about?._id, { userName }));
        if (techStack?.userName)
          await dispatch(updateTechStack(techStack?._id, { userName }));
        if (education?.userName)
          dispatch(
            await updateEducation(education?._id, {
              userName,
              educations: education.educations,
            })
          );
        if (experience?.userName)
          await dispatch(updateExperience(experience?._id, { userName }));
        if (project?.userName)
          dispatch(
            await updateProject(project?._id, {
              userName,
              projects: project.projects,
            })
          );
      } else {
        userName = home.firstName;
      }

      await dispatch(
        updateHome(home._id, {
          userName,
          firstName,
          gender,
          profileName,
          email,
          cv,
        })
      );

      setUpdateLoading(false);
    }
  };

  const dataLoadingFun = useCallback(
    async (user) => {
      setDataLoading(true);
      await dispatch(authGetAbout(user?.uid));
      await dispatch(authGetTechStack(user?.uid));
      await dispatch(authGetEducation(user?.uid));
      await dispatch(authGetExperience(user?.uid));
      await dispatch(authGetProject(user?.uid));
      await dispatch(authGetHome(user?.uid));
      setDataLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    if (!user?.email) {
      return router.push("/");
    } else {
      dataLoadingFun(user);
    }
  }, [user, router, dispatch, dataLoadingFun]);

  useEffect(() => {
    if (error) {
      showAlert(error, "error");
      dispatch(clearErrors());
      router.push("/");
    }
    if (error2) {
      showAlert(error2, "error");
      dispatch(clearErrors2());
      router.push("/");
    }
    if (error3) {
      dispatch(clearErrors3());
    }
    if (error4) {
      dispatch(clearErrors4());
    }
    if (error5) {
      dispatch(clearErrors5());
    }
    if (error6) {
      dispatch(clearErrors6());
    }
    if (error7) {
      dispatch(clearErrors7());
    }
    if (error8) {
      showAlert(error8, "error");
      dispatch(clearErrors8());
    }
    if (error9) {
      dispatch(clearErrors9());
    }
    if (error10) {
      dispatch(clearErrors10());
    }
    if (error11) {
      dispatch(clearErrors11());
    }
    if (error12) {
      dispatch(clearErrors12());
    }
    if (error13) {
      dispatch(clearErrors13());
    }
    if (homeUpdated) {
      showAlert("Home data updated successfully !", "success");
      dispatch(resetHome());
      router.push("/auth/profile");
    }
    if (techStackUpdated) {
      dispatch(resetTechStack());
    }
    if (aboutUpdated) {
      dispatch(resetAbout());
    }
    if (educationUpdated) {
      dispatch(resetEducation());
    }
    if (experienceUpdated) {
      dispatch(resetExperience());
    }
    if (projectUpdated) {
      dispatch(resetProject());
    }
    if (home?.userName) {
      if (!profileOptions.includes(home.profileName)) {
        setIswritingProfileName(true);
      }
      setHomeFormData(home);
    }
  }, [
    home,
    error,
    error2,
    error3,
    error4,
    error5,
    error6,
    error7,
    error8,
    error9,
    error10,
    error11,
    error12,
    error13,
    homeUpdated,
    techStackUpdated,
    aboutUpdated,
    educationUpdated,
    experienceUpdated,
    projectUpdated,
    dispatch,
    router,
    showAlert,
  ]);

  return (
    <Fragment>
      <Head>
        <title>Update Home</title>
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Update Loading */}
      {updateLoading && <SubmitLoader />}

      {/* Loader */}
      {!user?.email || dataLoading ? (
        <Loader />
      ) : (
        <>
          <div className='px-[20px] pb-[30px] pt-[80px] m-auto min-h-[100vh] md:w-[600px]'>
            {/* Form Heading */}
            <h2 className='text-3xl text-center mb-3'>Update Home</h2>
            <form action='put' onSubmit={submitHandler}>
              <div className='md:px-[20px] py-[20px] md:border border-gray-600 flex flex-col gap-4 rounded dark:md:bg-[#0a0a0a]'>
                {/* First Name */}
                <div className='flex flex-col gap-1'>
                  <label htmlFor='firstName'>First Name*</label>
                  <DebounceInput
                    className='px-3 py-2 dark:bg-slate-900 border border-gray-400 focus:border-gray-600 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 dark:focus:border-gray-400 rounded'
                    debounceTimeout={700}
                    minLength={0}
                    name='firstName'
                    onChange={handleInputChange}
                    placeholder='Write Your First Name'
                    required
                    value={homeFormData.firstName || ""}
                  />
                </div>
                {/* Gender */}
                <SelectElement
                  handleInputChange={handleInputChange}
                  id={"gender"}
                  label='Gender*'
                  name={"gender"}
                  placeholder='Select Your Gender'
                  required={true}
                  selectOptions={GenderOptions}
                  value={homeFormData.gender || ""}
                />
                {/* Profile Name */}
                {iswritingProfileName ? (
                  <InputElement
                    handleInputChange={handleInputChange}
                    id='profileName'
                    label='Profile Name*'
                    name='profileName'
                    placeholder='Write your Profile Name'
                    required={true}
                    type='text'
                    value={homeFormData.profileName || ""}
                  />
                ) : (
                  // Profile Name Dropdown
                  <SelectElement
                    handleInputChange={handleInputChange}
                    id='profileName'
                    label='Profile Name*'
                    name='profileName'
                    placeholder='Select Your Profile Name'
                    required={true}
                    selectOptions={profileOptions}
                    value={homeFormData.profileName || ""}
                  />
                )}

                <div className='flex justify-between gap-2'>
                  {iswritingProfileName ? (
                    <p>Select from List ?</p>
                  ) : (
                    <p>Doesn&apos;t match any profile name ?</p>
                  )}{" "}
                  {/* Profile Name Input Type Toggle Button */}
                  <button
                    className='py-1 px-3 font-semibold bg-emerald-600 hover:bg-emerald-700 rounded'
                    onClick={profileNameInputHandle}
                    type='button'
                  >
                    {iswritingProfileName ? "Open dropdown" : "Write manually"}
                  </button>{" "}
                </div>
                {/* Email */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='email'
                  label='Email id*'
                  name='email'
                  placeholder='Write a professional email ID'
                  required={true}
                  type='email'
                  value={homeFormData.email || ""}
                />
                {/* CV */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='cv'
                  label='Online CV or Resume link'
                  name='cv'
                  placeholder='Exa - https://drive.google.com/file/d/1AW../view'
                  required={false}
                  type='text'
                  value={homeFormData.cv || ""}
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
                  disabled={updateLoading}
                  type='submit'
                >
                  {updateLoading ? "Sending..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Home;
