"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { signOut, getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { MdWork } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { FaUserCheck, FaLaptopCode } from "react-icons/fa";

import Navbar from "@/components/application/layout/navbar/Navbar";
import Loader from "@/components/application/layout/loader/Loader";
import SubmitLoader from "@/components/application/layout/loader/SubmitLoader";
import Footer from "@/components/application/layout/footer/Footer";
import { PortfolioLink } from "@/components/application/profile/PortfolioLink";
import { GoLive } from "@/components/application/profile/GoLive";
import { PortfolioSections } from "@/components/application/profile/PortfolioSections";
import firebase_app from "@/firebase/config";
import { useAuthContext } from "@/context/authContext";
import { useAlert } from "@/context/alertContext";
import {
  authGetAbout,
  authGetEducation,
  authGetExperience,
  authGetHome,
  authGetProject,
  authGetTechStack,
  deleteAbout,
  deleteEducation,
  deleteExperience,
  deleteProject,
  deleteTechStack,
} from "@/redux/actions/portfolioActions";
import { clearErrors } from "@/redux/reducers/homeDataReducer";
import { clearErrors as clearErrors2 } from "@/redux/reducers/aboutDataReducer";
import { clearErrors as clearErrors3 } from "@/redux/reducers/techStackDataReducer";
import { clearErrors as clearErrors4 } from "@/redux/reducers/educationDataReducer";
import { clearErrors as clearErrors5 } from "@/redux/reducers/experienceDataReducer";
import { clearErrors as clearErrors6 } from "@/redux/reducers/projectDataReducer";
import {
  clearErrors as clearErrors7,
  resetAbout,
} from "@/redux/reducers/aboutReducer";
import {
  clearErrors as clearErrors8,
  resetTechStack,
} from "@/redux/reducers/techStackReducer";
import {
  clearErrors as clearErrors9,
  resetEducation,
} from "@/redux/reducers/educationReducer";
import {
  clearErrors as clearErrors10,
  resetExperience,
} from "@/redux/reducers/experienceReducer";
import {
  clearErrors as clearErrors11,
  resetProject,
} from "@/redux/reducers/projectReducer";

const auth = getAuth(firebase_app);

