import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import API from "../services/api";

import toast from "react-hot-toast";

import {
  FaUsers,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

function AdminDashboard() {

  const adminName =
    localStorage.getItem("name");

  const [activeSection, setActiveSection] =
    useState("events");

  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [fees, setFees] = useState([]);
  const [complaints, setComplaints] =
    useState([]);

  const [eventData, setEventData] =
    useState({
      title: "",
      description: "",
      date: "",
    });

  const [feeData, setFeeData] =
    useState({
      title: "",
      amount: "",
      dueDate: "",
    });

  const fetchUsers = async () => {

    const res = await API.get(
      "/auth/users"
    );

    setUsers(res.data);
  };

  const fetchEvents = async () => {

    const res = await API.get("/events");

    setEvents(res.data);
  };

  const fetchFees = async () => {

    const res = await API.get("/fees");

    setFees(res.data);
  };

  const fetchComplaints = async () => {

    const res = await API.get(
      "/complaints"
    );

    setComplaints(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchEvents();
    fetchFees();
    fetchComplaints();
  }, []);

  const handleEventChange = (e) => {

    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFeeChange = (e) => {

    setFeeData({
      ...feeData,
      [e.target.name]: e.target.value,
    });
  };

  const createEvent = async () => {

    if (
      !eventData.title ||
      !eventData.description ||
      !eventData.date
    ) {
      return toast.error(
        "Fill all fields"
      );
    }

    await API.post(
      "/events/create",
      eventData
    );

    toast.success("Event Created");

    setEventData({
      title: "",
      description: "",
      date: "",
    });

    fetchEvents();
  };

  const createFee = async () => {

    if (
      !feeData.title ||
      !feeData.amount ||
      !feeData.dueDate
    ) {
      return toast.error(
        "Fill all fields"
      );
    }

    await API.post(
      "/fees/create",
      feeData
    );

    toast.success("Fee Added");

    setFeeData({
      title: "",
      amount: "",
      dueDate: "",
    });

    fetchFees();
  };

  const resolveComplaint = async (
    id
  ) => {

    await API.post(
      `/complaints/resolve/${id}`
    );

    toast.success(
      "Complaint Resolved"
    );

    fetchComplaints();
  };

  const students = users.filter(
    (user) => user.role === "student"
  );

  const teachers = users.filter(
    (user) => user.role === "teacher"
  );

  return (
    <div className="min-h-screen bg-[#f5f7fb] ml-[290px] p-10">

      <Sidebar
        role="admin"
        activeSection={activeSection}
        setActiveSection={
          setActiveSection
        }
      />

      <div className="mb-10">

        <h1 className="text-5xl font-black text-indigo-600">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 text-lg mt-3">
          Welcome back, {adminName}
        </p>

      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mb-12">

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-gray-500 font-medium">
              Students
            </h2>

            <FaUsers className="text-indigo-500 text-2xl" />

          </div>

          <h1 className="text-5xl font-black text-gray-800">
            {students.length}
          </h1>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-gray-500 font-medium">
              Teachers
            </h2>

            <FaChalkboardTeacher className="text-violet-500 text-2xl" />

          </div>

          <h1 className="text-5xl font-black text-gray-800">
            {teachers.length}
          </h1>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-gray-500 font-medium">
              Events
            </h2>

            <FaCalendarAlt className="text-blue-500 text-2xl" />

          </div>

          <h1 className="text-5xl font-black text-gray-800">
            {events.length}
          </h1>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-gray-500 font-medium">
              Complaints
            </h2>

            <FaExclamationTriangle className="text-red-500 text-2xl" />

          </div>

          <h1 className="text-5xl font-black text-gray-800">
            {complaints.length}
          </h1>

        </div>

      </div>

      {activeSection === "events" && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-10">

          <h2 className="text-4xl font-black text-gray-800 mb-6">
            Create Event
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={eventData.title}
            onChange={handleEventChange}
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl p-4 mb-4 outline-none"
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={handleEventChange}
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl p-4 mb-4 outline-none"
          />

          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleEventChange}
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl p-4 mb-4 outline-none"
          />

          <button
            onClick={createEvent}
            className="bg-sky-600 hover:bg-sky-700 text-gray-700 px-6 py-3 rounded-2xl"
          >
            Create Event
          </button>

        </div>
      )}

      {activeSection === "fees" && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-10">

          <h2 className="text-4xl font-black text-gray-800 mb-6">
            Fee Management
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Fee Title"
            value={feeData.title}
            onChange={handleFeeChange}
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl p-4 mb-4 outline-none"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={feeData.amount}
            onChange={handleFeeChange}
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl p-4 mb-4 outline-none"
          />

          <input
            type="date"
            name="dueDate"
            value={feeData.dueDate}
            onChange={handleFeeChange}
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl p-4 mb-4 outline-none"
          />

          <button
            onClick={createFee}
            className="bg-sky-600 hover:bg-sky-700 text-gray-700 px-6 py-3 rounded-2xl"
          >
            Add Fee
          </button>

        </div>
      )}

      {activeSection === "complaints" && (
        <div>

          <h2 className="text-4xl font-black text-gray-800 mb-6">
            Student Complaints
          </h2>

          <div className="space-y-5">

            {complaints.map(
              (complaint) => (

                <div
                  key={complaint._id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >

                  <h2 className="text-2xl font-bold mb-2">
                    {complaint.subject}
                  </h2>

                  <p className="text-gray-600 mb-4">
                    {complaint.message}
                  </p>

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-indigo-600 font-medium">
                        Student:{" "}
                        {
                          complaint.student
                        }
                      </p>

                      <p className="text-gray-500 mt-1">
                        Status:{" "}
                        {
                          complaint.status
                        }
                      </p>

                    </div>

                    {complaint.status ===
                      "Pending" && (
                      <button
                        onClick={() =>
                          resolveComplaint(
                            complaint._id
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-gray-700 px-5 py-2 rounded-2xl"
                      >
                        Resolve
                      </button>
                    )}

                  </div>

                </div>
              )
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminDashboard;