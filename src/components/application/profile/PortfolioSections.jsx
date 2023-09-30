import React, { useState } from "react";
import Link from "next/link";
import { FiLink2 } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";

import SubmitLoader from "../layout/loader/SubmitLoader";

export const PortfolioSections = ({ allSections }) => {
  const [modal, setModal] = useState("");

  return (
    <>
      <div>
        <div className='flex items-center gap-2'>
          <p>
            <AiFillHome />
          </p>
          <p>HOME</p>
        </div>
        <div className='mt-3 flex justify-between'>
          {" "}
          <Link
            className='text-white font-semibold px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded'
            href={"/portfolio/update/home"}
          >
            Update
          </Link>
        </div>
      </div>
      <div>
        <div className='flex items-center gap-2'>
          <p>
            <FiLink2 />
          </p>
          <p>SOCIAL MEDIA</p>
        </div>
        <div className='mt-3 flex justify-between'>
          {" "}
          <Link
            className='text-white font-semibold px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded'
            href='/portfolio/update/socialMedia'
          >
            Update
          </Link>
        </div>
      </div>
      {allSections.map((section) => (
        <div key={section.name}>
          {/* Delete Confirmation Modal */}
          <div
            className='h-screen w-screen m-auto bg-[#0000006e] flex justify-center items-center fixed top-0 left-0 transition-all z-10'
            onClick={() => setModal("")}
            style={modal === section.name ? {} : { display: "none" }}
          >
            <div className='w-[80%] md:w-[500px] bg-gray-300 dark:bg-gray-800 px-5 py-3 rounded'>
              <p className='mb-4'>
                Are You Sure You Want to Delete {section.name.toUpperCase()}
              </p>
              <div className='flex justify-between'>
                <button
                  className='text-white font-semibold px-3 py-1 bg-green-600 hover:bg-green-700 rounded'
                  onClick={() => setModal("")}
                >
                  No
                </button>
                <button
                  className='text-white font-semibold px-3 py-1 bg-red-600 hover:bg-red-700 rounded'
                  onClick={() => {
                    setModal("");
                    section.fun();
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <p>{section.icon}</p>
            <p> {section.name.toUpperCase()}</p>
          </div>
          <div className='mt-3 flex justify-between'>
            {" "}
            {section.data?.userName ? (
              <>
                {section.loading && <SubmitLoader />}
                <Link
                  className='text-white font-semibold px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded'
                  href={`/portfolio/update/${section.name}`}
                >
                  Update
                </Link>
                <button
                  className='font-semibold px-3 py-1 bg-red-600 hover:bg-red-700 rounded'
                  disabled={section.loading}
                  onClick={() => setModal(section.name)}
                >
                  {section.loading ? "Sending" : "Delete"}
                </button>
              </>
            ) : (
              <Link
                className='text-white font-semibold px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded'
                href={`/portfolio/form/${section.name}`}
              >
                Create
              </Link>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
