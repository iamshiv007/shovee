import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";

import { NavbarMenu } from "./NavbarItems";

import { style } from "@/components/portfolio/layout/navbar/SidebarMobile";

const MobileNavbar = ({ showMenu, setShowMenu }) => {
  return (
    <Fragment>
      <div
        className={`${style.mainContainer} ${showMenu ? null : "hidden"} `}
        onClick={() => setShowMenu(!showMenu)}
      >
        {/* Sidebar */}
        <div
          className={`${style.container} ${
            showMenu ? null : "translate-x-[-450px]"
          } `}
        >
          <div className={style.top}>
            {/* Brand Name with Logo */}
            <div className={style.left}>
              <Image alt='logo' height={30} src='/images/logo.png' width={30} />
              <p>
                <span className={styles.brandName}>SHOVEE</span>
              </p>{" "}
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

const styles = {
  brandName: "text-[#17c1ff] font-semibold",
};
