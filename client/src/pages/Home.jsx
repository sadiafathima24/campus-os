import { Link } from "react-router-dom";

import {
  FaBookOpen,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaRobot,
} from "react-icons/fa";

function Home() {

  return (
    <div className="min-h-screen bg-[#f4f7fb]">

      <nav className="flex items-center justify-between px-16 py-6 bg-white border-b border-gray-200">

        <div>

          <h1 className="text-3xl font-black text-blue-600">
            CampusOS
          </h1>

          <p className="text-sm text-gray-500">
            Institutional Operating System
          </p>

        </div>

        <div className="flex items-center gap-4">

          <Link
  to="/login"
  style={{
    background: "#ffffff",
    color: "#334155",
    border: "1px solid #d1d5db",
    padding: "16px 32px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "130px"
  }}
>
  Login
</Link>

          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] text-gray-700 px-6 py-3 rounded-xl transition-all"
          >
            Register
          </Link>

        </div>

      </nav>

      <div className="px-16 py-20 grid md:grid-cols-2 grid-cols-1 gap-16 items-center">

        <div>

          <p className="text-blue-600 font-semibold mb-4 uppercase tracking-wider">
            Modern Academic Management
          </p>

          <h1 className="text-6xl font-black leading-tight text-gray-800 mb-6">

            Smart Campus
            Management for
            Modern Institutions

          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">

            CampusOS streamlines academic workflows with
            integrated course management, assignments,
            grievance handling, fee management,
            study materials, and AI-powered learning support.

          </p>

          <div className="flex gap-4">

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] text-gray-700 px-8 py-4 rounded-xl transition-all font-medium"
            >
              Get Started
            </Link>

            <Link
  to="/login"
  className="bg-white border border-gray-300 text-gray-700 hover:text-sky-700 hover:bg-gray-50 px-8 py-4 rounded-xl transition-all font-medium flex items-center justify-center"
>
  Login
</Link>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">

          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">

            <div className="bg-[#f8fbff] rounded-2xl p-6 border border-blue-100">

              <FaBookOpen className="text-3xl text-blue-600 mb-5" />

              <h2 className="text-xl font-bold mb-3">
                Course Management
              </h2>

              <p className="text-gray-600">
                Teachers can create courses,
                upload materials, and manage learning efficiently.
              </p>

            </div>

            <div className="bg-[#f8fbff] rounded-2xl p-6 border border-blue-100">

              <FaClipboardCheck className="text-3xl text-green-600 mb-5" />

              <h2 className="text-xl font-bold mb-3">
                Assignments
              </h2>

              <p className="text-gray-600">
                Students can submit assignments
                and receive evaluated grades digitally.
              </p>

            </div>

            <div className="bg-[#f8fbff] rounded-2xl p-6 border border-blue-100">

              <FaMoneyBillWave className="text-3xl text-yellow-500 mb-5" />

              <h2 className="text-xl font-bold mb-3">
                Fee Management
              </h2>

              <p className="text-gray-600">
                Institutions can organize
                payments and fee tracking seamlessly.
              </p>

            </div>

            <div className="bg-[#f8fbff] rounded-2xl p-6 border border-blue-100">

              <FaRobot className="text-3xl text-violet-600 mb-5" />

              <h2 className="text-xl font-bold mb-3">
                AI Assistance
              </h2>

              <p className="text-gray-600">
                AI-powered learning support
                helps students study smarter and faster.
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="px-16 pb-20">

        <div className="bg-blue-600 rounded-2xl p-12 text-gray-700 text-center">

          <h1 className="text-4xl font-black mb-5">
            Designed for Modern Educational Institutions
          </h1>

          <p className="text-lg text-blue-100 max-w-3xl mx-auto">

            CampusOS integrates administration,
            academics, student support, and intelligent learning
            into one unified institutional ecosystem.

          </p>

        </div>

      </div>

    </div>
  );
}

export default Home;