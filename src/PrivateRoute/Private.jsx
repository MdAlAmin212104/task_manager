
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const Private = ({children}) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    if(loading){
        return <span className="loading loading-dots loading-md"></span>
    }

    if(user){
        return children;
    }


    return <Navigate to='/login' state={{from : location }} replace></Navigate>
};


export default Private;