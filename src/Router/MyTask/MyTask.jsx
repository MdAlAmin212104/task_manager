import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hook/useAxiosCommon";
import useAuth from "../../hook/useAuth";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Swal from "sweetalert2";

const MyTask = () => {
    const [status, setStatus] = useState(null);
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const { data: TaskData, isLoading, error, refetch } = useQuery({
    queryKey: [user?.email, "TaskData"],
    queryFn: async () => {
      const res = await axiosCommon.get(`/task?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tasks</div>;
  }

  if (!TaskData || TaskData.length === 0) {
    return <div>No tasks found</div>;
  }

  const handleStatusChange = async (id, newStatus) => {
    setStatus(newStatus);
    try {
      await axiosCommon.patch(`/task/${id}`, { status: newStatus })
        .then(res => {
            if(res.data.modifiedCount > 0 ){
                Swal.fire("status updated")
                refetch();
            }
        })
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Total assign users</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {TaskData.map((task, idx) => (
            <tr key={task._id}>
              <th>{idx + 1}</th>
              <td>{task.name}</td>
              <td>{task.users.length}</td>
              <td>
                <select onChange={(e) =>handleStatusChange(task._id, e.target.value)} className="select select-bordered">
                  <option defaultValue={task.status}>
                    {task.status}
                  </option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td className="text-xl">
                <button>
                  <FaEdit />
                </button>
              </td>
              <td className="text-xl">
                <button>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTask;
