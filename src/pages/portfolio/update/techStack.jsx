// Import necessary modules and components
"use client";
import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Navbar from "@/components/application/layout/navbar/Navbar";
import SubmitLoader from "@/components/application/layout/loader/SubmitLoader";
import Loader from "@/components/application/layout/loader/Loader";
import CheckboxElement from "@/components/application/layout/input/CheckboxElement";
import { TechStackOptions } from "@/components/application/layout/input/optionsData/techStackOptions";
import { useAlert } from "@/context/alertContext";
import { useAuthContext } from "@/context/authContext";
import {
  authGetTechStack,
  updateTechStack,
} from "@/redux/actions/portfolioActions";
import { clearErrors } from "@/redux/reducers/techStackDataReducer";
import {
  clearErrors as clearErrors2,
  resetTechStack,
} from "@/redux/reducers/techStackReducer";

// Main Page component
const TechStack = () => {
  const [advance, setAdvance] = useState([]);
  const [good, setGood] = useState([]);
  const [familiar, setFamiliar] = useState([]);

  const techStackLevels = [
    { name: "advance", array: advance },
    { name: "good", array: good },
    { name: "familiar", array: familiar },
  ];

  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { showAlert } = useAlert();
  const router = useRouter();

  const { techStack, loading, error } = useSelector(
    (state) => state.techStackData
  );
  const {
    techStackUpdated,
    loading: loading2,
    error: error2,
  } = useSelector((state) => state.techStack);

  // Form Submit
  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ advance: advance, good: good, familiar: familiar });
    dispatch(
      updateTechStack(techStack._id, {
        advance,
        good,
        familiar,
      })
    );
  };

  // Handle Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Create a map to associate category names with their respective state variables
    const categoryMap = {
      advance: setAdvance,
      good: setGood,
      familiar: setFamiliar,
    };

    // Update the selected category
    categoryMap[name]((prevCategory) => {
      // Check if the value is already in the category
      if (prevCategory.includes(value)) {
        // If it's in the category, remove it
        return prevCategory.filter((tech) => tech !== value);
      } else {
        // If it's not in the category, add it
        return [...prevCategory, value];
      }
    });

    // Deselect the value in the other categories
    Object.keys(categoryMap).forEach((categoryName) => {
      if (categoryName !== name) {
        categoryMap[categoryName]((prevCategory) =>
          prevCategory.filter((tech) => tech !== value)
        );
      }
    });
  };

  useEffect(() => {
    if (error) {
      showAlert(error, "error");
      dispatch(clearErrors());
      router.push("/");
    }
    if (error2) {
      showAlert(error2, "error");
      dispatch(clearErrors2());
    }
    if (techStackUpdated) {
      showAlert("Tech Stack  data updated successfully", "success");
      dispatch(resetTechStack());
      router.push("/auth/profile");
    }
    if (techStack?.userName) {
      setAdvance(techStack.advance);
      setGood(techStack.good);
      setFamiliar(techStack.familiar);
    }
  }, [error, error2, techStackUpdated, techStack, router, dispatch, showAlert]);

  useEffect(() => {
    if (user?.uid) {
      dispatch(authGetTechStack(user?.uid));
    } else {
      router.push("/");
    }
  }, [user, dispatch, router]);

  return (
    <Fragment>
      <Head>
        <title>Update Tech Stack</title>
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Submit Loader */}
      {loading2 && <SubmitLoader />}

      {/* Loader */}
      {!user?.uid || loading ? (
        <Loader />
      ) : (
        <>
          <div className='px-[20px] pb-[30px] pt-[80px] m-auto min-h-[100vh] md:w-[600px]'>
            {/* Form Heading */}
            <h2 className='text-3xl text-center mb-3'>Update Tech Stack</h2>
            <form action='put' onSubmit={submitHandler}>
              <div className='md:px-[20px] py-[20px] md:border border-gray-600 flex flex-col gap-4 rounded dark:md:bg-[#0a0a0a]'>
                <div className='px-2 flex justify-between gap-4'>
                  <p className='w-36'>Skill</p>
                  <p className='w-24 text-center'>Advance</p>
                  <p className='w-24 text-center'>Good</p>
                  <p className='w-24 text-center'>familiar</p>
                </div>
                <div className='h-[360px] overflow-y-scroll space-y-2'>
                  {TechStackOptions.map((techStack, index) => (
                    <div
                      className='p-2 flex justify-between gap-4 hover:bg-gray-200 dark:hover:bg-gray-700'
                      key={techStack.name}
                    >
                      <label className='w-36' htmlFor=''>
                        {index + 1}. &nbsp; {techStack.name}
                      </label>
                      {/* Advance, Good, and Familiar Checkboxes */}
                      {techStackLevels.map((level) => (
                        <div className='w-24 text-center' key={level.name}>
                          <CheckboxElement
                            checked={level.array.includes(techStack.name)}
                            handleInputChange={handleInputChange}
                            name={level.name}
                            value={techStack.name}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
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

export default TechStack;
