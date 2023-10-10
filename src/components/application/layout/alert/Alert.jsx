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
      <div className={styles.container}>
        <div
          className={`${styles.alertBox} 
        ${alert ? "translate-x-0" : "translate-x-[-200px]"}
          ${alert?.type === "error" && "bg-red-600"} 
          ${alert?.type === "warning" && "bg-yellow-600"}
          ${alert?.type === "success" && "bg-green-600"}`}
        >
          <div className={styles.flexContainer}>
            {/* Alert Icon */}
            <p className={styles.alertIcon}>
              {alert?.type === "error" && <BiErrorCircle />}
              {alert?.type === "warning" && <AiOutlineWarning />}
              {alert?.type === "success" && <IoIosCheckmarkCircleOutline />}
            </p>

            {/* Alert Message */}
            <p className={styles.alertMessage}>{alert?.message}</p>
          </div>

          {/* Hide Alert */}
          <button className={styles.closeButton} onClick={hideAlert}>
            <AiOutlineClose size={22} />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Alert;

// Define a styles object to store your class names
const styles = {
  container: "overflow-x-hidden",
  alertBox:
    "font-semibold w-fit px-5 py-3 m-auto rounded flex items-center gap-6 fixed top-3 left-3 z-20 transition-all duration-500",
  flexContainer: "flex items-center gap-2",
  alertIcon: "text-white text-2xl",
  alertMessage: "text-white",
  closeButton: "hover:scale-110",
};
