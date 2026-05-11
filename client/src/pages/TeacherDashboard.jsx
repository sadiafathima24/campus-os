import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";

function TeacherDashboard() {

  const teacher = localStorage.getItem("name");

  const [activeSection, setActiveSection] =
    useState("courses");

  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] =
    useState([]);

  const [courseData, setCourseData] =
    useState({
      title: "",
      description: "",
    });

  const [assignmentData, setAssignmentData] =
    useState({
      course: "",
      title: "",
      description: "",
    });

  const [materialData, setMaterialData] =
    useState({
      course: "",
      title: "",
      file: null,
    });

  const fetchCourses = async () => {

    const res = await API.get("/courses");

    const teacherCourses = res.data.filter(
      (course) => course.teacher === teacher
    );

    setCourses(teacherCourses);
  };

  const fetchAssignments = async () => {

    const res = await API.get("/assignments");

    setAssignments(res.data);
  };

  useEffect(() => {
    fetchCourses();
    fetchAssignments();
  }, []);

  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/";
  };

  const handleCourseChange = (e) => {

    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssignmentChange = (e) => {

    setAssignmentData({
      ...assignmentData,
      [e.target.name]: e.target.value,
    });
  };

  const createCourse = async () => {

    if (
      !courseData.title ||
      !courseData.description
    ) {
      return toast.error("Fill all fields");
    }

    await API.post("/courses/create", {
      ...courseData,
      teacher,
    });

    toast.success("Course Created");

    setCourseData({
      title: "",
      description: "",
    });

    fetchCourses();
  };

  const createAssignment = async () => {

    if (
      !assignmentData.course ||
      !assignmentData.title ||
      !assignmentData.description
    ) {
      return toast.error("Fill all fields");
    }

    await API.post(
      "/assignments/create",
      assignmentData
    );

    toast.success("Assignment Created");

    setAssignmentData({
      course: "",
      title: "",
      description: "",
    });

    fetchAssignments();
  };

  const uploadMaterial = async () => {

    if (
      !materialData.course ||
      !materialData.title ||
      !materialData.file
    ) {
      return toast.error("Fill all fields");
    }

    const formData = new FormData();

    formData.append(
      "course",
      materialData.course
    );

    formData.append(
      "title",
      materialData.title
    );

    formData.append(
      "file",
      materialData.file
    );

    await API.post(
      "/materials/upload",
      formData
    );

    toast.success("Material Uploaded");

    setMaterialData({
      course: "",
      title: "",
      file: null,
    });
  };

  const gradeAssignment = async (
  assignmentId,
  submissionId
) => {

  const grade =
    prompt("Enter grade");

  if (!grade) return;

  try {

    await API.post(
      `/assignments/grade/${assignmentId}`,
      {
        submissionId,
        grade,
      }
    );

    toast.success(
      "Assignment graded"
    );

    fetchAssignments();

  } catch (error) {

    console.log(error);

    toast.error(
      "Grade failed"
    );
  }
};
  const deleteCourse = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this course?"
    );

    if (!confirmDelete) return;

    await API.delete(`/courses/${id}`);

    toast.success("Course Deleted");

    fetchCourses();
    fetchAssignments();
  };

  const deleteAssignment = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this assignment?"
    );

    if (!confirmDelete) return;

    await API.delete(`/assignments/${id}`);

    toast.success("Assignment Deleted");

    fetchAssignments();
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-gray-800 ml-[290px] p-10">

      <Sidebar
        role="teacher"
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex items-center justify-between mb-10">

        <div>
          <h1 className="text-5xl font-bold text-indigo-600">
            Teacher Dashboard
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Manage courses, assignments, materials, and student evaluations efficiently
          </p>
        </div>

        <div className="flex items-center gap-5">

          <div className="bg-white border border-gray-200 px-6 py-3 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300">

            <p className="text-sm text-gray-500">
              Teacher
            </p>

            <h2 className="text-xl font-bold">
              {teacher}
            </h2>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-gray-700 transition-all px-5 py-3 rounded-2xl flex items-center gap-2 shadow-sm"
          >
            <FiLogOut />
            Logout
          </button>

        </div>

      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mb-12">

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100">

          <p className="text-gray-500 mb-3">
            Total Courses
          </p>

          <h1 className="text-5xl font-black text-indigo-600">
            {courses.length}
          </h1>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100">

          <p className="text-gray-500 mb-3">
            Assignments
          </p>

          <h1 className="text-5xl font-black text-green-500">
            {assignments.length}
          </h1>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100">

          <p className="text-gray-500 mb-3">
            Total Students
          </p>

          <h1 className="text-5xl font-black text-violet-500">
            {
              courses.reduce(
                (total, course) =>
                  total +
                  course.students.length,
                0
              )
            }
          </h1>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100">

          <p className="text-gray-500 mb-3">
            Pending Grading
          </p>

          <h1 className="text-5xl font-black text-red-500">
            {
              assignments.reduce(
                (total, assignment) =>
                  total +
                  assignment.submissions.filter(
                    (submission) =>
                      submission.grade === null
                  ).length,
                0
              )
            }
          </h1>

        </div>

      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-10">

        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300">

          <h2 className="text-2xl font-bold mb-4">
            Create Course
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={courseData.title}
            onChange={handleCourseChange}
            className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-4 outline-none"
          />

          <textarea
            name="description"
            placeholder="Course Description"
            value={courseData.description}
            onChange={handleCourseChange}
            className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-4 outline-none"
          />

          <button
            onClick={createCourse}
            className="bg-sky-600 hover:bg-sky-700 text-gray-700 px-6 py-3 rounded-2xl"
          >
            Create Course
          </button>

        </div>

        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300">

          <h2 className="text-2xl font-bold mb-4">
            Create Assignment
          </h2>

          <select
            name="course"
            value={assignmentData.course}
            onChange={handleAssignmentChange}
            className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-4 outline-none"
          >

            <option value="">
              Select Course
            </option>

            {courses.map((course) => (
              <option
                key={course._id}
                value={course.title}
              >
                {course.title}
              </option>
            ))}

          </select>

          <input
            type="text"
            name="title"
            placeholder="Assignment Title"
            value={assignmentData.title}
            onChange={handleAssignmentChange}
            className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-4 outline-none"
          />

          <textarea
            name="description"
            placeholder="Assignment Description"
            value={assignmentData.description}
            onChange={handleAssignmentChange}
            className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-4 outline-none"
          />

          <button
            onClick={createAssignment}
            className="bg-sky-600 hover:bg-sky-700 text-gray-700 px-6 py-3 rounded-2xl"
          >
            Create Assignment
          </button>

        </div>

      </div>

      <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 mb-10">

        <h2 className="text-2xl font-bold mb-4">
          Upload Study Material
        </h2>

        <select
          value={materialData.course}
          onChange={(e) =>
            setMaterialData({
              ...materialData,
              course: e.target.value,
            })
          }
          className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-4 outline-none"
        >

          <option value="">
            Select Course
          </option>

          {courses.map((course) => (
            <option
              key={course._id}
              value={course.title}
            >
              {course.title}
            </option>
          ))}

        </select>

        <input
          type="text"
          placeholder="Material Title"
          value={materialData.title}
          onChange={(e) =>
            setMaterialData({
              ...materialData,
              title: e.target.value,
            })
          }
          className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-4 outline-none"
        />

        <input
          type="file"
          onChange={(e) =>
            setMaterialData({
              ...materialData,
              file: e.target.files[0],
            })
          }
          className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-4 outline-none"
        />

        <button
          onClick={uploadMaterial}
          className="bg-sky-600 hover:bg-sky-700 text-gray-700 px-6 py-3 rounded-2xl"
        >
          Upload Material
        </button>

      </div>

      {activeSection === "courses" && (
        <>
          <h2 className="text-4xl font-black text-gray-800 mb-6">
            My Courses
          </h2>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mb-10">

            {courses.map((course) => (

              <div
                key={course._id}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300"
              >

                <h2 className="text-2xl font-bold mb-3">
                  {course.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {course.description}
                </p>

                <p className="text-indigo-600 mb-5">
                  Students Joined: {course.students.length}
                </p>

                <button
                  onClick={() =>
                    deleteCourse(course._id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-gray-700 px-5 py-2 rounded-2xl"
                >
                  Delete Course
                </button>

              </div>
            ))}

          </div>
        </>
      )}

      {activeSection === "assignments" && (
        <>
          <h2 className="text-4xl font-black text-gray-800 mb-6">
            Assignment Submissions
          </h2>

          <div className="space-y-6">

            {assignments
              .filter((assignment) =>
                courses.some(
                  (course) =>
                    course.title === assignment.course
                )
              )
              .map((assignment) => (

                <div
                  key={assignment._id}
                  className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300"
                >

                  <h2 className="text-2xl font-bold mb-2">
                    {assignment.title}
                  </h2>

                  <p className="text-indigo-600 mb-4">
                    {assignment.course}
                  </p>

                  <button
                    onClick={() =>
                      deleteAssignment(
                        assignment._id
                      )
                    }
                    className="mb-5 bg-red-500 hover:bg-red-600 text-gray-700 px-5 py-2 rounded-2xl"
                  >
                    Delete Assignment
                  </button>

                  {assignment.submissions.length === 0 ? (
                    <p className="text-gray-500">
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">

  <h2 className="text-2xl font-bold text-gray-700 mb-2">
    No Submissions Yet
  </h2>

  <p className="text-gray-500">
    Student submissions will appear here once assignments are submitted.
  </p>

</div>
                    </p>
                  ) : (
                    assignment.submissions.map(
                      (submission, index) => (

                        <div
                          key={index}
                          className="bg-gray-50 border border-gray-200 p-5 rounded-2xl mb-4"
                        >

                          <p className="mb-2">
                            <strong>Student:</strong>{" "}
                            {submission.student}
                          </p>

                          <a
  href={`https://campus-os-7fh1.onrender.com/uploads/${submission.file}`}
  target="_blank"
  rel="noreferrer"
  className="bg-sky-100 hover:bg-sky-200 text-sky-700 px-4 py-2 rounded-xl inline-block"
>
  Download Submission
</a>

                          <p className="mb-4">
                            <strong>Grade:</strong>{" "}
                            {submission.grade === null
                              ? "Pending"
                              : `${submission.grade}/100`}
                          </p>

                          {submission.grade !== null ? (
                            <button
                              className="bg-blue-500 text-gray-700 px-5 py-2 rounded-2xl"
                            >
                              Graded
                            </button>
                          ) : (
                           <button
  onClick={() =>
    gradeAssignment(
      assignment._id,
      submission._id
    )
  }
  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
>
  Grade
</button>
                          )}

                        </div>
                      )
                    )
                  )}

                </div>
              ))}

          </div>
        </>
      )}

    </div>
  );
}

export default TeacherDashboard;