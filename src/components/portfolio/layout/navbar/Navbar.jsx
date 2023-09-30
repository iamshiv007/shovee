"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { DiTechcrunch } from "react-icons/di";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { TbBulbFilled } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";

import MobileNavbar from "./SidebarMobile";
import { NavbarMenu } from "./NavbarItems";
import NavbarMobile from "./NavbarMobile";

import { ThemeContext } from "@/context/themeContext";
import { useAuthContext } from "@/context/authContext";

const Navbar = () => {
  const [top, setTop] = useState("0");
  const [showMenu, setShowMenu] = useState(false);

  const { user } = useAuthContext();
  const { setThemeFun, theme } = useContext(ThemeContext);
  const { home } = useSelector((state) => state.homeData);

  // Logic for Navbar Hide and Show on scrolling behaviour
  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos) {
        setTop("0"); // Show the navbar
      } else {
        setTop("-80px"); // Hide the navbar
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    home?.userName && (
      <Fragment>
        {/* Desktop Header */}
        <div
          className='w-full h-[70px] px-8 bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(0,0,0,0.8)] backdrop-filter backdrop-blur-lg hidden md:flex justify-between items-center gap-4 shadow-sm shadow-gray-300 dark:shadow-gray-800 fixed z-10 transition-all duration-500'
          style={{ top: top }}
        >
          {/* Name Logo */}
          <p className='text-gray-400 flex'>
            <span className='text-lg font-bold'>
              {home?.firstName.toUpperCase()}
            </span>{" "}
            <DiTechcrunch />
          </p>
          <div className='h-full flex gap-4'>
            {/* Navbar Links */}
            {NavbarMenu.map((navbar) => (
              <Link
                className={"text-[#159e6e] dark:text-[#17c1ff] font-semibold"}
                href={navbar.link}
                key={navbar.name}
              >
                <div className='h-full pb-1 hover:pb-0 px-2 flex items-center hover:border-b-4  border-[#159e6e] dark:border-[#17c1ff] transition-all'>
                  {navbar.name}
                </div>
              </Link>
            ))}
          </div>
          {/* Toggle Theme button */}
          <div className='flex items-center gap-4'>
            <button
              className='text-xl text-[#159e6e] dark:text-[#17c1ff] hover:scale-110'
              onClick={setThemeFun}
            >
              {theme === "dark" ? (
                <TbBulbFilled />
              ) : (
                <BsFillLightningChargeFill />
              )}
            </button>
            <div
              className='p-1 border border-gray-500 rounded-full'
              data-tooltip-content={user?.email ? "Profile" : "Login"}
              data-tooltip-id='my-tooltip'
              data-tooltip-place='left'
            >
              <Link href={user?.email ? "/auth/profile" : "/auth/login"}>
                <AiOutlineUser size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <NavbarMobile
          home={home}
          setShowMenu={setShowMenu}
          setThemeFun={setThemeFun}
          showMenu={showMenu}
          theme={theme}
          top={top}
          user={user}
        />

        {/* SideMenu For Mobile Screen */}
        <MobileNavbar setShowMenu={setShowMenu} showMenu={showMenu} />
      </Fragment>
    )
  );
};

export default Navbar;
