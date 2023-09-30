"use client";
import React from "react";
import Link from "next/link";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { TbBulbFilled } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";

const NavbarMobile = ({
  top,
  setShowMenu,
  showMenu,
  theme,
  user,
  setThemeFun,
}) => {
  return (
    // Mobile Header
    <div
      className='w-full px-5 py-3 bg-[#ffffffcc] dark:bg-[#000000cc] backdrop-filter backdrop-blur-lg flex justify-between md:hidden shadow-md shadow-gray-300 dark:shadow-gray-800 fixed z-10'
      style={{ top }}
    >
      <div className='flex items-center gap-4'>
        {/* Open Sidebar Button */}
        <button
          className='text-black dark:text-white text-3xl font-semibold'
          onClick={() => setShowMenu(!showMenu)}
        >
          <GiHamburgerMenu />
        </button>

        {/* Brand Name */}
        <Link className='w-[20%] flex items-center gap-2' href='/'>
          <p>
            <span className='text-[#17c1ff] font-semibold'>SHOVEE</span>
          </p>
        </Link>
      </div>

      {/* Toggle Theme Button */}
      <div className='flex items-center gap-4'>
        <button
          className='text-[#159e6e] dark:text-[#17c1ff] text-2xl font-semibold hover:scale-110'
          onClick={setThemeFun}
        >
          {theme === "dark" ? <TbBulbFilled /> : <BsFillLightningChargeFill />}
        </button>
        {/* Profile Icon */}
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
  );
};

export default NavbarMobile;
