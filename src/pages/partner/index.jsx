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
              href='mailto:softdev.shivraj@gmail.com'
            >
              Share here
            </Link>
          </div>
        </div>

        <div className='mt-8'>
          <p className='text-xl font-semibold'>Key Points</p>
          <ul className='list-inside list-disc'>
            <li>
              Unpaid, but an excellent opportunity to build your portfolio.
            </li>
            <li>Proficient in web design and CSS styling.</li>
            <li>Strong expertise in ReactJS or NextJS.</li>
            <li>Strong grasp of JavaScript for logic development.</li>
            <li>Punctuality and dedication are a must.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Partner;
