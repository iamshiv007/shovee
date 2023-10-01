// Import necessary modules and components
"use client";
import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DebounceInput } from "react-debounce-input";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/components/application/layout/navbar/Navbar";
import SubmitLoader from "@/components/application/layout/loader/SubmitLoader";
import Loader from "@/components/application/layout/loader/Loader";
import { LiveAlert } from "@/components/application/layout/alert/LiveAlert";
import { InputElement } from "@/components/application/layout/input/InputElement";
import { SelectElement } from "@/components/application/layout/input/SelectElement";
import { GenderOptions } from "@/components/application/layout/input/optionsData/genderOptions";
import { profileOptions } from "@/components/application/layout/input/optionsData/profileOptions";
import { useAuthContext } from "@/context/authContext";
import { useAlert } from "@/context/alertContext";
import { getSameFirstName, createHome } from "@/redux/actions/portfolioActions";
import { clearErrors } from "@/redux/reducers/sameFirstNameDataReducer";
import {
  clearErrors as clearErrors2,
  resetHome,
} from "@/redux/reducers/homeReducer";

const Home = () => {
  const [homeFormData, setHomeFormData] = useState({
    firstName: "",
    gender: "",
    profileName: "",
    email: "",
    cv: "",
  });
  const [iswritingProfileName, setIswritingProfileName] = useState(false);
  const [userName, setUserName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [liveAlert, setLiveAlert] = useState(false);

  const router = useRouter();
  const { showAlert } = useAlert();
  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const { sameFirstName, error } = useSelector(
    (state) => state.sameFirstNameData
  );
  const {
    homeCreated,
    error: error2,
    loading,
  } = useSelector((state) => state.home);

  // Handle Inputs
  const handleInputChange = (e) => {
    const updatedHomeFormData = {
      ...homeFormData,
      [e.target.name]: e.target.value,
    };
    setHomeFormData(updatedHomeFormData);

    // Validate First Name
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
        if (!value) return;
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

    const { firstName, gender, profileName, email, cv } = homeFormData;

    if (firstNameError) {
      showAlert("Please provide a valid First Name !", "error");
    } else {
      // User name selection
      let userNameStore = "";
      if (sameFirstName.length === 0) {
        userNameStore = firstName.toLowerCase();
        setUserName(userNameStore);
      } else {
        userNameStore = firstName.toLowerCase() + sameFirstName.length;
        setUserName(userNameStore);
      }

      // If user name exist
      let i = 1;
      const Increment = () => {
        let number = sameFirstName.length + i;
        userNameStore = firstName.toLowerCase() + number;
        setUserName(userNameStore);
        i++;
      };

      if (sameFirstName.some((home) => home.userName === userNameStore)) {
        Increment();
      }

      await dispatch(
        createHome({
          userId: user?.uid,
          userName: userNameStore,
          firstName,
          gender,
          profileName,
          email,
          cv,
        })
      );
    }
  };

  useEffect(() => {
    if (homeCreated) {
      setLiveAlert(true);
      dispatch(resetHome());
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
  }, [homeCreated, error, error2, dispatch, router, showAlert]);

  useEffect(() => {
    if (!user?.email) {
      showAlert("Login first to building your portfolio !", "warning");
      return router.push("/auth/login/?redirect=/portfolio/form/home");
    }
  }, [user, router, showAlert]);

  return (
    <Fragment>
      <Head>
        <title>Create Home</title>
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Submit Loader */}
      {loading && <SubmitLoader />}

      {user?.email ? (
        <>
          {/* Live Alert */}
          <LiveAlert
            firstName={homeFormData.firstName}
            liveAlert={liveAlert}
            userName={userName}
          />

          <div className='px-[20px] pb-[30px] pt-[80px] m-auto min-h-[100vh] md:w-[600px]'>
            {/* Form Heading */}
            <h2 className='text-3xl text-center mb-3'>Create Home</h2>
            <form action='post' onSubmit={submitHandler}>
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
                    type='text'
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
                  )}
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
                  label='Email Id*'
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
                  type='url'
                  value={homeFormData.cv || ""}
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
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default Home;
