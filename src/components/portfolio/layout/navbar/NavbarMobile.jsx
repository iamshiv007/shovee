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
    <div className={style.mainContainer} style={{ top }}>
      <div className={style.left}>
        {/* Open Sidebar Button */}
        <button
          className={style.hamburger}
          onClick={() => setShowMenu(!showMenu)}
        >
          <GiHamburgerMenu />
        </button>

        {/* Name Logo */}
        <p className={style.logo}>
          <span className={style.name}>{home?.firstName}</span> <DiTechcrunch />
        </p>
      </div>

      {/* Toggle Theme Button */}
      <div className={style.right}>
        <button className={style.themeBtn} onClick={setThemeFun}>
          {theme === "dark" ? <TbBulbFilled /> : <BsFillLightningChargeFill />}
        </button>
        {/* Profile Icon */}
        <div
          className={style.profileBtn}
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

export const style = {
  mainContainer:
    "w-full px-5 py-3 bg-[#ffffffcc] dark:bg-[#000000cc] backdrop-filter backdrop-blur-lg flex justify-between md:hidden shadow-md shadow-gray-300 dark:shadow-gray-800 fixed z-10",
  left: "flex items-center gap-4",
  hamburger: "text-black dark:text-white text-3xl font-semibold",
  logo: "text-gray-400 flex",
  name: "text-lg font-bold",
  right: "flex items-center gap-4",
  themeBtn:
    "text-[#159e6e] dark:text-[#17c1ff] text-2xl font-semibold hover:scale-110",
  profileBtn: "p-1 border border-gray-500 rounded-full",
};
