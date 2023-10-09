"use client";
import React, { Fragment, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { MdWork } from "react-icons/md";
import { ImLocation } from "react-icons/im";
import { BsArrowDownCircle } from "react-icons/bs";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [desc, setDesc] = useState("");

  const { experience, loading } = useSelector((state) => state.experienceData);

  useEffect(() => {
    if (experience?.userName) {
      setExperiences(experience.experiences);
    }
  }, [experience]);

  return (
    <Fragment>
      {!loading && experience?.userName && (
        <section id='experience'>
          <h2 className='pageHeading'>
            <MdWork /> Experience
          </h2>

          <div className={style.container}>
            {experiences.map((experience, index) =>
              index % 2 === 0 ? (
                // Left Side Experience Box
                <motion.div
                  className={`${style.leftSide} ${index !== 0 ? "mt-7" : ""}`}
                  initial={{ opacity: 0, scale: 0 }}
                  key={experience.companyName}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  <div
                    className={style.box}
                    onClick={() =>
                      setDesc(
                        desc === experience.details ? "" : experience.details
                      )
                    }
                  >
                    <div className={style.boxTop}>
                      {/* Company Name */}
                      <p className={style.companyName}>
                        {experience.companyName}
                      </p>
                      {/* Company Location */}
                      <p className={style.location}>
                        <ImLocation /> {experience.location}
                      </p>
                    </div>

                    <div className={style.boxMiddle}>
                      {/* Job Role */}
                      <p className={style.experience}>{experience.role}</p>
                      {/* Job Period */}
                      <p>{experience.jobPeriod}</p>
                    </div>

                    {/* Job details */}
                    <p
                      className={style.details}
                      style={
                        desc == experience.details
                          ? { maxHeight: "400px" }
                          : { maxHeight: "0px" }
                      }
                    >
                      {experience.details}
                    </p>
                  </div>
                  {/* Details Show and Hide Button */}
                  {experience.details && (
                    <button
                      className={style.arrow}
                      onClick={() =>
                        setDesc(
                          desc === experience.details ? "" : experience.details
                        )
                      }
                      style={
                        desc === experience.details
                          ? { transform: "rotate(180deg)" }
                          : {}
                      }
                    >
                      <BsArrowDownCircle size={22} />
                    </button>
                  )}
                </motion.div>
              ) : (
                // Right Side Experience Box
                <motion.div
                  className={style.rightSide}
                  initial={{ opacity: 0, scale: 0 }}
                  key={experience.companyName}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  {/* Details Show and Hide Button */}
                  {experience.details && (
                    <button
                      className={style.arrow}
                      onClick={() =>
                        setDesc(
                          desc === experience.details ? "" : experience.details
                        )
                      }
                      style={
                        desc === experience.details
                          ? { transform: "rotate(180deg)" }
                          : {}
                      }
                    >
                      <BsArrowDownCircle size={22} />
                    </button>
                  )}
                  <div
                    className={style.box}
                    onClick={() =>
                      setDesc(
                        desc === experience.details ? "" : experience.details
                      )
                    }
                  >
                    <div className={style.boxTop}>
                      {/* Company Name */}
                      <p className={style.companyName}>
                        {experience.companyName}
                      </p>
                      {/* Company Location */}
                      <p className={style.location}>
                        <ImLocation /> {experience.location}
                      </p>
                    </div>
                    <div className={style.boxMiddle}>
                      {/* Job Role */}
                      <p className={style.experience}>{experience.role}</p>
                      {/* Job period */}
                      <p>{experience.jobPeriod}</p>
                    </div>
                    {/* Job Details */}
                    <p
                      className={style.details}
                      style={
                        desc == experience.details
                          ? { maxHeight: "400px" }
                          : { maxHeight: "0px" }
                      }
                    >
                      {experience.details}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Experience;

const style = {
  container:
    "min-h-[300px] pb-[30px] px-[20px] shadow-sm shadow-zinc-300 dark:shadow-zinc-700",
  leftSide: "md:flex gap-2 items-end",
  box: "md:w-[45%] cursor-pointer p-3 border border-zinc-300 dark:border-zinc-700 shadow-zinc-300 dark:shadow-zinc-700 shadow-smrounded",
  boxTop: "flex justify-between gap-2",
  companyName: "text-xl md:text-2xl font-bold text-red-600",
  location: "flex gap-2 items-center text-blue-500",
  boxMiddle: "flex justify-between text-gray-600 dark:text-gray-400 gap-2 mt-2",
  experience: "font-semibold",
  details:
    "mt-2 text-justify transition-all duration-500 overflow-hidden text-gray-700 dark:text-gray-500",
  arrow:
    "text-black dark:text-white transition-all duration-500 hidden md:block",
  rightSide: "md:flex justify-end items-end mt-7 gap-2",
};
