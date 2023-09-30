"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import Navbar from "@/components/application/layout/navbar/Navbar";
import Loader from "@/components/application/layout/loader/Loader";
import SubmitLoader from "@/components/application/layout/loader/SubmitLoader";
import { InputElement } from "@/components/application/layout/input/InputElement";
import { useAlert } from "@/context/alertContext";
import { useAuthContext } from "@/context/authContext";
import signIn from "@/firebase/auth/signin";
import signinGoogle from "@/firebase/auth/signinGoogle";
import signinGithub from "@/firebase/auth/signinGithub";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [isSignin, setIsSignin] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const { showAlert } = useAlert();
  const { user } = useAuthContext();

  const signinRef = useRef();
  const formRef = useRef();

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { result, error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      return showAlert(error.message, "error");
    }

    // Else successful
    showAlert("Logged in successfully !", "success");
    return router.push(redirect ? redirect : "/");
  };

  // Login With google
  const signInWithGoogle = async () => {
    const { result, error } = await signinGoogle();

    if (error) {
      return showAlert(error?.message || error?.customData?.email, "error");
    } else {
      try {
        const { data } = await axios.post("/api/auth/signup", {
          uid: result.user.uid,
          email: result.user.email,
        });

        console.log(data);
      } catch (error) {
        console.log(error);
      }
      showAlert("Logged in successfully !", "success");
      return router.push(redirect ? redirect : "/");
    }
  };

  // Login with github
  const signInWithGithub = async () => {
    const { result, error } = await signinGithub();

    if (error) {
      return showAlert(error?.message || error?.customData?.email, "error");
    } else {
      try {
        const { data } = await axios.post("/api/auth/signup", {
          uid: result.user.uid,
          email: result.user.email,
        });

        console.log(data);
      } catch (error) {
        console.log(error);
      }
      showAlert("Logged in successfully !", "success");
      return router.push(redirect ? redirect : "/");
    }
  };

  // Scroll Animation
  useEffect(() => {
    if (signinRef.current) {
      const signupObserver = new IntersectionObserver(([signupEntry]) => {
        setIsSignin(signupEntry.isIntersecting);
      });

      signupObserver.observe(signinRef.current);

      if (isSignin) {
        formRef?.current?.classList.add("slide-in");
      } else {
        formRef?.current?.classList.remove("slide-in");
      }
    }
  }, [signinRef, loading, isSignin]);

  useEffect(() => {
    if (user?.email) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <Fragment>
      {!user?.email ? (
        <>
          <Head>
            <title>Login</title>
          </Head>
          {/* Navbar */}
          <Navbar />
          {/* Submit Loader */}
          {loading && <SubmitLoader />}
          <div
            className='px-[20px] pb-[30px] pt-[80px] m-auto min-h-[100vh] md:w-[500px] overflow-hidden'
            ref={signinRef}
          >
            <h1 className='text-3xl text-center mb-3'>Log in</h1>
            <form
              className='md:px-[20px] py-[20px] flex flex-col gap-5 md:border border-gray-600 rounded dark:md:bg-[#0a0a0a] transition-all duration-700 translate-x-[500px] opacity-0'
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className='flex flex-col gap-1'>
                {/* Email */}
                <InputElement
                  handleInputChange={(e) => setEmail(e.target.value)}
                  id='email'
                  label='Email*'
                  name='email'
                  placeholder='myname@gmail.com'
                  required={true}
                  type='email'
                  value={email || ""}
                />
              </div>
              <div className='flex flex-col gap-1'>
                {/* Password */}
                <label htmlFor='password'>Password*</label>
                <div className='flex w-full justify-between dark:bg-slate-900 border border-gray-400 focus:border-gray-400 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 dark:focus:border-gray-400 rounded overflow-hidden'>
                  <input
                    className='w-[90%] px-3 py-2 dark:bg-slate-900'
                    id='password'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='password'
                    required
                    type={passVisible ? "text" : "password"}
                    value={password}
                  />
                  {/* Eye Button */}
                  <button
                    className='text-black dark:text-white w-[10%] text-xl flex justify-center items-center'
                    onClick={() => setPassVisible(!passVisible)}
                    type='button'
                  >
                    {passVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
              </div>
              {/* Login Button */}
              <button
                className='font-bold py-1 px-3 bg-blue-600 hover:bg-blue-700 rounded'
                disabled={loading}
                type='submit'
              >
                {loading ? "sending..." : "Log in"}
              </button>

              {/* Create Acount Link */}
              <div className='flex justify-between gap-2'>
                <p>Don&apos;t have an account ?</p>
                <Link
                  className='text-blue-600 hover:underline'
                  href='/auth/signup'
                >
                  Create account
                </Link>
              </div>

              {/* Google Login Button */}
              <button
                className='px-4 py-2 w-full border border-gray-950 dark:border-gray-400 rounded flex gap-4 justify-center items-center bg-gray-700 hover:bg-gray-800'
                onClick={signInWithGoogle}
                type='button'
              >
                <FcGoogle size={22} />
                <p>Log in with Google</p>
              </button>

              {/* Github Login Button */}
              <button
                className='px-4 py-2 w-full border border-gray-950 dark:border-gray-400 rounded flex gap-4 justify-center items-center bg-gray-700 hover:bg-gray-800'
                onClick={signInWithGithub}
                type='button'
              >
                <BsGithub color={"#4078c0"} size={22} />
                Log in with Github
              </button>
            </form>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default Page;
