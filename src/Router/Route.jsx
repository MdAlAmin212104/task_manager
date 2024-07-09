import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AddTask from "../Pages/AddTask/AddTask";
import MyTask from "./MyTask/MyTask";
import TaskUpdate from "../Pages/TaskUpdate/TaskUpdate";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/register",
            element: <Register/>
        },
        {
          path: "/add",
          element: <AddTask/>
        },
        {
          path: "/myTask",
          element: <MyTask/>
        },
        {
          path: `/update/:id`,
          element: <TaskUpdate/>,
          loader : ({ params }) => fetch(`${import.meta.env.VITE_URL}task/${params.id}`)
        },

      ]
    },
]);