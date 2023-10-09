"use client";
import React, { Fragment } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaBlackTie, FaUserCheck } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { IoPerson } from "react-icons/io5";
import { BsMenuAppFill } from "react-icons/bs";

const About = () => {
  const { about, loading } = useSelector((state) => state.aboutData);
  const { home } = useSelector((state) => state.homeData);

  return (
    <Fragment>
      {!loading && about?.userName && (
        <section className={style.mainContainer} id='about'>
          <h2 className='pageHeading'>
            <FaUserCheck /> About me
          </h2>
          <div className={style.container}>
            {/* Person Image */}
            <motion.div
              className='m-auto'
              initial={{ opacity: 0, x: -400 }}
              transition={{ duration: 0.3 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <Image
                alt='about image'
                className={`${style.image} ${
                  about?.image?.imageUrl ? "" : "bg-blue-200"
                } `}
                height={350}
                src={
                  about?.image?.imageUrl
                    ? about.image.imageUrl
                    : "/images/person.png"
                }
                width={350}
              />
            </motion.div>
            <motion.div
              className={style.detailsWrapper}
              initial={{ opacity: 0, x: 400 }}
              transition={{ duration: 0.3 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              {/* Full Name */}
              <p className={style.name}>{about?.fullName}</p>
              {/* Profil Name */}
              <p className={style.profileName}>{home?.profileName}</p>
              {/* Location */}
              <div className={style.boxes}>
                {about?.location && (
                  <div className={style.box}>
                    <div className={style.boxHeading}>
                      <p className={style.boxText}>Location</p>
                      <p>
                        <ImLocation />
                      </p>
                    </div>
                    <p className={style.boxText}>{about?.location}</p>
                  </div>
                )}
                {/* Age */}
                {about?.age && (
                  <div className={style.box}>
                    <div className={style.boxHeading}>
                      <p className={style.boxText}>Age</p>
                      <p>
                        <IoPerson />
                      </p>
                    </div>
                    <p className={style.boxText}>{about?.age}</p>
                  </div>
                )}
                {/* Experience */}
                {about?.experience && (
                  <div className={style.box}>
                    <div className={style.boxHeading}>
                      <p className={style.boxText}>Experience</p>
                      <p>
                        <FaBlackTie />
                      </p>
                    </div>
                    <p className={style.boxText}>{about?.experience}</p>
                  </div>
                )}
                {/* Project */}
                {about?.projects && (
                  <div className={style.box}>
                    <div className={style.boxHeading}>
                      <p className={style.boxText}>Projects</p>
                      <p>
                        <BsMenuAppFill />
                      </p>
                    </div>
                    <p className={style.boxText}>{about?.projects}</p>
                  </div>
                )}
              </div>

              <div className={style.objectiveWrapper}>
                <p className={style.objectiveText}>{about?.objective}</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default About;

const style = {
  mainContainer:
    "shadow-zinc-300 dark:shadow-zinc-700 shadow-sm overflow-x-hidden",
  container:
    "pb-[30px] px-[20px] md:px-[100px] lg:px-[200px] md:flex gap-[50px]",
  image:
    "placeholder:shadow-zinc-300 dark:shadow-zinc-700 shadow-sm bg-cover bg-no-repeat max-h-[500px] rounded object-contain",
  detailsWrapper:
    "text-lg mt-4 md:mt-0 md:w-[50%] text-center md:text-left rounded",
  name: "text-3xl text-center md:text-left font-semibold text-[#159e6e] dark:text-[#17c1ff]",
  profileName: "text-center md:text-left text-red-600 mt-1",
  boxes: "flex flex-wrap justify-center md:justify-normal gap-5",
  box: "w-fit px-4 py-2 mt-5 border border-gray-400 rounded flex flex-col items-center gap-2",
  boxHeading: "flex flex-wrap justify-center md:justify-normal gap-5",
  boxText: "text-center md:text-left text-[#159e6e] dark:text-[#17c1ff]",
  objectiveWrapper: "mt-5 justify-evenly text-justify",
  objectiveText: "text-gray-600 dark:text-gray-300",
};
