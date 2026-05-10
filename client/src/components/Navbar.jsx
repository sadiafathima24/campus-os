import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (
    <div className="flex items-center justify-between bg-slate-800 p-5 rounded-2xl mb-8">

      <div>
        <h1 className="text-2xl font-bold text-indigo-400">
          CampusOS
        </h1>

        <p className="text-slate-300">
          Welcome, {name} ({role})
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;