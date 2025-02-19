import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "../../AuthProvider/Provider";
import Swal from "sweetalert2";

const Login = () => {
  const { userLogIn } = useContext(AuthProvider);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    userLogIn(email, password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login success",
          showConfirmButton: false,
          timer: 1500,
        });
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((error) =>
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        })
      );
  };
  return (
    <div className="container mx-auto my-24">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <img src="/login/login.svg" alt="" />
        </div>
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
          <h1 className="text-5xl font-semibold text-center pt-12">Login</h1>
          <form onSubmit={handleLogin} className=" mx-12">
            <div className="form-control my-6">
              <label className="label">
                <span className="label-text font-semibold text-[18px]">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-[18px]">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="text-center my-6 font-semibold">
            Have an account?{" "}
            <Link to="/register" className="text-[#FF3811]">
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
