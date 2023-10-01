import React, { Fragment } from "react";
import Link from "next/link";

import Footer from "@/components/application/layout/footer/Footer";
import Navbar from "@/components/application/layout/navbar/Navbar";

const Partner = () => {
  return (
    <Fragment>
      <Navbar />
      <div className='min-h-[100vh] pt-[90px] px-[20px] md:px-[100px] lg:px-[200px]'>
        <div>
          <p className='text-2xl font-semibold'>
            Just share your <span className='text-[#17c1ff]'>Shovee</span>{" "}
            portfolio, and you will become a member of its next version if you
            are a skilled developer.
          </p>
          {/* Share button */}
          <div className='mt-4'>
            <Link
              className='text-white py-1 px-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded'
              href='/portfolio/form/home'
            >
              Share Link
            </Link>
          </div>
        </div>

        <div className='mt-8'>
          <p className='text-xl font-semibold'>Key Points</p>
          <ul className='list-inside list-disc'>
            <li>
              You don&apos;t get paid, but you have a great project to showcase.
            </li>
            <li>You have practiced a lot of web design and CSS styling.</li>
            <li>You have a strong command of ReactJS or NextJS.</li>
            <li>You have a strong command of JavaScript logic building.</li>
            <li>You are a punctual and sincere developer.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Partner;
