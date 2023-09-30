import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";

import { NavbarMenu } from "./NavbarItems";

const MobileNavbar = ({ showMenu, setShowMenu }) => {
  return (
    <Fragment>
      <div
        className={`w-full h-screen bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.3)] fixed ${
          showMenu ? null : "hidden"
        } top-0 left-0 z-10`}
        onClick={() => setShowMenu(!showMenu)}
      >
        {/* Sidebar */}
        <div
          className={`w-[70%] min-w-fit h-screen bg-white dark:bg-black shadow-sm shadow-gray-600 dark:shadow-gray-300 ${
            showMenu ? null : "translate-x-[-450px]"
          } transition-all duration-1000`}
        >
          <div className='p-3 bg-gray-200 dark:bg-gray-900 flex justify-between items-center gap-3'>
            {/* Brand Name with Logo */}
            <div className='flex items-center gap-2'>
              <Image alt='logo' height={30} src='/images/logo.png' width={30} />
              <p>
                <span className='text-[#17c1ff] font-semibold'>SHOVEE</span>
              </p>{" "}
            </div>

            {/* Sidebar Close button */}
            <button
              className='text-black dark:text-white text-3xl font-bold'
              onClick={() => setShowMenu(!showMenu)}
            >
              <IoMdClose />
            </button>
          </div>

          <div className='p-2 flex flex-col gap-2'>
            {/* Navbar Links */}
            {NavbarMenu.map((navbar) => (
              <Link
                className='text-lg p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 rounded'
                href={navbar.link}
                key={navbar.name}
              >
                {navbar.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MobileNavbar;
