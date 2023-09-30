import React, { Fragment } from "react";
import Link from "next/link";

import { NavbarMenu } from "../navbar/NavbarItems";
import { SocialMediaData } from "./socialMediaData";

const Footer = () => {
  return (
    <Fragment>
      <div className='px-[20px] py-[30px] border-t border-gray-300 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-3'>
        <div className='md:w-[25%] flex flex-col'>
          <p>PAGES</p>
          {/* Application Page Links */}
          {NavbarMenu.map((item) => (
            <Link className='hover:underline' href={item.link} key={item.name}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Our Tagline */}
        <div>
          <p>Made For Developers By Developers ❤️️</p>
        </div>

        <div className='md:w-[25%] flex flex-col md:items-end'>
          {/* Social Media Links */}
          <p>CONTACT US</p>
          {SocialMediaData.map((social) => (
            <Link
              className='hover:underline'
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
