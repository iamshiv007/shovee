"use client";
import React from "react";
import Link from "next/link";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { TbBulbFilled } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";

import { style } from "@/components/portfolio/layout/navbar/NavbarMobile";

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
    <div className={style.mainContainer} style={{ top }}>
      <div className={style.left}>
        {/* Open Sidebar Button */}
        <button
          className={style.hamburger}
          onClick={() => setShowMenu(!showMenu)}
        >
          <GiHamburgerMenu />
        </button>

        {/* Brand Name */}
        <Link className={styles.brandWrapper} href='/'>
          <p>
            <span className={styles.brandName}>SHOVEE</span>
          </p>
        </Link>
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

const styles = {
  brandWrapper: "w-[20%] flex items-center gap-2",
  brandName: "text-[#17c1ff] font-semibold",
};
