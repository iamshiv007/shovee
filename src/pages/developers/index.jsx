"use client";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllHome } from "@/redux/actions/portfolioActions";
import { useAlert } from "@/context/alertContext";
import Loader from "@/components/application/layout/loader/Loader";
import Navbar from "@/components/application/layout/navbar/Navbar";
import Footer from "@/components/application/layout/footer/Footer";

const Developers = () => {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const { homes, loading, error } = useSelector((state) => state.allHomeData);

  useEffect(() => {
    dispatch(getAllHome());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showAlert(error, "error");
    }
  }, [error, showAlert]);

  return (
    <Fragment>
      <Head>
        <title>Developers</title>
      </Head>
      <Navbar />
      {loading ? (
        <Loader />
      ) : homes && homes.length !== 0 ? (
        <div className='px-[20px] pb-[30px] pt-[80px] m-auto flex flex-col gap-3'>
          <h2 className='text-3xl text-center mb-3'>Developers</h2>

          {homes
            .slice()
            .reverse()
            .map((home) => (
              <div
                className='w-full md:w-[500px] m-auto p-5 border border-gray-600 rounded flex justify-between gap-5'
                key={home.userName}
              >
                <div className='text-white w-8 h-8 bg-[#159e6e] dark:bg-[#17c1ff] rounded-full flex justify-center items-center'>
                  {home.firstName.split("")[0]}
                </div>
                <div className='w-[50%] md:w-[70%] flex flex-col gap-2'>
                  <p>{home.firstName}</p>
                  <p className='hidden md:block'>{home.email}</p>
                </div>
                <Link
                  className='text-white h-fit py-1 px-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded '
                  href={`/its/${home.userName}`}
                >
                  Portfolio
                </Link>
              </div>
            ))}
        </div>
      ) : (
        <div>No developers found</div>
      )}
      <Footer />
    </Fragment>
  );
};

export default Developers;
