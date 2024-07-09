import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useAxiosCommon from "../../../hook/useAxiosCommon";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AssignTask = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();
  const { data: userId, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/user/${user?.email}`);
      return res.data._id;
    },
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!userId) return; // Exit early if userId is not available yet

        const response = await axiosCommon.get(`/userTasks/${userId}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userId, axiosCommon]);

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

  return (
    <div>
      <h2>User Tasks</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr key={task._id}>
                <th>{idx + 1}</th>
                <td>{task.name}</td>
                <td>{task.description}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => markCompleted(task._id)}>
              Mark Completed
            </button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default AssignTask;
