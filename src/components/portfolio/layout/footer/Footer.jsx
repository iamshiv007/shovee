import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const { home } = useSelector((state) => state.homeData);

  return (
    <Fragment>
      {home?.email && (
        <div className={style.container}>
          <div className={style.leftSide}>
            {/* Like button */}{" "}
            <button
              className={style.link}
              data-tooltip-content='Like'
              data-tooltip-id='my-tooltip'
              data-tooltip-place='right'
            >
              <AiOutlineHeart />
            </button>
          </div>

          {/* Brand Logo */}
          <Link href='/'>
            <div className={style.logo}>
              <Image alt='logo' height={40} src='/images/logo.png' width={40} />
              <p>
                <span className={style.brand}>SHOVEE</span>
              </p>
            </div>
          </Link>

          {/* Email */}
          <p className={style.email}>{home?.email}</p>
        </div>
      )}
    </Fragment>
  );
};

export default Footer;

const style = {
  container:
    "px-[20px] py-3 flex flex-col md:flex-row justify-between items-center gap-3",
  leftSide: "md:w-[25%]",
  like: "text-xl text-black dark:text-white",
  logo: "flex justify-center items-center gap-2",
  brand: "text-[#17c1ff] font-semibold",
  email: "md:w-[25%] md:text-right",
};
