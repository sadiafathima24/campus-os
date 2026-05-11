import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";

function StudentDashboard() {

  const studentName = localStorage.getItem("name");

  const [activeSection, setActiveSection] =
    useState("courses");

  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] =
    useState([]);
  const [fees, setFees] = useState([]);
  const [materials, setMaterials] =
    useState([]);

  const [complaintData, setComplaintData] =
    useState({
      subject: "",
      message: "",
    });

  const fetchCourses = async () => {

    const res = await API.get("/courses");

    setCourses(res.data);
  };

  const fetchAssignments = async () => {

    const res = await API.get("/assignments");

    setAssignments(res.data);
  };

  const fetchFees = async () => {

    const res = await API.get("/fees");

    setFees(res.data);
  };

  const fetchMaterials = async () => {

    const res = await API.get("/materials");

    setMaterials(res.data);
  };

  useEffect(() => {
    fetchCourses();
    fetchAssignments();
    fetchFees();
    fetchMaterials();
  }, []);

  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/";
  };

  const joinCourse = async (id) => {

    await API.post(`/courses/join/${id}`, {
      studentName,
    });

    toast.success("Joined Course");

    fetchCourses();
  };

  const leaveCourse = async (id) => {

    await API.post(`/courses/leave/${id}`, {
      studentName,
    });

    toast.success("Left Course");

    fetchCourses();
  };

  const submitAssignment = async (id) => {

    const fileInput = document.createElement("input");

    fileInput.type = "file";

    fileInput.accept = ".pdf,.ppt,.pptx";

    fileInput.onchange = async () => {

      const file = fileInput.files[0];

      if (!file) return;

      const formData = new FormData();

      formData.append("student", studentName);
      formData.append("file", file);

      await API.post(
        `/assignments/submit/${id}`,
        formData
      );

      toast.success("Assignment Submitted");

      fetchAssignments();
    };

    fileInput.click();
  };

  const payFee = async (id) => {

    await API.post(`/fees/pay/${id}`, {
      studentName,
    });

    toast.success("Fee Paid");

    fetchFees();
  };

  const submitComplaint = async () => {

    if (
      !complaintData.subject ||
      !complaintData.message
    ) {
      return toast.error("Fill all fields");
    }

    await API.post("/complaints/create", {
      student: studentName,
      ...complaintData,
    });

    toast.success("Complaint Submitted");

    setComplaintData({
      subject: "",
      message: "",
    });
  };

  const submittedAssignments =
    assignments.filter((assignment) =>
      assignment.submissions.some(
        (submission) =>
          submission.student ===
          studentName
      )
    ).length;

  const unpaidFees =
    fees.filter(
      (fee) =>
        !fee.paidStudents.includes(
          studentName
        )
    ).length;

  let fatigueStatus = "Healthy";
  let fatigueColor = "text-green-500";

  if (
    unpaidFees > 0 &&
    submittedAssignments === 0
  ) {

    fatigueStatus =
      "High Fatigue Risk";

    fatigueColor = "text-red-500";
  }

  else if (
    unpaidFees > 0 ||
    submittedAssignments < 2
  ) {

    fatigueStatus =
      "Moderate Fatigue";

    fatigueColor =
      "text-yellow-500";
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-gray-800 ml-[290px] p-10">

      <Sidebar
        role="student"
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex items-center justify-between mb-10">

        <div>
          <h1 className="text-4xl font-black text-blue-600">
            Student Dashboard
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Welcome back, continue your academic journey
          </p>
        </div>

        <div className="flex items-center gap-5">

          <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl shadow-sm">

            <p className="text-sm text-gray-500">
              Student
            </p>

            <h2 className="text-xl font-bold">
              {studentName}
            </h2>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98] transition-all text-gray-700 px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <FiLogOut />
            Logout
          </button>

        </div>

      </div>

      <div className="md:grid-cols-5 grid-cols-1 gap-6 mb-12 grid">

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <p className="text-gray-500 mb-3">
            Joined Courses
          </p>

          <h1 className="text-4xl font-black text-blue-600">
            {
              courses.filter((course) =>
                course.students.includes(studentName)
              ).length
            }
          </h1>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <p className="text-gray-500 mb-3">
            Submitted Assignments
          </p>

          <h1 className="text-4xl font-black text-green-500">
            {submittedAssignments}
          </h1>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <p className="text-gray-500 mb-3">
            Pending Fees
          </p>

          <h1 className="text-4xl font-black text-red-500">
            {unpaidFees}
          </h1>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <p className="text-gray-500 mb-3">
            Study Materials
          </p>

          <h1 className="text-4xl font-black text-violet-500">
            {materials.length}
          </h1>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <p className="text-gray-500 mb-3">
            Academic Wellness
          </p>

          <h1 className={`text-2xl font-black ${fatigueColor}`}>
            {fatigueStatus}
          </h1>

          <p className="text-sm text-gray-500 mt-3">

            Based on assignment activity
            and academic engagement.

          </p>

        </div>

      </div>

      {activeSection === "courses" && (
        <>
          <h2 className="text-4xl font-black text-gray-800 mb-6">
            Courses
          </h2>

          <div className="md:grid-cols-3 grid-cols-1 gap-6 mb-10 grid">

            {courses.map((course) => {

              const isJoined =
                course.students.includes(
                  studentName
                );

              return (
                <div
                  key={course._id}
                  className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all"
                >

                  <h2 className="text-2xl font-bold mb-3">
                    {course.title}
                  </h2>

                  <p className="text-gray-600 mb-3">
                    {course.description}
                  </p>

                  <p className="text-blue-600 mb-4">
                    Teacher: {course.teacher}
                  </p>

                  <div className="mb-5">

                    <h3 className="font-semibold mb-3 text-gray-700">
                      Study Materials
                    </h3>

                    <div className="space-y-3">

                      {materials
                        .filter(
                          (material) =>
                            material.course ===
                            course.title
                        )
                        .map((material) => (

                          <a
  href={`https://campus-os-7fh1.onrender.com/uploads/${material.file}`}
  target="_blank"
  rel="noreferrer"
  className="bg-sky-100 hover:bg-sky-200 text-sky-700 px-4 py-2 rounded-xl inline-block"
>
  Download Material
</a>
                        ))}

                    </div>

                  </div>

                  <div className="flex gap-3">

                    {isJoined ? (
                      <>
                        <button
                          className="bg-green-500 text-gray-700 px-5 py-2 rounded-xl"
                        >
                          Joined
                        </button>

                        <button
                          onClick={() =>
                            leaveCourse(
                              course._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98] transition-all text-gray-700 px-5 py-2 rounded-xl"
                        >
                          Leave
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() =>
                          joinCourse(
                            course._id
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all text-gray-700 px-5 py-2 rounded-xl"
                      >
                        Join Course
                      </button>
                    )}

                  </div>

                </div>
              );
            })}

            {courses.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center col-span-3">

                <h2 className="text-2xl font-bold text-gray-700 mb-3">
                  No Courses Available
                </h2>

                <p className="text-gray-500">
                  Courses added by teachers will appear here.
                </p>

              </div>
            )}

          </div>
        </>
      )}

      {activeSection === "assignments" && (
        <>
          <h2 className="text-4xl font-black text-gray-800 mb-6">
            Assignments
          </h2>

          <div className="md:grid-cols-2 grid-cols-1 gap-6 grid">

            {assignments.map((assignment) => (

              <div
                key={assignment._id}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all"
              >

                <h2 className="text-2xl font-bold mb-3">
                  {assignment.title}
                </h2>

                <p className="text-blue-600 mb-3">
                  {assignment.course}
                </p>

                <p className="mb-4 text-gray-600">
                  {assignment.description}
                </p>

                {assignment.submissions
                  .filter(
                    (submission) =>
                      submission.student ===
                      studentName
                  )
                  .map((submission, index) => (
                    <p
                      key={index}
                      className="text-green-500 font-medium mb-3"
                    >
                      Grade:{" "}
                      {submission.grade === null
                        ? "Pending"
                        : `${submission.grade}/100`}
                    </p>
                  ))}

                {assignment.submissions.some(
                  (submission) =>
                    submission.student ===
                    studentName
                ) ? (
                  <button
                    className="bg-green-500 text-gray-700 px-5 py-2 rounded-xl"
                  >
                    Submitted
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      submitAssignment(
                        assignment._id
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 hover:scale-[1.02] active:scale-[0.98] transition-all text-gray-700 px-5 py-2 rounded-xl"
                  >
                    Submit Assignment
                  </button>
                )}

              </div>
            ))}

          </div>
        </>
      )}

      {activeSection === "fees" && (
        <>
          <h2 className="text-4xl font-black text-gray-800 mt-12 mb-6">
            Fees Payment
          </h2>

          <div className="md:grid-cols-2 grid-cols-1 gap-6 grid">

            {fees.map((fee) => {

              const isPaid =
                fee.paidStudents.includes(
                  studentName
                );

              return (
                <div
                  key={fee._id}
                  className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all"
                >

                  <h2 className="text-2xl font-bold mb-3">
                    {fee.title}
                  </h2>

                  <p className="text-gray-600 mb-3">
                    Amount: ₹{fee.amount}
                  </p>

                  <p className="text-gray-500 mb-4">
                    Due: {fee.dueDate}
                  </p>

                  {isPaid ? (
                    <button
                      className="bg-green-500 text-gray-700 px-5 py-2 rounded-xl"
                    >
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        payFee(fee._id)
                      }
                      className="bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all text-gray-700 px-5 py-2 rounded-xl"
                    >
                      Pay Now
                    </button>
                  )}

                </div>
              );
            })}

          </div>
        </>
      )}

      {activeSection === "complaints" && (
        <>
          <h2 className="text-4xl font-black text-gray-800 mt-12 mb-6">
            Grievance Section
          </h2>

          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm max-w-[700px]">

            <input
              type="text"
              placeholder="Complaint Subject"
              value={complaintData.subject}
              onChange={(e) =>
                setComplaintData({
                  ...complaintData,
                  subject: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 mb-4 outline-none"
            />

            <textarea
              placeholder="Complaint Message"
              value={complaintData.message}
              onChange={(e) =>
                setComplaintData({
                  ...complaintData,
                  message: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 mb-4 outline-none"
            />

            <button
              onClick={submitComplaint}
              className="bg-red-500 hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98] transition-all text-gray-700 px-6 py-3 rounded-xl"
            >
              Submit Complaint
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default StudentDashboard;