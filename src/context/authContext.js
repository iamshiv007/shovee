"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import firebase_app from "@/firebase/config";
import Loader from "@/components/application/layout/loader/Loader";

const auth = getAuth(firebase_app);

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    // User Authenticate By Firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
                setLoading(false);
            },
            (error) => {
                // Handle the error here
                console.log(
                    "Error occurred while checking authentication state:",
                    error
                );
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

//  Custom Auth Hook
export const useAuthContext = () => useContext(AuthContext);
