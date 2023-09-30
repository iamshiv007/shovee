import React from "react";

const DeleteModal = ({ section, modal, setModal }) => {
  return (
    <div>
      <div
        className='h-screen w-screen m-auto bg-[#0000006e] flex justify-center items-center fixed top-0 left-0 transition-all z-10'
        onClick={() => setModal("")}
        style={modal === section.name ? {} : { display: "none" }}
      >
        {/* Confirmation Quetion */}
        <div className='w-[80%] md:w-[500px] bg-gray-300 dark:bg-gray-800 px-5 py-3 rounded'>
          <p className='mb-4'>
            Are You Sure You Want to Delete {section.name.toUpperCase()} ?
          </p>
          <div className='flex justify-between'>
            {/* No Button */}
            <button
              className='text-white font-semibold px-3 py-1 bg-green-600 hover:bg-green-700 rounded'
              onClick={() => setModal("")}
            >
              No
            </button>
            {/* Yes Button */}
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
    </div>
  );
};

export default DeleteModal;
