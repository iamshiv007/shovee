import { Fragment, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import { Inter } from "next/font/google"
import { useDispatch, useSelector } from "react-redux"

import Navbar from "@/components/application/layout/navbar/Navbar"
import Footer from "@/components/application/layout/footer/Footer"
import Loader from "@/components/application/layout/loader/Loader"
import { useAlert } from "@/context/alertContext"
import { useAuthContext } from "@/context/authContext"
import { authGetHome } from "@/redux/actions/portfolioActions"
import { clearErrors } from "@/redux/reducers/homeDataReducer"
import ChatBox from "@/components/application/tawto/chatbox"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const { showAlert } = useAlert()
  const { user } = useAuthContext()
  const dispatch = useDispatch()

  const { home, loading, error } = useSelector(state => state.homeData)

  // Data Connection
  useEffect(() => {
    // Check the initial network status
    const initialOnlineStatus = navigator.onLine;

    if (!initialOnlineStatus) {
      showAlert("Network Error: Please check your data connection.", "error");
    }
    // Add an event listener to track network status changes
    const handleNetworkChange = () => {
      showAlert("Network Error: Please check your data connection.", "error");
    };

    window.addEventListener("offline", handleNetworkChange);

    return () => {
      // Remove event listeners when the component unmounts
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, [showAlert]);

  useEffect(() => {
    if (user?.email) {
      dispatch(authGetHome(user?.uid))
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }
  }, [error, dispatch]);

  return (
    <Fragment>
      {/* Head */}
      <Head>
        <title>Shovee - Personal Portfolio Generator</title>
        <meta content="Shovee - Personal Portfolio Generator" name="title" />
        <meta content="Shovee is the best personal portfolio generator that allows anyone to effortlessly create their own impressive portfolio website. Showcase your skills, achievements, and more with Shovee." name="description" />
        <meta content="portfolio generator, free portfolio generator, best personal portfolio, Next.js personal portfolio" name="keywords" />
        <meta content="Shivraj Gurjar" name="author" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      </Head>

      <div className='min-h-screen'>
        {/* Navbar */}
        <Navbar />
        {/* ChatBox */}
        <ChatBox />

        {/* Text  */}
        {loading ? <Loader /> : <div className='min-h-screen flex flex-col justify-center items-center gap-5'>
          {user?.email && home?.userName ?
            <>
              <h1 className='p-2 text-4xl text-center font-semibold'>
                Update Your Personal Portfolio.
              </h1>
              <div className="flex gap-3">
                {/* Demo Button */}
                <Link
                  className='text-white py-1 px-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded'
                  href='/its/shiv'
                >
                  Demo
                </Link>
                {/* Profile button */}
                <Link
                  className='text-white py-1 px-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded'
                  href='/auth/profile'
                >
                  Profile
                </Link>
              </div>
            </>
            :
            <>
              <h1 className='p-2 text-4xl text-center font-semibold'>
                Let&apos;s Build a Stunning Personal Portfolio !
              </h1>
              <div className="flex gap-3">
                {/* Demo Button */}
                <Link
                  className='text-white py-1 px-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded'
                  href='/its/shiv'
                >
                  Demo
                </Link>
                {/* Start button */}
                <Link
                  className='text-white py-1 px-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded'
                  href='/portfolio/form/home'
                >
                  Start
                </Link>
              </div>
            </>
          }
        </div>}
      </div>

      <Footer />
    </Fragment>
  )
}
