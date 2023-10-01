import { Provider } from "react-redux"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import { Analytics } from "@vercel/analytics/react"

import store from "@/redux/store"
import AuthProvider from "@/context/authContext"
import ThemeProvider from "@/context/themeContext"
import AlertProvider from "@/context/alertContext"
import Alert from "@/components/application/layout/alert/Alert"
import "@/styles/globals.css"

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
            <Component {...pageProps} />
          </AlertProvider>
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  )
}
