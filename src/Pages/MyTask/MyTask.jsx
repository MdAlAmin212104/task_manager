import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hook/useAxiosCommon";
import useAuth from "../../hook/useAuth";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyTask = () => {
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const {
    data: TaskData,
    isLoading,
    error,
    refetch,
  } = useQuery({
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
    try {
      await axiosCommon
        .patch(`/task/${id}`, { status: newStatus })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire("status updated");
            refetch();
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosCommon.delete(`/task/${id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

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
                <select
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className="select select-bordered"
                >
                  <option defaultValue={task.status}>{task.status}</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td className="text-xl">
                <Link to={`/update/${task._id}`}>
                  <FaEdit />
                </Link>
              </td>
              <td className="text-xl">
                <button onClick={() => handleDelete(task._id)}>
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
