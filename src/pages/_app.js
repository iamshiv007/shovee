import Head from "next/head";
import { Provider } from "react-redux"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import { Analytics } from "@vercel/analytics/react"
import ReactGA from "react-ga4";

import store from "@/redux/store"
import AuthProvider from "@/context/authContext"
import ThemeProvider from "@/context/themeContext"
import AlertProvider from "@/context/alertContext"
import Alert from "@/components/application/layout/alert/Alert"
import "@/styles/globals.css"

ReactGA.initialize(process.env.NEXT_PUBLIC_MEASUREMENT_ID);

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider>
          <AlertProvider>
            {/* Alert Component */}
            <Alert />
            {/* Tooltip Component */}
            <Tooltip
              className="z-30"
              delayShow={200}
              id='my-tooltip' style={{ backgroundColor: "#0000ffcc", color: "white", padding: "3px 6px" }}
            />
            {/* Analytics */}
            <Analytics />

            {/* Head */}
            <Head>
              <title>Shovee</title>
              <meta content="Shovee - Personal Portfolio Generator" name="title" />
              <meta content="This is an application where anybody can create their personal portfolio website by easily filling out details." name="description" />
              <meta content="portfolio generator, free portfolio generator, best personal portfolio, Next.js personal portfolio" name="keywords" />
              <meta content="Shivraj Gurjar" name="author" />
            </Head>

            <Component {...pageProps} />
          </AlertProvider>
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  )
}
