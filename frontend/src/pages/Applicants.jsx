import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../services/api";

function Applicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/jobs/applicants/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/jobs/application-status/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      fetchApplicants();
    } catch (error) {
      console.log(error);
      alert("Status update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Applicants 👨‍💻
        </h1>

        {applications.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No applicants yet
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {app.student?.name}
                </h2>

                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Email:</span>{" "}
                  {app.student?.email}
                </p>

                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Role:</span>{" "}
                  {app.student?.role}
                </p>

                <p className="text-gray-600 mb-3">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-semibold px-3 py-1 rounded-full text-sm
                    ${
                      app.status === "shortlisted"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </p>

                {/* Resume Button */}
                {app.resumeLink && (
                  <a
                    href={app.resumeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center bg-blue-600 text-white py-2 rounded-xl mb-4 hover:bg-blue-700 transition"
                  >
                    View Resume 📄
                  </a>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => updateStatus(app._id, "shortlisted")}
                    className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(app._id, "rejected")}
                    className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applicants;