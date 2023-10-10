import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineLink } from "react-icons/ai";
import CopyToClipboard from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import { BsCheckAll } from "react-icons/bs";

export const PortfolioLink = ({ home }) => {
  const [isCoppied, setIsCoppied] = useState(false);
  const [tooltipText, setTooltipText] = useState("Copy");

  // Copy
  const handleCopy = () => {
    setIsCoppied(true);
    setTooltipText("Copied");

    setTimeout(() => {
      setIsCoppied(false);
      setTooltipText("Copy");
    }, 2000);
  };

  return (
    home?.userName && (
      <div className={styles.container}>
        <p className={styles.icon}>
          <AiOutlineLink />
        </p>
        <Link className={styles.porfolioLink} href={`/its/${home?.userName}`}>
          {process.env.NEXT_PUBLIC_APPLICATION_URL}/its/
          {home?.userName}
        </Link>
        <CopyToClipboard
          onCopy={handleCopy}
          text={`${process.env.NEXT_PUBLIC_APPLICATION_URL}/its/${home?.userName}`}
        >
          <button
            className={styles.copyBtn}
            data-tooltip-content={tooltipText}
            data-tooltip-id='my-tooltip'
            data-tooltip-place='right'
          >
            {isCoppied ? <BsCheckAll /> : <MdContentCopy />}
          </button>
        </CopyToClipboard>
      </div>
    )
  );
};

const styles = {
  icon: "text-2xl",
  container: "mt-2 flex items-center gap-3",
  portfolioLink:
    "text-lg w-[200px] md:w-auto py-1 text-blue-600 hover:underline overflow-scroll md:overflow-auto",
  copyBtn: "text-white p-2 ml-2 bg-gray-700 rounded",
};
