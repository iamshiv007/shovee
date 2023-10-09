"use client";
import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { IoSchoolSharp } from "react-icons/io5";

const Education = () => {
  const [educations, setEducations] = useState([]);

  const { education, loading } = useSelector((state) => state.educationData);

  useEffect(() => {
    if (education.userName) {
      setEducations(education.educations);
    }
  }, [education]);

  return (
    <Fragment>
      {!loading && education?.userName && (
        <section className={style.mainContainer} id='education'>
          <h2 className='pageHeading'>
            <IoSchoolSharp /> Education
          </h2>

          <div className={style.container}>
            {educations.map((education) => (
              <motion.div
                className={style.educationBox}
                initial={{ opacity: 0, scale: 0 }}
                key={education.degree}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                {/* Institution Image */}
                <Image
                  alt={education.degree}
                  className={style.image}
                  height={150}
                  src={
                    education?.institutionImage?.imageUrl ||
                    "/images/noImage.png"
                  }
                  width={150}
                />
                <div className={style.detailsWrapper}>
                  {/* Degree Name */}
                  <p className={style.degreeName}>{education.degree}</p>
                  {/* Institution Name */}
                  <p>{education.institution}</p>
                  {/* Study Period and Status */}
                  <div className={style.otherText}>
                    {education.studyPeriod}{" "}
                    {education.studyPeriod && education.status && (
                      <p className='inline'>&nbsp; | &nbsp;</p>
                    )}{" "}
                    {education.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Education;

const style = {
  mainContainer:
    "shadow-zinc-300 dark:shadow-zinc-700 shadow-sm overflow-x-hidden",
  container:
    "min-h-[400px] pb-[30px] px-[20px] md:px-[100px] lg:px-[200px] flex flex-col justify-center gap-[20px] md:gap-[50px]",
  educationBox:
    "flex border border-zinc-300 dark:border-zinc-700 shadow-md shadow-zinc-300 dark:shadow-zinc-700 rounded gap-6",
  image: "hidden md:block",
  detailsWrapper: "flex flex-col gap-2 p-3 md:p-1",
  degreeName: "text-xl md:text-2xl font-bold text-red-600",
  otherText: "text-blue-600",
};
