import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";

import API from "../services/api";

import toast from "react-hot-toast";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "student",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        formData
      );

      toast.success(
        "Registration Successful"
      );

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-6">

      <div className="grid md:grid-cols-2 grid-cols-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-6xl w-full">

        <div className="bg-blue-600 p-14 text-gray-700 flex flex-col justify-center">

          <h1 className="text-5xl font-black leading-tight mb-6">

            Join
            CampusOS

          </h1>

          <p className="text-blue-100 text-lg leading-relaxed">

            Create your institutional account
            to access courses, assignments,
            fee management, academic resources,
            and intelligent learning tools.

          </p>

        </div>

        <div className="p-14">

          <h1 className="text-4xl font-black text-gray-800 mb-3">
            Register
          </h1>

          <p className="text-gray-500 mb-10">
            Create your account to get started
          </p>

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            <input
  type="text"
  name="name"
  placeholder="Full Name"
  value={formData.name}
  onChange={handleChange}
  className="w-full bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 rounded-xl p-4 outline-none focus:border-sky-500"
/>

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

           <select
  name="role"
  value={formData.role}
  onChange={handleChange}
  className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl p-4 outline-none focus:border-sky-500"
>
  <option value="student">
    Student
  </option>

  <option value="teacher">
    Teacher
  </option>

  <option value="admin">
    Administrator
  </option>
</select>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] text-gray-700 p-4 rounded-xl transition-all font-medium"
            >
              Create Account
            </button>

          </form>

          <div className="text-gray-500 mt-8">

  Already have an account?{" "}

  <Link
    to="/login"
    className="text-sky-600 font-medium ml-1"
  >
    Login
  </Link>

</div>

        </div>

      </div>

    </div>
  );
}

export default Register;