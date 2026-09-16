import { useEffect, useState } from "react";

import API from "../services/api";
import Navbar from "../components/Navbar";
function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/jobs/my-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
    
    <Navbar />

    <div className="p-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        My Applications 📄
      </h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No applications found
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {app.job?.title}
              </h2>

              <p className="text-gray-600 mb-2">
                <span className="font-semibold">
                  Company:
                </span>{" "}
                {app.job?.company}
              </p>

              <p className="text-gray-600 mb-2">
                <span className="font-semibold">
                  Location:
                </span>{" "}
                {app.job?.location}
              </p>

              <p className="text-gray-600 mb-4">
                <span className="font-semibold">
                  Status:
                </span>{" "}
                <span className="text-green-600 font-semibold">
                  {app.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}

export default MyApplications;