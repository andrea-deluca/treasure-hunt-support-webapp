import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";

const AuthRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const router = useRouter()

    if (currentUser) {
        return <>{children}</>
    } else {
        router.push("/login")
        return <></>
    }
}

export default AuthRoute;