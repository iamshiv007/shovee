"use client";
import React, { Fragment, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";

const SocialMedia = () => {
  const [socialMedia, setSocialMedia] = useState({});
  const [isSocial, setIsSocial] = useState(false);
  const socialRef = useRef();

  const { home } = useSelector((state) => state.homeData);

  useEffect(() => {
    setSocialMedia(home?.socialMedia);
  }, [home]);

  // Scroll Animation
  useEffect(() => {
    const socialObserver = new IntersectionObserver(
      ([socialEntry]) => {
        setIsSocial(socialEntry.isIntersecting);
      },
      {
        rootMargin: "-60px",
      }
    );

    socialObserver.observe(socialRef.current);

    if (isSocial) {
      socialRef.current.classList.add("social-show");
    } else {
      socialRef.current.classList.remove("social-show");
    }
  }, [isSocial, socialRef, home]);

  return (
    <Fragment>
      <div className='absolute left-10 bottom-3 social-hide' ref={socialRef}>
        {socialMedia?.github && (
          <div
            className={
              "text-xl text-white p-2 mb-3 rounded-full hover:scale-[1.1] transition-all duration-500"
            }
            style={{ background: "#363434" }}
          >
            <Link href={socialMedia.github} target='_blank'>
              <AiFillGithub />
            </Link>
          </div>
        )}
        {socialMedia?.linkedin && (
          <div
            className={
              "text-xl text-white p-2 mb-3 rounded-full hover:scale-[1.1] transition-all duration-500"
            }
            style={{ background: "#0072b1" }}
          >
            <Link href={socialMedia.linkedin} target='_blank'>
              <AiFillLinkedin />
            </Link>
          </div>
        )}
        {socialMedia?.twitter && (
          <div
            className={
              "text-xl text-white p-2 mb-3 rounded-full hover:scale-[1.1] transition-all duration-500"
            }
            style={{ background: "#1DA1F2" }}
          >
            <Link href={socialMedia.twitter} target='_blank'>
              <FaTwitter />
            </Link>
          </div>
        )}
        {socialMedia?.instagram && (
          <div
            className={
              "text-xl text-white p-2 mb-3 rounded-full hover:scale-[1.1] transition-all duration-500"
            }
            style={{
              background:
                "linear-gradient(135deg, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #FFDC80)",
            }}
          >
            <Link href={socialMedia.instagram} target='_blank'>
              <AiFillInstagram />
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SocialMedia;
