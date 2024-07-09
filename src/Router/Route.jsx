import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AddTask from "../Pages/AddTask/AddTask";
import MyTask from "../Pages/MyTask/MyTask";
import TaskUpdate from "../Pages/TaskUpdate/TaskUpdate";
import AssignTask from "../Pages/UserTask/AssignTask/AssignTask";
import Private from "../PrivateRoute/Private";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";

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
          path: "/assignTask",
          element: <Private><AssignTask/></Private>
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
          element: <AdminPrivateRoute><AddTask/></AdminPrivateRoute>
        },
        {
          path: "/myTask",
          element: <AdminPrivateRoute><MyTask/></AdminPrivateRoute>
        },
        {
          path: `/update/:id`,
          element: <AdminPrivateRoute><TaskUpdate/></AdminPrivateRoute>,
          loader : ({ params }) => fetch(`${import.meta.env.VITE_URL}task/${params.id}`)
        },

      ]
    },
]);