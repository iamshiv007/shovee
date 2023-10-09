"use client";
import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";

const SocialMedia = () => {
  const [socialMedia, setSocialMedia] = useState({});

  const { home } = useSelector((state) => state.homeData);

  useEffect(() => {
    setSocialMedia(home?.socialMedia);
  }, [home]);

  return (
    <Fragment>
      <div className={style.circleWrapper}>
        {socialMedia?.github && (
          <motion.div
            className={style.circle}
            initial={{ opacity: 0, scale: 0 }}
            style={{ background: "#363434" }}
            transition={{ duration: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <Link href={socialMedia.github} target='_blank'>
              <AiFillGithub />
            </Link>
          </motion.div>
        )}
        {socialMedia?.linkedin && (
          <motion.div
            className={style.circle}
            initial={{ opacity: 0, scale: 0 }}
            style={{ background: "#0072b1" }}
            transition={{ duration: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <Link href={socialMedia.linkedin} target='_blank'>
              <AiFillLinkedin />
            </Link>
          </motion.div>
        )}
        {socialMedia?.twitter && (
          <motion.div
            className={style.circle}
            initial={{ opacity: 0, scale: 0 }}
            style={{ background: "#1DA1F2" }}
            transition={{ duration: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <Link href={socialMedia.twitter} target='_blank'>
              <FaTwitter />
            </Link>
          </motion.div>
        )}
        {socialMedia?.instagram && (
          <motion.div
            className={style.circle}
            initial={{ opacity: 0, scale: 0 }}
            style={{
              background:
                "linear-gradient(135deg, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #FFDC80)",
            }}
            transition={{ duration: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <Link href={socialMedia.instagram} target='_blank'>
              <AiFillInstagram />
            </Link>
          </motion.div>
        )}
      </div>
    </Fragment>
  );
};

export default SocialMedia;

const style = {
  circleWrapper: "absolute left-10 bottom-3",
  circle:
    "text-xl text-white p-2 mb-3 rounded-full hover:scale-[1.1] transition-all duration-500",
};
