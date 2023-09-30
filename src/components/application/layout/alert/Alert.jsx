"use client";
import React, { Fragment } from "react";
import { AiOutlineClose, AiOutlineWarning } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import { useAlert } from "@/context/alertContext";

const Alert = () => {
  const { alert, hideAlert } = useAlert();

  return (
    <Fragment>
      <div className='overflow-x-hidden'>
        <div
          className={`font-semibold w-fit px-5 py-3 m-auto rounded flex items-center gap-6 fixed top-3 left-3 z-20 transition-all duration-500 
        ${alert ? "translate-x-0" : "translate-x-[-200px]"}
          ${alert?.type === "error" && "bg-red-600"} 
          ${alert?.type === "warning" && "bg-yellow-600"}
          ${alert?.type === "success" && "bg-green-600"}`}
        >
          <div className='flex items-center gap-2'>
            {/* Alert Icon */}
            <p className='text-white text-2xl'>
              {alert?.type === "error" && <BiErrorCircle />}
              {alert?.type === "warning" && <AiOutlineWarning />}
              {alert?.type === "success" && <IoIosCheckmarkCircleOutline />}
            </p>

            {/* Alert Message */}
            <p className='text-white'>{alert?.message}</p>
          </div>

          {/* Hide Alert */}
          <button className='hover:scale-110' onClick={hideAlert}>
            <AiOutlineClose size={22} />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Alert;
