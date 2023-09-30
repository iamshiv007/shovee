"use client";
import React, { Fragment, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { IoSchoolSharp } from "react-icons/io5";

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [isEducation, setIsEducation] = useState(false);
  const educationRef = useRef();
  const educationBoxesRef = useRef();

  const { education, loading } = useSelector((state) => state.educationData);

  useEffect(() => {
    if (education.userName) {
      setEducations(education.educations);
    }
  }, [education]);

  // Scroll Animation
  useEffect(() => {
    if (educationRef.current) {
      const getScreenWidth = () =>
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      const educationObserver = new IntersectionObserver(
        ([educationEntry]) => {
          setIsEducation(educationEntry.isIntersecting);
        },
        {
          rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-300px"}`,
        }
      );

      educationObserver.observe(educationRef.current);

      if (isEducation) {
        educationBoxesRef.current.classList.add("pop-up-child");
      } else {
        educationBoxesRef.current.classList.remove("pop-up-child");
      }
    }
  }, [isEducation, educationRef, education]);

  return (
    <Fragment>
      {!loading && education?.userName && (
        <section
          className='shadow-zinc-300 dark:shadow-zinc-700 shadow-sm overflow-x-hidden'
          id='education'
          ref={educationRef}
        >
          <h2 className='text-3xl font-bold text-center pt-4 pb-8 flex justify-center items-center gap-3'>
            <IoSchoolSharp /> Education
          </h2>

          <div
            className='min-h-[400px] pop-down-child pb-[30px] px-[20px] md:px-[100px] lg:px-[200px] flex flex-col justify-center gap-[20px] md:gap-[50px]'
            ref={educationBoxesRef}
          >
            {educations.map((education) => (
              <div
                className='transition-all duration-700 flex border border-zinc-300 dark:border-zinc-700 shadow-md shadow-zinc-300 dark:shadow-zinc-700 rounded gap-6'
                key={education.degree}
              >
                {/* Institution Image */}
                <div>
                  <Image
                    alt={education.degree}
                    className='hidden md:block'
                    height={150}
                    src={
                      education?.institutionImage?.imageUrl ||
                      "/images/noImage.png"
                    }
                    width={150}
                  />
                </div>
                <div className='flex flex-col gap-2 p-3 md:p-1'>
                  {/* Degree Name */}
                  <p className='text-xl md:text-2xl font-bold text-red-600'>
                    {education.degree}
                  </p>
                  {/* Institution Name */}
                  <p>{education.institution}</p>
                  {/* Study Period and Status */}
                  <div className=' text-blue-600'>
                    {education.studyPeriod}{" "}
                    {education.studyPeriod && education.status && (
                      <p className='inline'>&nbsp; | &nbsp;</p>
                    )}{" "}
                    {education.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Education;
