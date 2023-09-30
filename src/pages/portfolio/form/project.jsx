// Import necessary modules and components
"use client";
import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";

import Navbar from "@/components/application/layout/navbar/Navbar";
import SubmitLoader from "@/components/application/layout/loader/SubmitLoader";
import Loader from "@/components/application/layout/loader/Loader";
import { InputElement } from "@/components/application/layout/input/InputElement";
import { SavedProjectBox } from "@/components/application/boxes/SavedProjectBox";
import { useAlert } from "@/context/alertContext";
import { useAuthContext } from "@/context/authContext";
import { authGetHome, createProject } from "@/redux/actions/portfolioActions";
import { clearErrors } from "@/redux/reducers/homeDataReducer";
import {
  resetProject,
  clearErrors as clearErrors2,
} from "@/redux/reducers/projectReducer";

const Project = () => {
  const [projectArray, setProjectArray] = useState([]);
  const [projectForm, setProjectForm] = useState({
    projectName: "",
    liveUrl: "",
    githubUrl: "",
    techs: [],
  });
  const [tech, setTech] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuthContext();
  const { showAlert } = useAlert();
  const { home, loading, error } = useSelector((state) => state.homeData);
  const {
    projectCreated,
    loading: loading2,
    error: error2,
  } = useSelector((state) => state.project);

  // Handle Inputs
  const handleInputChange = (e) => {
    if (e.target.name === "techs") {
      setTech(e.target.value);
    } else {
      setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
    }
  };

  // Add Tech
  const addTech = () => {
    if (!tech) return;
    const techToCheck = tech.toLowerCase(); // Convert tech to lowercase for case-insensitive comparison

    if (
      projectForm.techs.some(
        (techItem) => techItem.toLowerCase() === techToCheck
      )
    ) {
      // Your code when a match is found (case-insensitive)
      return showAlert("Tech Stack already added.", "error");
    }
    if (projectForm.techs.length === 5) {
      return showAlert("Only Five Tech Name Allowed.", "error");
    }
    setTech("");
    setProjectForm({ ...projectForm, techs: [...projectForm.techs, tech] });
  };

  // Remove Tech
  const removeTech = (name) => {
    setProjectForm({
      ...projectForm,
      techs: projectForm.techs.filter((tech) => tech !== name),
    });
  };

  // Save Project
  const saveProject = (e) => {
    e.preventDefault();

    setProjectArray([...projectArray, projectForm]);
    setProjectForm({
      projectName: "",
      liveUrl: "",
      githubUrl: "",
      techs: [],
    });
    setTech("");
  };

  // Clear Form
  const clearProjectForm = () => {
    setTech("");
    setProjectForm({
      projectName: "",
      liveUrl: "",
      githubUrl: "",
      techs: [],
    });
  };

  // Form Submit
  const submitHandler = () => {
    const { projectName, liveUrl, githubUrl } = projectForm;
    if (projectName || liveUrl || githubUrl || tech) {
      return showAlert("Save form data otherwise clear it.", "error");
    }

    dispatch(
      createProject({
        userId: user.uid,
        userName: home.userName,
        projects: projectArray,
      })
    );
  };

  useEffect(() => {
    if (projectCreated) {
      showAlert("Project page created successfully !", "success");
      dispatch(resetProject());
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
  }, [projectCreated, error, error2, router, dispatch, showAlert]);

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
  }, [projectArray]);

  return (
    <Fragment>
      <Head>
        <title>Create Project</title>
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
            <h2 className='text-3xl text-center mb-3'>Create Project</h2>
            <form action='post' onSubmit={saveProject}>
              <div className='md:px-[20px] py-[20px] md:border border-gray-600 flex flex-col gap-4 rounded dark:md:bg-[#0a0a0a]'>
                {/* Project Name */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='projectName'
                  label='Project Name*'
                  name='projectName'
                  placeholder='Write Project Name'
                  required={true}
                  type={"text"}
                  value={projectForm.projectName}
                />
                {/* Live URL */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='liveUrl'
                  label='Live URL'
                  name='liveUrl'
                  placeholder="Write Your Project's Live URL"
                  required={false}
                  type={"url"}
                  value={projectForm.liveUrl}
                />
                {/* Github URL */}
                <InputElement
                  handleInputChange={handleInputChange}
                  id='githubUrl'
                  label='GitHub URL'
                  name='githubUrl'
                  placeholder="Write Your Project's Github Repo Link"
                  required={false}
                  type={"url"}
                  value={projectForm.githubUrl}
                />
                {/* Tech Stacks */}
                <div className='flex items-end gap-4'>
                  <div className='w-[50%]'>
                    <InputElement
                      handleInputChange={handleInputChange}
                      id='techs'
                      label='Tech Stacks'
                      name='techs'
                      placeholder='Write a Tech Stack Name'
                      required={false}
                      type={"text"}
                      value={tech}
                    />
                  </div>

                  {/* Add Tech Button */}
                  <button
                    className='h-fit mb-1 py-2 px-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded'
                    onClick={addTech}
                    type='button'
                  >
                    Add
                  </button>
                </div>

                {/* Added Tech Stack */}
                <div className='flex flex-wrap gap-2'>
                  {projectForm.techs.map((tech) => {
                    return (
                      <div
                        className='px-2 py-1 bg-blue-500 flex items-center gap-2 rounded'
                        key={tech}
                      >
                        <p className='text-sm'>{tech}</p>
                        {/* Remove Tech Button */}
                        <button onClick={() => removeTech(tech)} type='button'>
                          <AiOutlineCloseCircle size={20} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Back Button */}
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
                    onClick={clearProjectForm}
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

              {/* Saved Project */}
              <div className='mt-6'>
                {projectArray.map((project, index) => {
                  return (
                    <SavedProjectBox
                      githubUrl={project.githubUrl}
                      index={index}
                      key={index}
                      liveUrl={project.liveUrl}
                      projectArray={projectArray}
                      projectName={project.projectName}
                      setProjectArray={setProjectArray}
                      setProjectForm={setProjectForm}
                      techs={project.techs}
                    />
                  );
                })}
              </div>

              {/* Submit Button */}
              {projectArray.length !== 0 && (
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

export default Project;
