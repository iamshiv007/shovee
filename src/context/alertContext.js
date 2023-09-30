"use client";
import { createContext, useCallback, useContext, useState } from "react";

export const AlertContext = createContext();

const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState();

    // Show Alert
    const showAlert = useCallback((message, type) => {
        setAlert({ message, type });
        setTimeout(() => {
            setAlert();
        }, 5000);
    }, []);

    // Hide Alert
    const hideAlert = () => {
        setAlert();
    };

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert, alert }}>
            {children}
        </AlertContext.Provider>
    );
};

export default AlertProvider;

// Custom Alert Hook
export const useAlert = () => useContext(AlertContext);
