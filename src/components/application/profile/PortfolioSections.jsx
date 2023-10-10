import React, { useState } from "react";
import Link from "next/link";
import { FiLink2 } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";

import SubmitLoader from "../layout/loader/SubmitLoader";
import DeleteModal from "./DeleteModal";

export const PortfolioSections = ({ allSections }) => {
  const [modal, setModal] = useState("");

  return (
    <>
      <div>
        <div className={styles.section}>
          <p>
            <AiFillHome />
          </p>
          <p>HOME</p>
        </div>
        <div className={styles.btnWrapper}>
          {" "}
          <Link className={styles.updateBtn} href={"/portfolio/update/home"}>
            Update
          </Link>
        </div>
      </div>
      <div>
        <div className={styles.section}>
          <p>
            <FiLink2 />
          </p>
          <p>SOCIAL MEDIA</p>
        </div>
        <div className={styles.btnWrapper}>
          {" "}
          <Link
            className={styles.updateBtn}
            href='/portfolio/update/socialMedia'
          >
            Update
          </Link>
        </div>
      </div>
      {allSections.map((section) => (
        <div key={section.name}>
          {/* Delete Confirmation Modal */}
          <DeleteModal modal={modal} section={section} setModal={setModal} />

          <div className={styles.section}>
            <p>{section.icon}</p>
            <p> {section.name.toUpperCase()}</p>
          </div>
          <div className={styles.btnWrapper}>
            {" "}
            {section.data?.userName ? (
              <>
                {section.loading && <SubmitLoader />}
                <Link
                  className={styles.updateBtn}
                  href={`/portfolio/update/${section.name}`}
                >
                  Update
                </Link>
                <button
                  className={styles.deleteBtn}
                  disabled={section.loading}
                  onClick={() => setModal(section.name)}
                >
                  {section.loading ? "Sending" : "Delete"}
                </button>
              </>
            ) : (
              <Link
                className={styles.createBtn}
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

const styles = {
  section: "flex items-center gap-2",
  btnWrapper: "mt-3 flex justify-between",
  updateBtn:
    "text-white font-semibold px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded",
  deleteBtn: "font-semibold px-3 py-1 bg-red-600 hover:bg-red-700 rounded",
  createBtn:
    "text-white font-semibold px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded",
};
