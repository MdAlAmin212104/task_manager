import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hook/useAdmin";
import useAuth from "../hook/useAuth";

const AdminPrivateRoute = ({children}) => {
    const { user, loading}= useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()

    if(loading || isAdminLoading){
        return <span className="loading loading-dots loading-md"></span>
    }

    if(user && isAdmin){
        return children;
    }
    

    return <Navigate to='/' state={{from : location }} replace></Navigate>
};

export default AdminPrivateRoute;