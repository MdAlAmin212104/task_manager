import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";

const useAdmin = () => {
    const axiosCommon = useAxiosCommon();
    const { user, loading} = useAuth();
    const { data : isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled : !loading,
        queryFn: async () => {
            const res = await axiosCommon.get(`/user/admin/${user.email}`);
            return res.data?.admin;
        },
    })

    return [isAdmin, isAdminLoading]
};

export default useAdmin;