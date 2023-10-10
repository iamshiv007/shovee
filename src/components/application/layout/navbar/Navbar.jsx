"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { TbBulbFilled } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";

import MobileNavbar from "./SidebarMobile";
import { NavbarMenu } from "./NavbarItems";
import NavbarMobile from "./NavbarMobile";
import { style } from "../../../portfolio/layout/navbar/Navbar";

import { ThemeContext } from "@/context/themeContext";
import { useAuthContext } from "@/context/authContext";

const Navbar = () => {
  const [top, setTop] = useState("0");
  const [showMenu, setShowMenu] = useState(false);

  const { user } = useAuthContext();
  const { setThemeFun, theme } = useContext(ThemeContext);

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
    <Fragment>
      {/* Desktop Header */}
      <div className={style.container} style={{ top: top }}>
        {/* Brand Name With Logo */}
        <Link className={styles.logo} href='/'>
          <Image alt='logo' height={40} src='/images/logo.png' width={40} />
          <p>
            <span className={styles.brandName}>SHOVEE</span>
          </p>
        </Link>
        <div className={style.menu}>
          {/* Navbar Links*/}
          {NavbarMenu.map((navbar) => (
            <Link
              className={styles.menuItem}
              href={navbar.link}
              key={navbar.name}
            >
              <div className={styles.item}>{navbar.name}</div>
            </Link>
          ))}
        </div>
        {/* Toggle Theme button */}
        <div className={style.btnWrapper}>
          <button className={style.themeBtn} onClick={setThemeFun}>
            {theme === "dark" ? (
              <TbBulbFilled />
            ) : (
              <BsFillLightningChargeFill />
            )}
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

      {/* Mobile Header */}
      <NavbarMobile
        setShowMenu={setShowMenu}
        setThemeFun={setThemeFun}
        showMenu={showMenu}
        theme={theme}
        top={top}
        user={user}
      />

      {/* Sidebar For Mobile Screen */}
      <MobileNavbar setShowMenu={setShowMenu} showMenu={showMenu} />
    </Fragment>
  );
};

export default Navbar;

const styles = {
  logo: "flex items-center gap-2",
  brandName: "text-[#17c1ff] font-semibold",
  menuItem: "font-semibold",
  item: "h-full pb-1 hover:pb-0 px-2 flex items-center hover:border-b-4  border-black dark:border-white transition-all",
};
