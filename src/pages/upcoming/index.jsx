import React, { Fragment } from "react";

import Navbar from "@/components/application/layout/navbar/Navbar";
import Footer from "@/components/application/layout/footer/Footer";

const Upcoming = () => {
  return (
    <Fragment>
      <Navbar />
      <div className='min-h-[100vh] pt-[90px] px-[20px] md:px-[100px] lg:px-[200px]'>
        <p className='text-2xl font-semibold'>
          We&apos;re building the biggest social network 🚀 for developers.
        </p>

        <div className='mt-8'>
          <p className='text-xl font-semibold'>Upcoming Features</p>
          <ul className=''>
            <li>
              🎨&nbsp; Personal Portfolio Design: Diverse portfolio templates
              for showcasing your work uniquely.
            </li>
            <li>🤝&nbsp; Connect with Developers: Network and collaborate.</li>
            <li>💼&nbsp; Job Provider Chat: Engage with job providers.</li>
            <li>
              💡&nbsp; Problem Sharing: Developers can share coding challenges.
            </li>
            <li>✅ More option(design) for creating Personal Portfolio.</li>
            <li>🚀&nbsp; Quick Answers: Get rapid help from peers.</li>
            <li>✍️&nbsp; Blogging: Create and publish insightful blogs.</li>
            <li>
              📆&nbsp; Daily Updates: Share daily progress and achievements.
            </li>
            <li>
              🧠&nbsp; Knowledge Posts: Share tutorials and tips for skill
              growth.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Upcoming;
