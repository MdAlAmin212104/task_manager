import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container mx-auto my-24">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <img src="/login/login.svg" alt="" />
        </div>
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
            <h1 className="text-5xl font-semibold text-center pt-12">Login</h1>
            <form className=" mx-12">
            <div className="form-control my-6">
                <label className="label">
                <span className="label-text font-semibold text-[18px]">Email</span>
                </label>
                <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                />
            </div>
            <div className="form-control">
                <label className="label">
                <span className="label-text font-semibold text-[18px]">Confirm Password</span>
                </label>
                <input
                type="password"
                placeholder="Your password"
                className="input input-bordered"
                required
                />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
            </div>
            </form>
            <p className="text-center my-6 font-semibold">Have an account? <Link to='/register' className="text-[#FF3811]">Register</Link> </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
