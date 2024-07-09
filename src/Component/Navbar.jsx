import { NavLink } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useAdmin from "../hook/useAdmin";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [ isAdmin] = useAdmin();


    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        
        {
          isAdmin ? <> 
          <li><NavLink to="/add">AddTask</NavLink></li>
          <li><NavLink to="/myTask">My Task</NavLink></li>
          </> : <li><NavLink to="/assignTask">AssignTask</NavLink></li>
        }
        {
          user? <button className="p-2 bg-slate-100 rounded-lg text-black ml-4 px-3" onClick={logout}>Logout</button> : 
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </>
        }
        
    </>
    
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Task Manager</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Dashboard</a>
      </div>
    </div>
  );
};

export default Navbar;
