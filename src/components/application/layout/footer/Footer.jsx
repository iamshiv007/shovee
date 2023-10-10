import React, { Fragment } from "react";
import Link from "next/link";

import { NavbarMenu } from "../navbar/NavbarItems";
import { SocialMediaData } from "./socialMediaData";

const Footer = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>PAGES</p>
          {/* Application Page Links */}
          {NavbarMenu.map((item) => (
            <Link className={styles.link} href={item.link} key={item.name}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Our Tagline */}
        <div>
          <p>Made For Developers By Developers ❤️️</p>
        </div>

        <div className={styles.right}>
          {/* Social Media Links */}
          <p>CONTACT US</p>
          {SocialMediaData.map((social) => (
            <Link
              className={styles.link}
              href={social.link}
              key={social.name}
              target='_blank'
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;

const styles = {
  container:
    "px-[20px] py-[30px] border-t border-gray-300 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-3",
  left: "md:w-[25%] flex flex-col",
  link: "hover:underline",
  right: "md:w-[25%] flex flex-col md:items-end",
};
