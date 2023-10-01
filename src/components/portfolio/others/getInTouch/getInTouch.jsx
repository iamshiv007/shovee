"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { BsFillSendCheckFill } from "react-icons/bs";

import InputElement from "../../layout/input/InputElement";
import TextAreaElement from "../../layout/input/TextAreaElement";

import { useAlert } from "@/context/alertContext";
import { clearErrors, resetMail } from "@/redux/reducers/mailReducer";
import { createMail } from "@/redux/actions/mailActions";
import SubmitLoader from "@/components/application/layout/loader/SubmitLoader";

const GetInTouch = () => {
  const [mailForm, setMailForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isGit, setIsGit] = useState(false);
  const gitRef = useRef();
  const imageRef = useRef();
  const formRef = useRef();

  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const { home, loading } = useSelector((state) => state.homeData);
  const {
    mailCreated,
    loading: loading2,
    error,
  } = useSelector((state) => state.mail);

  // onChange event
  const handleInputChange = (e) => {
    setMailForm({ ...mailForm, [e.target.name]: e.target.value });
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = mailForm;

    dispatch(
      createMail({ name, email, subject, message, receiverEmail: home.email })
    );
  };

  useEffect(() => {
    if (mailCreated) {
      showAlert("Mail Sent Successfully", "success");
      dispatch(resetMail());
      setMailForm({ name: "", email: "", subject: "", message: "" });
    }
    if (error) {
      showAlert(error, "error");
      dispatch(clearErrors());
    }
  }, [mailCreated, error, showAlert, dispatch]);

  // Scroll Animation
  useEffect(() => {
    if (gitRef.current) {
      const getScreenWidth = () =>
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      const gitObserver = new IntersectionObserver(
        ([gitEntry]) => {
          setIsGit(gitEntry.isIntersecting);
        },
        {
          rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-200px"}`,
        }
      );

      gitObserver.observe(gitRef.current);

      if (isGit) {
        imageRef.current.classList.add("slide-in");
        formRef.current.classList.add("slide-in");
      } else {
        imageRef.current.classList.remove("slide-in");
        formRef.current.classList.remove("slide-in");
      }
    }
  }, [isGit, gitRef, home]);

  return (
    <Fragment>
      {loading2 && <SubmitLoader />}
      {!loading && home?.email && (
        <div id={"getInTouch"} ref={gitRef}>
          <h2 className='text-3xl text-center font-bold pt-4 pb-8 flex justify-center items-center gap-3'>
            <BsFillSendCheckFill /> Get In Touch
          </h2>

          <div className='pb-[30px] px-[20px] lg:px-[200px] flex justify-center lg:justify-between items-center gap-4 shadow-sm shadow-zinc-300 dark:shadow-zinc-700 overflow-x-hidden'>
            <Image
              alt='developer'
              className='hidden lg:block translate-x-[-400px] opacity-0 transition-all duration-700'
              height={400}
              ref={imageRef}
              src={"/images/developer.png"}
              width={400}
            />

            <form
              action=''
              className='p-4 m-2 w-full md:w-auto flex flex-col gap-2 shadow-lg shadow-zinc-300 dark:shadow-zinc-700 translate-x-[400px] opacity-0 transition-all duration-700'
              method='post'
              onSubmit={handleSubmit}
              ref={formRef}
            >
              {/* Name */}
              <InputElement
                handleInputChange={handleInputChange}
                id='name'
                label='Name*'
                name='name'
                placeholder='Write You Name'
                required={true}
                type='text'
                value={mailForm.name}
              />
              {/* Email */}
              <InputElement
                handleInputChange={handleInputChange}
                id='email'
                label='Email*'
                name='email'
                placeholder='Write You Email Address'
                required={true}
                type='email'
                value={mailForm.email}
              />
              {/* Subject */}
              <InputElement
                handleInputChange={handleInputChange}
                id='subject'
                label='Subject*'
                name='subject'
                placeholder='Write You Email Subject'
                required={true}
                type='text'
                value={mailForm.subject}
              />
              {/* Message */}
              <TextAreaElement
                handleInputChange={handleInputChange}
                id='message'
                label='Message*'
                name='message'
                placeholder='Write You Message'
                required={true}
                rows={3}
                value={mailForm.message}
              />
              <button
                className='py-1 px-2 mt-2  bg-red-400 hover:bg-red-500 disabled:bg-red-400 rounded'
                disabled={loading2}
                type='submit'
              >
                {loading2 ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default GetInTouch;
