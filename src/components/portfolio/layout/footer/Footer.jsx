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
        <div className='px-[20px] py-3 flex justify-between items-center'>
          <div className='md:w-[25%]'>
            {/* Like button */}{" "}
            <button
              className='text-xl text-black dark:text-white'
              data-tooltip-content='Like'
              data-tooltip-id='my-tooltip'
              data-tooltip-place='right'
            >
              <AiOutlineHeart />
            </button>
          </div>

          {/* Brand Logo */}
          <Link href='/'>
            <div className='flex justify-center items-center gap-2'>
              <Image alt='logo' height={40} src='/images/logo.png' width={40} />
              <p>
                <span className='text-[#17c1ff] font-semibold'>SHOVEE</span>
              </p>
            </div>
          </Link>

          {/* Email */}
          <p className='md:w-[25%] md:text-right'>{home?.email}</p>
        </div>
      )}
    </Fragment>
  );
};

export default Footer;
