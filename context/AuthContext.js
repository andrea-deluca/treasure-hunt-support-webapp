import { createContext, useEffect, useState } from "react";
import { auth, database } from '../lib/firebase'
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../components/loading";
import { ref, get, child } from "firebase/database";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        userProviderId: "",
        userId: "",
        userEmail: "",
        userType: ""
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const requiredData = {
                    userProviderId: user.providerData[0].providerId,
                    userId: user.uid,
                    userEmail: user.email,
                }
                // setUserData(requiredData)
                setCurrentUser(user)

                const dbRef = ref(database)
                get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
                    setUserData({
                        ...requiredData,
                        userName: snapshot.val().name,
                        userType: snapshot.val().type
                    })
                })
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