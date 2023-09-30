"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";

import Loader from "@/components/application/layout/loader/Loader";

const Home = () => {
  const [isHome, setIsHome] = useState(false);
  const [lastWordProfileName, setLastWordProfileName] = useState("");
  const [startingWordsProfileName, setStartingWordsProfileName] = useState("");
  const [profileNameArticle, setProfileNameArticle] = useState("");

  const homeRef = useRef();
  const introRef = useRef();
  const profileRef = useRef();

  const { home } = useSelector((state) => state.homeData);

  // Intersection observer animation on scroll
  useEffect(() => {
    const getScreenWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    // Scroll Animation
    if (homeRef.current) {
      const homeObserver = new IntersectionObserver(
        ([homeEntry]) => {
          setIsHome(homeEntry.isIntersecting);
        },
        {
          rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-300px"}`,
        }
      );

      homeObserver.observe(homeRef.current);

      if (isHome) {
        profileRef.current.classList.add("slide-in");
        introRef.current.classList.add("slide-in");
      } else {
        profileRef.current.classList.remove("slide-in");
        introRef.current.classList.remove("slide-in");
      }
    }
  }, [homeRef, home, isHome]);

  // fetched data converted in desire format
  useEffect(() => {
    if (home.userName) {
      const profileNameArray = home?.profileName.split(" ");
      const profileNameLength = profileNameArray?.length;
      setLastWordProfileName(
        home?.profileName?.split(" ")[profileNameLength - 1]
      );

      setStartingWordsProfileName(
        profileNameArray?.splice(0, profileNameLength - 1).join(" ")
      );
      const profileNameFirstChar = home?.profileName
        ?.split("")[0]
        .toLowerCase();
      const vowelsArray = ["a", "e", "i", "o", "u"];
      if (vowelsArray.includes(profileNameFirstChar)) {
        setProfileNameArticle("an");
      } else {
        setProfileNameArticle("a");
      }
    }
  }, [home]);

  return (
    <Fragment>
      <Head>
        <title>
          {home?.firstName ? `${home?.firstName}'s` : "Personal"} Portfolio
        </title>
      </Head>

      {home?.userName ? (
        <section id='home'>
          <div
            className='min-h-[100vh] overflow-x-hidden px-[20px] md:px-[200px] lg:px-[200px] pt-[80px] md:pt-0 md:flex items-center justify-between shadow-zinc-300 dark:shadow-zinc-700 shadow-sm'
            ref={homeRef}
          >
            <div
              className='translate-x-[-500px] transition-all duration-700 opacity-0'
              ref={introRef}
            >
              <p className='py-2 text-2xl md:text-4xl font-semibold font-sans'>
                Hi There !
              </p>
              {/* Profile Name */}
              <p className='text-2xl md:text-4xl py-2 font-semibold font-sans'>
                I&apos;m {profileNameArticle} {startingWordsProfileName}{" "}
                <span className='text-[#159e6e] dark:text-[#17c1ff]'>
                  {" "}
                  {lastWordProfileName}
                  <span className='text-white'>|</span>
                </span>
              </p>
              <div className='mt-5 md:mt-10 flex gap-3'>
                {/* Hire Me Button */}
                {home?.email && (
                  <Link
                    className='text-white text-xl font-semibold rounded bg-red-400 hover:bg-red-500 px-2 py-1'
                    href={"#getInTouch"}
                  >
                    Hire me
                  </Link>
                )}
                {/* Download CV Button */}
                {home?.cv && (
                  <Link
                    className='text-xl font-semibold rounded border border-red-500 hover:text-white hover:bg-red-500 px-2 py-1'
                    href={home?.cv}
                    target='_blank'
                  >
                    Download CV
                  </Link>
                )}
              </div>
            </div>

            {/* Image */}
            <div
              className={
                "translate-x-[500px] transition-all opacity-0 duration-700 w-[180px] h-[300px] md:w-[240px] md:h-[400px] bg-cover m-auto md:m-0 mt-[40px] md:mt-0 bg-no-repeat"
              }
              ref={profileRef}
              style={
                home?.gender && home?.gender === "Female"
                  ? { backgroundImage: "url(/images/female.png)" }
                  : { backgroundImage: "url(/images/male.png)" }
              }
            />
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default Home;