const Page = () => {
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { user } = useAuthContext();
  const { showAlert } = useAlert();
  const router = useRouter();
  const dispatch = useDispatch();

  const { home, error } = useSelector((state) => state.homeData);
  const { about, error: error2 } = useSelector((state) => state.aboutData);
  const { techStack, error: error3 } = useSelector(
    (state) => state.techStackData
  );
  const { education, error: error4 } = useSelector(
    (state) => state.educationData
  );
  const { experience, error: error5 } = useSelector(
    (state) => state.experienceData
  );
  const { project, error: error6 } = useSelector((state) => state.projectData);
  const {
    aboutDeleted,
    error: error7,
    loading: loading7,
  } = useSelector((state) => state.about);
  const {
    techStackDeleted,
    error: error8,
    loading: loading8,
  } = useSelector((state) => state.techStack);
  const {
    educationDeleted,
    error: error9,
    loading: loading9,
  } = useSelector((state) => state.education);
  const {
    experienceDeleted,
    error: error10,
    loading: loading10,
  } = useSelector((state) => state.experience);
  const {
    projectDeleted,
    error: error11,
    loading: loading11,
  } = useSelector((state) => state.project);

  // Fetch Data
  const fetchDataFun = useCallback(
    async (userId) => {
      setIsLoadingData(true);
      await dispatch(authGetHome(userId));
      await dispatch(authGetAbout(userId));
      await dispatch(authGetTechStack(userId));
      await dispatch(authGetEducation(userId));
      await dispatch(authGetExperience(userId));
      await dispatch(authGetProject(userId));
      setIsLoadingData(false);
    },
    [dispatch]
  );

  useEffect(() => {
    if (error && error !== "Home data Not found !") {
      dispatch(clearErrors());
      showAlert(error, "error");
      router.push("/");
    }
    if (error) {
      dispatch(clearErrors());
    }
    if (error2) {
      dispatch(clearErrors2());
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
    if (aboutDeleted) {
      fetchDataFun(user?.uid);
      showAlert("About deleted successfully", "success");
      dispatch(resetAbout());
    }
    if (techStackDeleted) {
      fetchDataFun(user?.uid);
      showAlert("Tech Stack deleted successfully", "success");
      dispatch(resetTechStack());
    }
    if (educationDeleted) {
      fetchDataFun(user?.uid);
      showAlert("Education deleted successfully", "success");
      dispatch(resetEducation());
    }
    if (experienceDeleted) {
      fetchDataFun(user?.uid);
      showAlert("Experience deleted successfully", "success");
      dispatch(resetExperience());
    }
    if (projectDeleted) {
      fetchDataFun(user?.uid);
      showAlert("Project deleted successfully", "success");
      dispatch(resetProject());
    }
  }, [
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
    aboutDeleted,
    techStackDeleted,
    educationDeleted,
    experienceDeleted,
    projectDeleted,
    router,
    dispatch,
    showAlert,
    fetchDataFun,
    user,
  ]);

  // Logout
  async function handleLogout() {
    setIsLogoutLoading(true);
    try {
      await signOut(auth);
      showAlert("Logged out successfully !", "success");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    setIsLogoutLoading(false);
  }

  useEffect(() => {
    if (user?.uid) {
      fetchDataFun(user?.uid);
    } else {
      // Redirect to home if user not authenticated
      showAlert("User not authenticated !", "error");
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, showAlert, fetchDataFun]);

  // Sections
  const allSections = [
    {
      name: "about",
      data: about,
      icon: <FaUserCheck />,
      loading: loading7,
      fun: () => dispatch(deleteAbout(about._id)),
    },
    {
      name: "techStack",
      data: techStack,
      icon: <FaLaptopCode />,
      loading: loading8,
      fun: () => dispatch(deleteTechStack(techStack._id)),
    },
    {
      name: "education",
      data: education,
      icon: <IoSchoolSharp />,
      loading: loading9,
      fun: () => dispatch(deleteEducation(education._id)),
    },
    {
      name: "experience",
      data: experience,
      icon: <MdWork />,
      loading: loading10,
      fun: () => dispatch(deleteExperience(experience._id)),
    },
    {
      name: "project",
      data: project,
      icon: <CgWebsite />,
      loading: loading11,
      fun: () => dispatch(deleteProject(project._id)),
    },
  ];

  return (
    <Fragment>
      <Head>
        {
          <title>
            {home?.userName ? `${home?.firstName}'s profile` : "Profile"}
          </title>
        }
      </Head>

      <Navbar />
      {!user?.uid || isLoadingData ? (
        <Loader />
      ) : (
        <>
          {isLogoutLoading && <SubmitLoader />}
          <div className='min-h-[100vh] pt-[80px] pb-5'>
            <h2 className='text-3xl text-center mb-3'>Profile</h2>
            <div className='md:py-5 px-5 md:min-w-[450px] md:w-fit m-auto flex flex-col gap-8 md:border border-gray-400 dark:border-gray-800 rounded dark:md:bg-[#0a0a0a]'>
              <div>
                {/* Email */}
                <div className='flex items-end gap-3'>
                  {" "}
                  <p className='text-2xl'>
                    <AiOutlineMail />
                  </p>
                  <p className='text-xl'>{user?.email}</p>
                </div>
                {/* Portfolio Link */}
                <PortfolioLink home={home} showAlert={showAlert} />
              </div>

              {home?.userName ? (
                <PortfolioSections allSections={allSections} home={home} />
              ) : (
                <GoLive home={home} />
              )}

              <button
                className='px-4 py-2 w-fit font-bold bg-gray-700 hover:bg-gray-600 rounded'
                disabled={isLogoutLoading}
                onClick={handleLogout}
              >
                {isLogoutLoading ? "Sending..." : "Logout"}
              </button>
            </div>
          </div>

          <Footer />
        </>
      )}
    </Fragment>
  );
};

export default Page;
