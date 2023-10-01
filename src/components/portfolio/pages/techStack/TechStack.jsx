"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaLaptopCode } from "react-icons/fa";

import { TechStackOptions } from "@/components/application/layout/input/optionsData/techStackOptions";

const TechStack = () => {
  const [section, setSection] = useState("Advance");
  const [sectionData, setSectionData] = useState([]);
  const [istechStack, setIsTechStack] = useState(false);
  const techStackRef = useRef();
  const techBoxesRef = useRef();
  const buttonsRef = useRef();

  const { techStack, loading } = useSelector((state) => state.techStackData);

  // Scroll Animation
  useEffect(() => {
    if (techStackRef.current) {
      const getScreenWidth = () =>
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      const techStackObserver = new IntersectionObserver(
        ([techStackEntry]) => {
          setIsTechStack(techStackEntry.isIntersecting);
        },
        {
          rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-250px"}`,
        }
      );

      techStackObserver.observe(techStackRef.current);

      if (istechStack) {
        techBoxesRef.current.classList.add("pop-up-child");
        buttonsRef.current.classList.add("pop-up");
      } else {
        techBoxesRef.current.classList.remove("pop-up-child");
        buttonsRef.current.classList.remove("pop-up");
      }
    }
  }, [istechStack, techStack, techStackRef]);

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
    setTimeout(() => {
      techBoxesRef?.current?.classList.add("pop-up-child");
    }, 300);
  }, [techStack, section]);

  const sections = ["Advance", "Good", "Familiar"];

  return (
    <Fragment>
      {!loading && techStack?.userName && (
        <section
          className='shadow-zinc-300 dark:shadow-zinc-700 shadow-sm overflow-hidden'
          id='techStack'
          ref={techStackRef}
        >
          <h2 className='text-3xl font-bold text-center pt-4 pb-8 flex justify-center items-center gap-3'>
            <FaLaptopCode /> Tech Stack
          </h2>

          <div
            className='pop-down transition-all w-fit duration-500 m-auto rounded-lg border border-black dark:border-white border-solid overflow-hidden'
            ref={buttonsRef}
          >
            {/* Section Buttons Group */}
            {sections.map((sectionName) => (
              <button
                className={`text-sm md:text-base text-black dark:text-white w-[100px] md:w-[150px] p-2 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  section === sectionName ? "bg-red-600" : null
                } transition-all`}
                key={sectionName}
                onClick={(e) => {
                  setSection(sectionName);
                  if (section !== sectionName)
                    techBoxesRef.current.classList.remove("pop-up-child");
                }}
              >
                {sectionName}
              </button>
            ))}
          </div>
          {/* Tech Boxes */}
          <div
            className='pop-down-child flex min-h-[400px] py-[30px] px-[20px] md:px-[100px] flex-wrap justify-center items-center gap-5'
            ref={techBoxesRef}
          >
            {sectionData.length !== 0 ? (
              sectionData.map((tech) => (
                <div
                  className='transition-all duration-700 px-2 h-fit py-3 md:py-5 w-[80px] md:w-[150px] border border-black dark:border-white border-solid rounded flex flex-col gap-3 items-center'
                  key={tech.name}
                >
                  {/* Tech Icon */}
                  <p>{tech.icon}</p>
                  {/* Tech Name */}
                  <p className='text-sm md:text-base text-center'>
                    {tech.name}
                  </p>
                </div>
              ))
            ) : (
              <p className='transition-all duration-700 text-3xl'>No Skills</p>
            )}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default TechStack;
