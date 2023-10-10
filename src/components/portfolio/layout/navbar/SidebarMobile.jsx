import React, { Fragment } from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { DiTechcrunch } from "react-icons/di";
import { useSelector } from "react-redux";

import { NavbarMenu } from "./NavbarItems";

const MobileNavbar = ({ showMenu, setShowMenu }) => {
  const { home } = useSelector((state) => state.homeData);

  return (
    <Fragment>
      <div
        className={`${style.mainContainer} ${showMenu ? null : "hidden"}`}
        onClick={() => setShowMenu(!showMenu)}
      >
        {/* Sidebar */}
        <div
          className={`${style.container} ${
            showMenu ? null : "translate-x-[-450px]"
          } `}
        >
          <div className={style.top}>
            {/* Name Logo */}
            <div className={style.left}>
              <div className={style.avatar}>
                {home?.firstName.split("")[0].toUpperCase()}
              </div>
              <p className={style.logo}>
                <span className={style.name}>
                  {home?.firstName.toUpperCase()}
                </span>{" "}
                <DiTechcrunch />
              </p>
            </div>

            {/* Sidebar Close button */}
            <button
              className={style.closeBtn}
              onClick={() => setShowMenu(!showMenu)}
            >
              <IoMdClose />
            </button>
          </div>

          <div className={style.menu}>
            {/* Navbar Links */}
            {NavbarMenu.map((navbar) => (
              <Link className={style.item} href={navbar.link} key={navbar.name}>
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

const style = {
  mainContainer:
    "w-full h-screen bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.3)] fixed top-0 left-0 z-10",
  container:
    "w-[70%] h-screen bg-white dark:bg-black shadow-sm shadow-gray-600 dark:shadow-gray-300 transition-all duration-1000",
  top: "p-3 bg-gray-200 dark:bg-gray-800 flex justify-between items-center gap-3",
  left: "flex items-center gap-2",
  avatar:
    "text-white w-8 h-8 bg-[#159e6e] dark:bg-[#17c1ff] rounded-full flex justify-center items-center",
  logo: "text-gray-400 flex",
  name: "text-lg font-bold",
  closeBtn: "text-black dark:text-white text-3xl font-bold",
  menu: "p-2 flex flex-col gap-2",
  item: "text-lg p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 rounded",
};
