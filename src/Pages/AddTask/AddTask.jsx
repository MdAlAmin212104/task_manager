import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import useAxiosCommon from "../../hook/useAxiosCommon";
import { useState } from "react";
import Swal from "sweetalert2";

const AddTask = () => {
    const { user } = useAuth();
  const axiosCommon = useAxiosCommon();
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosCommon.get("/users");
      return res.data;
    },
  });

  const [selectedUsers, setSelectedUsers] = useState([]);


  

  const handleUserChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    // Handle form submission here, including the selected users
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;

    const selectedUsersData = selectedUsers.map(userId => ({
        id: userId,
        status: 'To-Do'
    }));
    const task = {
        name,
        description,
        email : user.email,
        users: selectedUsersData,
        status : "To-Do",
    };

    axiosCommon.post('/task', task)
     .then((response) => {
        if(response.data.insertedId){
            form.reset();
            setSelectedUsers([]);
            Swal.fire('task added successfully')
        }
      })
       .catch((error) => {
        console.error("Error creating task", error);
      });
    
    
  };
    return (
        <div className="bg-[#F4F3F0] p-24 text-left">
      <h2 className="text-4xl text-center">Add Task</h2>
      <section className="p-6 bg-gray-100 text-gray-900">
        <form
          onSubmit={handleAddProduct}
          className="container flex flex-col space-y-12"
        >
          <fieldset className="grid grid-cols-2 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="TaskName" name="name" className="text-sm">
                  Task Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="task name"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 border-gray-300 p-2"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="Description" name="desc" className="text-sm">
                  Task Description
                </label>
                <textarea
                  placeholder="Task Description"
                  name="description"
                  className="textarea textarea-bordered textarea-md w-full h-32"
                ></textarea>
              </div>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="assignUser" name="name" className="text-sm">
                Select Users
              </label>
              {isLoading ? (
                <div>Loading users...</div>
              ) : error ? (
                <div>Error loading users</div>
              ) : (
                <div
                  className="grid grid-cols-1 gap-2 mt-4 overflow-y-auto"
                  style={{ maxHeight: '200px' }} 
                >
                  {users &&
                    users.map((user) => ( 
                        user.role === 'user' && 
                      <div key={user._id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`user-${user._id}`}
                          className="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => handleUserChange(user._id)}
                        />
                        <label htmlFor={`user-${user._id}`} className="text-sm">
                          <span className="font-bold">Name : </span> {user.name} <span className="font-bold">email :</span> {user.email}
                        </label>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="col-span-full sm:col-span-3">
              <input
                type="submit"
                value="Add Task"
                className="w-full btn btn-primary"
              />
            </div>
          </fieldset>
        </form>
      </section>
    </div>
    );
};

export default AddTask;