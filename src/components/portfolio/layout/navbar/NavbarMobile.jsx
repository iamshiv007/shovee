import React from "react";
import Link from "next/link";
import { DiTechcrunch } from "react-icons/di";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { TbBulbFilled } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";

const NavbarMobile = ({
  setShowMenu,
  setThemeFun,
  theme,
  showMenu,
  user,
  home,
  top,
}) => {
  return (
    //  Mobile Header
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

        {/* Name Logo */}
        <p className='text-gray-400 flex'>
          <span className='text-lg font-bold'>{home?.firstName}</span>{" "}
          <DiTechcrunch />
        </p>
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
        {user?.email ? (
          <div
            className='p-1 border border-gray-500 rounded-full'
            data-tooltip-content='Profile'
            data-tooltip-id='my-tooltip'
            data-tooltip-place='left'
          >
            <Link href='/auth/profile'>
              <AiOutlineUser size={20} />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavbarMobile;
