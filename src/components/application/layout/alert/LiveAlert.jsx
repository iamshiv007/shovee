import React from "react";
import Link from "next/link";
import { AiOutlineCheckCircle } from "react-icons/ai";

// Live Alert
export const LiveAlert = ({ liveAlert, userName, firstName }) => {
  return (
    <div
      className={styles.mainContainer}
      style={liveAlert ? { display: "block" } : { display: "none" }}
    >
      <div className={styles.container}>
        <div className={styles.alertBox}>
          <AiOutlineCheckCircle size={100} />
          <div className={styles.flexContainer}>
            <p className={styles.message}>
              Congratulations {firstName}! You Are Live Now.
            </p>
            <div className={styles.linkContainer}>
              {/* Portfolio Link */}
              <Link className={styles.link} href={`/its/${userName}`}>
                See Portfolio
              </Link>
              {/* Profile Link */}
              <Link className={styles.link} href='/auth/profile'>
                See Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define a styles object to store your class names
const styles = {
  mainContainer: "w-full fixed top-5 z-20",
  container:
    "py-3 px-5 w-fit m-auto bg-green-600 flex items-center gap-8 rounded",
  alertBox: "text-white flex flex-col items-center gap-5",
  flexContainer: "flex flex-col gap-5",
  message: "text-white font-semibold",
  linkContainer: "flex justify-between gap-2",
  link: "text-white py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded",
};
