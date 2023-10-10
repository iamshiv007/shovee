import React from "react";

const DeleteModal = ({ section, modal, setModal }) => {
  return (
    <div>
      <div
        className={styles.container}
        onClick={() => setModal("")}
        style={modal === section.name ? {} : { display: "none" }}
      >
        {/* Confirmation Quetion */}
        <div className={styles.box}>
          <p className='mb-4'>
            Are You Sure You Want to Delete {section.name.toUpperCase()} ?
          </p>
          <div className={styles.buttonContainer}>
            {/* No Button */}
            <button className={styles.noBtn} onClick={() => setModal("")}>
              No
            </button>
            {/* Yes Button */}
            <button
              className={styles.yesBtn}
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
    </div>
  );
};

export default DeleteModal;

const styles = {
  container:
    "h-screen w-screen m-auto bg-[#0000006e] flex justify-center items-center fixed top-0 left-0 transition-all z-10",
  box: "w-[80%] md:w-[500px] bg-gray-300 dark:bg-gray-800 px-5 py-3 rounded",
  buttonContainer: "flex justify-between",
  noBtn:
    "text-white font-semibold px-3 py-1 bg-green-600 hover:bg-green-700 rounded",
  yesBtn:
    "text-white font-semibold px-3 py-1 bg-red-600 hover:bg-red-700 rounded",
};
