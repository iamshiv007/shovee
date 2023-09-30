"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Home from "@/components/portfolio/pages/home/Home";
import Navbar from "@/components/portfolio/layout/navbar/Navbar";
import SocialMedia from "@/components/portfolio/others/socialMedia/SocialMedia";
import About from "@/components/portfolio/pages/about/About";
import TechStack from "@/components/portfolio/pages/techStack/TechStack";
import Education from "@/components/portfolio/pages/education/Education";
import Experience from "@/components/portfolio/pages/experience/Experience";
import Project from "@/components/portfolio/pages/project/Project";
import GetInTouch from "@/components/portfolio/others/getInTouch/getInTouch";
import Footer from "@/components/portfolio/layout/footer/Footer";
import { useAlert } from "@/context/alertContext";
import {
  getAbout,
  getEducation,
  getExperience,
  getHome,
  getProject,
  getTechStack,
} from "@/redux/actions/portfolioActions";
import { clearErrors } from "@/redux/reducers/homeDataReducer";
import { clearErrors as clearErrors2 } from "@/redux/reducers/aboutDataReducer";
import { clearErrors as clearErrors3 } from "@/redux/reducers/techStackDataReducer";
import { clearErrors as clearErrors4 } from "@/redux/reducers/educationDataReducer";
import { clearErrors as clearErrors5 } from "@/redux/reducers/experienceDataReducer";
import { clearErrors as clearErrors6 } from "@/redux/reducers/projectDataReducer";
import Loader from "@/components/application/layout/loader/Loader";

const Page = () => {
  const [isLoadiingData, setIsLoadiingData] = useState(false);
  const { showAlert } = useAlert();
  const { error } = useSelector((state) => state.homeData);
  const { error: error2 } = useSelector((state) => state.aboutData);
  const { error: error3 } = useSelector((state) => state.techStackData);
  const { error: error4 } = useSelector((state) => state.educationData);
  const { error: error5 } = useSelector((state) => state.experienceData);
  const { error: error6 } = useSelector((state) => state.projectData);

  const dispatch = useDispatch();
  const router = useRouter();
  const userName = router.query.userName;

  const fetchData = useCallback(async () => {
    setIsLoadiingData(true);
    await dispatch(getAbout(userName));
    await dispatch(getTechStack(userName));
    await dispatch(getEducation(userName));
    await dispatch(getExperience(userName));
    await dispatch(getProject(userName));
    setIsLoadiingData(false);
  }, [dispatch, userName]);

  useEffect(() => {
    if (userName) {
      dispatch(getHome(userName));

      fetchData();
    }
  }, [userName, dispatch, fetchData]);

  useEffect(() => {
    if (error && error !== "Home Data Not Found") {
      showAlert(error, "error");
      router.push("/");
      dispatch(clearErrors());
    }
    if (error === "Home Data Not Found") {
      showAlert("User Not Found !", "error");
      router.push("/");
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
  }, [
    error,
    error2,
    error3,
    error4,
    error5,
    error6,
    dispatch,
    router,
    showAlert,
  ]);

  return (
    <Fragment>
      {/* Navbar */}
      <Navbar />
      {/* Home */}
      <Home />
      {/* Social Media */}
      <SocialMedia />
      {/* About  */}
      {isLoadiingData ? (
        <Loader />
      ) : (
        <>
          <About />
          {/* Tech Stack */}
          <TechStack />
          {/* Education */}
          <Education />
          {/* Experience */}
          <Experience />
          {/* Projects */}
          <Project />
          {/* GetInTouch */}
          <GetInTouch />
          {/* Footer */}
          <Footer />
        </>
      )}
    </Fragment>
  );
};

export default Page;
