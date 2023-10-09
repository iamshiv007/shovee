"use client";
import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { getArticle, getLastWord, removeLastWord } from "../../utils/helper";

import Loader from "@/components/application/layout/loader/Loader";

const Home = () => {
  const [lastWord, setLastWord] = useState("");
  const [startingWords, setStartingWords] = useState("");
  const [article, setArticle] = useState("");

  const { home } = useSelector((state) => state.homeData);

  // fetched data converted in desire format
  useEffect(() => {
    if (home.userName) {
      const profileName = home.profileName;

      setLastWord(getLastWord(profileName));

      setStartingWords(removeLastWord(profileName));

      setArticle(getArticle(profileName));
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
          <div className={style.container}>
            <motion.div
              initial={{ opacity: 0, x: -400 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <p className={style.text}>Hi There !</p>
              {/* Profile Name */}
              <p className={style.text}>
                I&apos;m {article} {startingWords}{" "}
                <span className={style.colorText}>{lastWord}</span>
                <span>|</span>
              </p>
              <div className={style.btnWrapper}>
                {/* Hire Me Button */}
                {home.email && (
                  <Link className={style.hireMeBtn} href={"#getInTouch"}>
                    Hire me
                  </Link>
                )}
                {/* Download CV Button */}
                {home.cv && (
                  <Link
                    className={style.downloadbtn}
                    href={home.cv}
                    target='_blank'
                  >
                    Download CV
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              className={style.image}
              initial={{ opacity: 0, x: 400 }}
              style={
                home.gender && home.gender === "Female"
                  ? { backgroundImage: "url(/images/female.png)" }
                  : { backgroundImage: "url(/images/male.png)" }
              }
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
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

const style = {
  container:
    "min-h-[100vh] overflow-x-hidden px-[20px] md:px-[200px] lg:px-[200px] pt-[80px] md:pt-0 md:flex items-center justify-between shadow-zinc-300 dark:shadow-zinc-700 shadow-sm",
  text: "py-2 text-2xl md:text-4xl font-semibold font-sans",
  colorText: "text-[#159e6e] dark:text-[#17c1ff]",
  btnWrapper: "mt-5 md:mt-10 flex gap-3",
  hireMeBtn:
    "text-white text-xl font-semibold rounded bg-red-400 hover:bg-red-500 px-2 py-1",
  downloadbtn:
    "text-xl font-semibold rounded border border-red-500 hover:text-white hover:bg-red-500 px-2 py-1",
  image:
    "w-[180px] h-[300px] md:w-[240px] md:h-[400px] bg-cover m-auto md:m-0 mt-[40px] md:mt-0 bg-no-repeat",
};
