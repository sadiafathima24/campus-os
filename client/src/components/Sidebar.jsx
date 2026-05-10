import {
  FaBook,
  FaClipboardList,
  FaMoneyBill,
  FaExclamationCircle,
  FaCalendarAlt,
  FaUserGraduate,
} from "react-icons/fa";

import { FiLogOut } from "react-icons/fi";

function Sidebar({
  role,
  activeSection,
  setActiveSection,
}) {

  const userName =
    localStorage.getItem("name");

  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/";
  };

  const navButtonStyle = (section) =>
    `w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium ${
      activeSection === section
        ? "bg-sky-100 text-sky-700"
        : "text-gray-600 hover:bg-sky-50 hover:text-sky-700"
    }`;

  return (
    <div className="w-[290px] h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col justify-between px-6 py-8">

      <div>

        <div className="mb-10">

          <h1 className="text-4xl font-black text-sky-600 tracking-tight">
            CampusOS
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Institutional Management Platform
          </p>

        </div>

        <div className="bg-gradient-to-r from-sky-500 to-cyan-500 rounded-2xl p-5 text-gray-700 mb-10 shadow-sm">

          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl mb-4">

            <FaUserGraduate />

          </div>

          <h2 className="text-xl font-bold capitalize">
            {userName}
          </h2>

          <p className="capitalize text-sky-100 mt-1">
            {role}
          </p>

        </div>

        <div className="space-y-3">

          {role !== "admin" && (
            <button
              onClick={() =>
                setActiveSection("courses")
              }
              className={navButtonStyle(
                "courses"
              )}
            >
              <FaBook />
              Courses
            </button>
          )}

          {role !== "admin" && (
            <button
              onClick={() =>
                setActiveSection(
                  "assignments"
                )
              }
              className={navButtonStyle(
                "assignments"
              )}
            >
              <FaClipboardList />
              Assignments
            </button>
          )}

          {(role === "student" ||
            role === "admin") && (
            <button
              onClick={() =>
                setActiveSection("fees")
              }
              className={navButtonStyle(
                "fees"
              )}
            >
              <FaMoneyBill />
              Fees
            </button>
          )}

          {(role === "student" ||
            role === "admin") && (
            <button
              onClick={() =>
                setActiveSection(
                  "complaints"
                )
              }
              className={navButtonStyle(
                "complaints"
              )}
            >
              <FaExclamationCircle />
              Complaints
            </button>
          )}

          {role === "admin" && (
            <button
              onClick={() =>
                setActiveSection("events")
              }
              className={navButtonStyle(
                "events"
              )}
            >
              <FaCalendarAlt />
              Events
            </button>
          )}

        </div>

      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 bg-red-50 hover:bg-red-100 text-red-500 px-5 py-4 rounded-2xl transition-all"
      >
        <FiLogOut />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;