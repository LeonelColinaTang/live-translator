import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import toast from "react-hot-toast";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputs.username.length < 6) {
      return toast.error("Username must be at least 6 characters long");
    }

    if (inputs.password.length < 6) {
      return toast.error("Username must be at least 6 characters long");
    }

    login(inputs.username, inputs.password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-modal bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-100">
          Live
          <span className="text-orange-400"> Translator</span>
        </h1>

        <form onSubmit={handleLogin}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              data-test="cypress-inputUserName"
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              data-test='cypress-inputPassword'
              type="text"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-orange-300 mt-2 inline-block text-white"
          >
            Don't have an account?
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2  text-orange-500 hover:bg-orange-400 hover:text-white"
              data-test="cypress-loginbtn"
            >
              {loading ? "Signing in..." : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
