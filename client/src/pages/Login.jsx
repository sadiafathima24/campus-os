import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";

import API from "../services/api";

import toast from "react-hot-toast";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "name",
        res.data.name
      );

      toast.success("Login Successful");

      if (res.data.role === "student") {
        navigate("/student");
      }

      else if (
        res.data.role === "teacher"
      ) {
        navigate("/teacher");
      }

      else {
        navigate("/admin");
      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-6">

      <div className="grid md:grid-cols-2 grid-cols-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-6xl w-full">

        <div className="bg-blue-600 p-14 text-gray-700 flex flex-col justify-center">

          <h1 className="text-5xl font-black leading-tight mb-6">

            Welcome Back
            to CampusOS

          </h1>

          <p className="text-blue-100 text-lg leading-relaxed">

            Access your academic dashboard,
            manage institutional activities,
            and continue your learning experience seamlessly.

          </p>

        </div>

        <div className="p-14">

          <h1 className="text-4xl font-black text-gray-800 mb-3">
            Login
          </h1>

          <p className="text-gray-500 mb-10">
            Enter your credentials to continue
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <input
  type="email"
  name="email"
  placeholder="Email Address"
  value={formData.email}
  onChange={handleChange}
  className="w-full bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 rounded-xl p-4 outline-none focus:border-sky-500"
/>

           <input
  type="password"
  name="password"
  placeholder="Password"
  value={formData.password}
  onChange={handleChange}
  className="w-full bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 rounded-xl p-4 outline-none focus:border-sky-500"
/>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] text-gray-700 p-4 rounded-xl transition-all font-medium"
            >
              Login
            </button>

          </form>

          <div className="text-gray-500 mt-8">

  Don’t have an account?{" "}

  <Link
    to="/register"
    className="text-sky-600 font-medium ml-1"
  >
    Register
  </Link>

</div>

        </div>

      </div>

    </div>
  );
}

export default Login;