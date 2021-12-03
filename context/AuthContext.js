import { createContext, useEffect, useState } from "react";
import { auth } from '../lib/firebase'
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../components/loading";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        userProviderId: "",
        userId: "",
        userName: "",
        userEmail: "",
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const requiredData = {
                    userProviderId: user.providerData[0].providerId,
                    userId: user.uid,
                    userName: user.displayName,
                }

                setUserData(requiredData)
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <AuthContext.Provider value={{ currentUser, userData }}>
            {children}
        </AuthContext.Provider>
    );
}