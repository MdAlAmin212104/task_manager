import { useContext } from "react";
import { AuthProvider } from "../AuthProvider/Provider";

const useAuth = () => {
        const authInfo = useContext(AuthProvider)
        return  authInfo;
};

export default useAuth;