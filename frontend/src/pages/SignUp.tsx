import { useState } from "react";
import LanguageCheckBox from "../components/signup/LanguageCheckBox";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    prefLang: "",
  });
  const { loading, signup } = useSignUp();

  const handleLangCheckbox = (language: "EN" | "SP") => {
    setInputs({ ...inputs, prefLang: language });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-100">
          Sign Up <span className="text-orange-400"> Live Translator</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {/* USERNAME INPUT */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              data-test="cypress-userNameInput"
              type="text"
              placeholder="Your username"
              value={inputs.username}
              className="w-full input input-bordered h-10"
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          {/* EMAIL INPUT */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Email</span>
            </label>
            <input
              data-test="cypress-userEmailInput"
              type="email"
              placeholder="your_email@example.com"
              value={inputs.email}
              className="w-full input input-bordered h-10"
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
          {/* PASSWORD INPUT */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              data-test="cypress-userPasswordInput"
              type="password"
              placeholder="Enter your password"
              value={inputs.password}
              className="w-full input input-bordered h-10"
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          {/* CONFIRM PASSWORD INPUT */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Confirm Password
              </span>
            </label>
            <input
              data-test="cypress-passwrodConfirm"
              type="password"
              placeholder="Confirm your password"
              value={inputs.confirmPassword}
              className="w-full input input-bordered h-10"
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          {/* PREFERRED LANGUAGE CHECKBOX */}
          <LanguageCheckBox
            onCheckboxChange={handleLangCheckbox}
            selectedLang={inputs.prefLang}
          />
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-orange-400 mt-2 inline-block text-white"
          >
            Already have an account? Log in
          </Link>

          <div>
            <button
              data-test="cypress-signupBtn"
              className="btn btn-block btn-sm mt-2 border border-slate-700 text-orange-500 hover:bg-orange-400 hover:text-white"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
