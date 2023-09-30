"use client";
import React, { Fragment, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FaBlackTie, FaUserCheck } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { IoPerson } from "react-icons/io5";
import { BsMenuAppFill } from "react-icons/bs";

const About = () => {
  const [isAbout, setIsAbout] = useState(false);

  const aboutRef = useRef();
  const profile2Ref = useRef();
  const aboutInfoRef = useRef();

  const { about, loading } = useSelector((state) => state.aboutData);
  const { home } = useSelector((state) => state.homeData);

  // Scroll Animation
  useEffect(() => {
    if (aboutRef.current) {
      const getScreenWidth = () =>
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      const aboutObserver = new IntersectionObserver(
        ([aboutEntry]) => {
          setIsAbout(aboutEntry.isIntersecting);
        },
        {
          rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-300px"}`,
        }
      );

      aboutObserver.observe(aboutRef.current);

      if (isAbout) {
        profile2Ref.current.classList.add("slide-in");
        aboutInfoRef.current.classList.add("slide-in");
      } else {
        profile2Ref.current.classList.remove("slide-in");
        aboutInfoRef.current.classList.remove("slide-in");
      }
    }
  }, [isAbout, aboutRef, about]);

  return (
    <Fragment>
      {!loading && about?.userName && (
        <section
          className='shadow-zinc-300 dark:shadow-zinc-700 shadow-sm overflow-x-hidden'
          id='about'
          ref={aboutRef}
        >
          <h2 className='text-3xl font-bold text-center pt-4 pb-8 flex justify-center items-center gap-3'>
            <FaUserCheck /> About me
          </h2>
          <div className='pb-[30px] px-[20px] md:px-[100px] lg:px-[200px] md:flex gap-[50px]'>
            {/* Person Image */}
            <Image
              alt='about image'
              className={`placeholder:shadow-zinc-300 dark:shadow-zinc-700 shadow-sm transition-all duration-700 translate-x-[-900px] ${
                about?.image?.imageUrl ? "" : "bg-blue-200"
              } m-auto bg-cover bg-no-repeat max-h-[500px] rounded object-contain`}
              height={350}
              ref={profile2Ref}
              src={
                about?.image?.imageUrl
                  ? about.image.imageUrl
                  : "/images/person.png"
              }
              width={350}
            />
            <div
              className='text-lg translate-x-[900px] opacity-0 transition-all duration-700 mt-4 md:mt-0 md:w-[50%] text-center md:text-left rounded'
              ref={aboutInfoRef}
            >
              {/* Full Name */}
              <p className='text-3xl text-center md:text-left font-semibold text-[#159e6e] dark:text-[#17c1ff]'>
                {about?.fullName}
              </p>
              {/* Profil Name */}
              <p className='text-center md:text-left text-red-600 mt-1'>
                {home?.profileName}
              </p>
              {/* Location */}
              <div className='flex flex-wrap gap-5'>
                {about?.location && (
                  <div className='w-fit px-4 py-2 mt-5 border border-gray-400 rounded flex flex-col items-center gap-2'>
                    <div className='flex gap-3 items-center'>
                      <p className='text-center md:text-left text-[#159e6e] dark:text-[#17c1ff]'>
                        Location
                      </p>
                      <p>
                        <ImLocation />
                      </p>
                    </div>
                    <p className='text-center md:text-left text-[#159e6e] dark:text-[#17c1ff]'>
                      {about?.location}
                    </p>
                  </div>
                )}
                {/* Age */}
                {about?.age && (
                  <div className='w-fit px-4 py-2 mt-5 border border-gray-400 rounded flex flex-col items-center gap-2'>
                    <div className='flex gap-3 items-center'>
                      <p className='text-center md:text-left text-[#159e6e] dark:text-[#17c1ff]'>
                        Age
                      </p>
                      <p>
                        <IoPerson />
                      </p>
                    </div>
                    <p className='text-center md:text-left text-[#159e6e] dark:text-[#17c1ff]'>
                      {about?.age}
                    </p>
                  </div>
                )}
                {/* Experience */}
                {about?.experience && (
                  <div className='w-fit px-4 py-2 mt-5 border border-gray-400 rounded flex flex-col items-center gap-2'>
                    <div className='flex gap-3 items-center'>
                      <p className='text-center md:text-left text-[#159e6e] dark:text-[#17c1ff]'>
                        Experience
                      </p>
                      <p>
                        <FaBlackTie />
                      </p>
                    </div>
                    <p className='text-center md:text-left text-[#159e6e] dark:text-[#17c1ff]'>
                      {about?.experience}
                    </p>
                  </div>
                )}
                {/* Project */}
                {about?.projects && (
                  <div className='w-fit px-4 py-2 mt-5 border border-gray-400 rounded flex flex-col items-center gap-2'>
                    <div className='flex gap-3 items-center'>
                      <p className='text-center md:text-left text-[#159e6e] dark:text-[#17c1ff]'>
                        Projects
                      </p>
                      <p>
                        <BsMenuAppFill />
                      </p>
                    </div>
                    <p className='text-center md:text-left text-[#159e6e] dark:text-[#17c1ff]'>
                      {about?.projects}
                    </p>
                  </div>
                )}
              </div>

              <div className='mt-5 justify-evenly text-justify'>
                <p className='text-gray-600 dark:text-gray-300'>
                  {about?.objective}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default About;
