import React from "react";
import Link from "next/link";
import { AiOutlineCheckCircle } from "react-icons/ai";

// Live Alert
export const LiveAlert = ({ liveAlert, userName, firstName }) => {
  return (
    <div
      className='w-full fixed top-5 z-20 left-2 right-2 md:left-auto md:right-auto'
      style={liveAlert ? { display: "block" } : { display: "none" }}
    >
      <div
        className={
          "py-3 px-5 w-fit m-auto bg-green-600 flex items-center gap-8 rounded"
        }
      >
        <div className='text-white flex flex-col items-center gap-5'>
          <AiOutlineCheckCircle size={100} />
          <div className='flex flex-col gap-5'>
            <p className='text-white font-semibold'>
              Congratulations {firstName}! You Are Live Now.
            </p>
            <div className='flex justify-between gap-2'>
              {/* Portfolio Link */}
              <Link
                className='text-white py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded'
                href={`/its/${userName}`}
              >
                See Portfolio
              </Link>
              {/* Profile Link */}
              <Link
                className='text-white py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded'
                href='/auth/profile'
              >
                See Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
