"use client";
import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaLaptopCode } from "react-icons/fa";

import { TechStackOptions } from "@/components/application/layout/input/optionsData/techStackOptions";

const TechStack = () => {
  const [section, setSection] = useState("Advance");
  const [sectionData, setSectionData] = useState([]);

  const { techStack, loading } = useSelector((state) => state.techStackData);

  // Tech Stack Section Change
  useEffect(() => {
    if (techStack?.userName) {
      if (section === "Advance") {
        setSectionData(
          TechStackOptions.filter((techStackOption) =>
            techStack.advance.includes(techStackOption.name)
          )
        );
      }
      if (section === "Good") {
        setSectionData(
          TechStackOptions.filter((techStackOption) =>
            techStack.good.includes(techStackOption.name)
          )
        );
      }
      if (section === "Familiar") {
        setSectionData(
          TechStackOptions.filter((techStackOption) =>
            techStack.familiar.includes(techStackOption.name)
          )
        );
      }
    }
  }, [techStack, section]);

  const sections = ["Advance", "Good", "Familiar"];

  return (
    <Fragment>
      {!loading && techStack?.userName && (
        <section className={style.mainContainer} id='techStack'>
          <h2 className='pageHeading'>
            <FaLaptopCode /> Tech Stack
          </h2>
          {/* Button Group */}
          <motion.div
            className={style.btnGroup}
            initial={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            {/* Section Buttons Group */}
            {sections.map((sectionName) => (
              <button
                className={`${style.btn} ${
                  section === sectionName ? "bg-red-600" : null
                }`}
                key={sectionName}
                onClick={(e) => {
                  setSection(sectionName);
                }}
              >
                {sectionName}
              </button>
            ))}
          </motion.div>
          {/* Tech Boxes */}
          <div className={style.boxesWrapper}>
            {sectionData.length !== 0 ? (
              sectionData.map((tech) => (
                // Tech Box
                <motion.div
                  className={style.box}
                  initial={{ opacity: 0, scale: 0 }}
                  key={tech.name}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  {/* Tech Icon */}
                  <p>{tech.icon}</p>
                  {/* Tech Name */}
                  <p className={style.techName}>{tech.name}</p>
                </motion.div>
              ))
            ) : (
              <p className={style.noSkillText}>No Skills</p>
            )}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default TechStack;

const style = {
  mainContainer:
    "shadow-zinc-300 dark:shadow-zinc-700 shadow-sm overflow-hidden",
  btnGroup:
    "transition-all w-fit duration-500 m-auto rounded-lg border border-black dark:border-white border-solid overflow-hidden",
  btn: "text-sm md:text-base text-black dark:text-white w-[100px] md:w-[150px] p-2 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all",
  boxesWrapper:
    "flex min-h-[400px] py-[30px] px-[20px] md:px-[100px] flex-wrap justify-center items-center gap-5",
  box: "px-2 h-fit py-3 md:py-5 w-[80px] md:w-[150px] border border-black dark:border-white border-solid rounded flex flex-col gap-3 items-center",
  techName: "text-sm md:text-base text-center",
  noSkillText: "transition-all duration-700 text-3xl",
};
