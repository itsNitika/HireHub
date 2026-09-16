import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import API from "../services/api";
import Navbar from "../components/Navbar";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/jobs/my-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.delete(`/jobs/delete/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);
      fetchMyJobs();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Recruiter Dashboard 💼
        </h1>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No jobs posted yet
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {job.title}
                </h2>

                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Company:</span> {job.company}
                </p>

                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Location:</span>{" "}
                  {job.location}
                </p>

                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Salary:</span> {job.salary}
                </p>

                <p className="text-gray-500">{job.description}</p>

                <Link
                  to={`/applicants/${job._id}`}
                  className="block text-center mt-5 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  View Applicants
                </Link>

                <button
                  onClick={() => handleDelete(job._id)}
                  className="w-full mt-3 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
                >
                  Delete Job
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruiterDashboard;