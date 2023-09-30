"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import signUp from "@/firebase/auth/signup";
import signinGoogle from "@/firebase/auth/signinGoogle";
import signinGithub from "@/firebase/auth/signinGithub";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const router = useRouter();
  const { showAlert } = useAlert();
  const { user } = useAuthContext();

  const signupRef = useRef();
  const formRef = useRef();

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Password Validation
    // Minimum 8 characters, at least one number, one letter, and no repeating characters
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-zA-Z])(?!.*([a-zA-Z\d])\1{2,}).{8,}$/;

    setIsPasswordValid(passwordRegex.test(password));
    if (!passwordRegex.test(password)) {
      return showAlert("Password in wrong format !", "error");
    }
    setLoading(true);
    const { result, error } = await signUp(email, password);

    if (error) {
      setLoading(false);
      console.log(error);
      return showAlert(error.message, "error");
    }

    // Data Store To Database
    try {
      const { data } = await axios.post("/api/auth/signup", {
        uid: result.user.uid,
        email,
        password,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    // Else successful
    showAlert("Account created successfully !", "success");
    return router.push("/");
  };

  // Handle Password
  const handlePassword = (e) => {
    setPassword(e.target.value);
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-zA-Z])(?!.*([a-zA-Z\d])\1{2,}).{8,}$/;
    if (passwordRegex.test(e.target.value)) {
      setIsPasswordValid(passwordRegex.test(e.target.value));
    }
  };

  // Signin With Google
  const signInWithGoogle = async () => {
    const { result, error } = await signinGoogle();

    if (error) {
      return showAlert(error?.message || error?.customData?.email, "error");
    } else {
      // Data Store To Database
      try {
        const { data } = await axios.post("/api/auth/signup", {
          uid: result.user.uid,
          email: result.user.email,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      showAlert("Account created successfully !", "success");
      return router.push("/");
    }
  };

  // Signup With Github
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
      showAlert("Account created successfully !", "success");
      return router.push("/");
    }
  };

  // Scroll Animation
  useEffect(() => {
    if (signupRef.current) {
      const signupObserver = new IntersectionObserver(([signupEntry]) => {
        setIsSignup(signupEntry.isIntersecting);
      });

      signupObserver.observe(signupRef.current);

      if (isSignup) {
        formRef?.current?.classList.add("slide-in");
      } else {
        formRef?.current?.classList.remove("slide-in");
      }
    }
  }, [signupRef, loading, isSignup]);

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
            <title>Signup</title>
          </Head>
          {/* Navbar */}
          <Navbar />

          {/* Submit Loader */}
          {loading && <SubmitLoader />}

          <div
            className='px-[20px] pb-[30px] pt-[80px] m-auto min-h-[100vh] md:w-[500px] overflow-hidden'
            ref={signupRef}
          >
            <h1 className='text-3xl text-center mb-3'>Create Account</h1>
            <form
              className='md:px-[20px] py-[20px] flex flex-col gap-5 md:border border-gray-600 rounded dark:md:bg-[#0a0a0a] transition-all duration-700 translate-x-[500px] opacity-0'
              onSubmit={handleSubmit}
              ref={formRef}
            >
              {/* Email */}
              <div className='flex flex-col gap-1'>
                <InputElement
                  handleInputChange={(e) => setEmail(e.target.value)}
                  id='email'
                  label='Email*'
                  name='email'
                  placeholder='myname@gmail.com'
                  required={true}
                  type='email'
                  value={email}
                />
              </div>
              <div className='flex flex-col gap-1'>
                {/* Password */}
                <label htmlFor='password'>Password*</label>
                <div className='flex w-full justify-between dark:bg-slate-900 border border-gray-400 focus:border-gray-600 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 dark:focus:border-gray-400 rounded overflow-hidden'>
                  <input
                    autoComplete='new-password'
                    className='w-[90%] px-3 py-2 dark:bg-slate-900'
                    id='password'
                    name='password'
                    onChange={handlePassword}
                    placeholder='Password'
                    required
                    type={passVisible ? "text" : "password"}
                    value={password}
                  />
                  {/* Eye button */}
                  <button
                    className='text-black dark:text-white w-[10%] text-xl flex justify-center items-center'
                    onClick={() => setPassVisible(!passVisible)}
                    type='button'
                  >
                    {passVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>

                {/* Password Error */}
                <p
                  className='text-sm text-red-500'
                  style={
                    isPasswordValid ? { display: "none" } : { display: "block" }
                  }
                >
                  Note - Password must contain Minimum 8 characters, at least
                  one number, one letter, and no repeating characters.
                </p>
              </div>

              {/* Create Button */}
              <button
                className='font-bold py-1 px-3 bg-blue-600 hover:bg-blue-700 rounded'
                disabled={loading}
                type='submit'
              >
                {loading ? "Sending..." : "Create"}
              </button>

              {/* Login Link */}
              <div className='flex justify-between gap-2'>
                <p>Already have an account ?</p>
                <Link
                  className='text-blue-600 hover:underline'
                  href='/auth/login'
                >
                  Log in
                </Link>
              </div>

              {/* Google Signup Button */}
              <button
                className='px-4 py-2 w-full border border-gray-950 dark:border-gray-400 rounded flex gap-4 justify-center items-center bg-gray-700 hover:bg-gray-800'
                onClick={signInWithGoogle}
                type='button'
              >
                <FcGoogle size={22} />
                <p>Sign up with Google</p>
              </button>

              {/* Github Signup Button */}
              <button
                className='px-4 py-2 w-full border border-gray-950 dark:border-gray-400 rounded flex gap-4 justify-center items-center bg-gray-700 hover:bg-gray-800'
                onClick={signInWithGithub}
                type='button'
              >
                <BsGithub color={"#4078c0"} size={22} />
                Sign up with Github
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
