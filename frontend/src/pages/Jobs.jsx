import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [resumeLink, setResumeLink] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/jobs/my-applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const appliedIds = res.data.map((app) => app.job?._id);
      setAppliedJobIds(appliedIds);
    } catch (error) {
      console.log(error);
    }
  };

  const openApplyBox = (jobId) => {
    setSelectedJobId(jobId);
    setResumeLink("");
  };

  const closeApplyBox = () => {
    setSelectedJobId(null);
    setResumeLink("");
  };

  const applyJob = async () => {
    try {
      if (!resumeLink.trim()) {
        alert("Please paste your resume link");
        return;
      }

      const token = localStorage.getItem("token");

      const res = await API.post(
        `/jobs/apply/${selectedJobId}`,
        { resumeLink },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      fetchAppliedJobs();
      closeApplyBox();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Application Failed");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 rounded-[2rem] bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl">
          <h1 className="text-4xl font-black">Available Jobs</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Explore opportunities, paste your resume link, and apply in one click.
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-3xl border border-white/50 bg-white/80 p-10 text-center shadow-lg">
            <p className="text-lg font-medium text-slate-600">
              No jobs available yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => {
              const isApplied = appliedJobIds.includes(job._id);

              return (
                <div
                  key={job._id}
                  className="group rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {job.title}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-blue-600">
                        {job.company}
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      Hiring
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-800">
                        Location:
                      </span>{" "}
                      {job.location}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">
                        Salary:
                      </span>{" "}
                      {job.salary}
                    </p>
                  </div>

                  <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-500">
                    {job.description}
                  </p>

                  <div className="mt-6">
                    {role === "student" ? (
                      isApplied ? (
                        <button
                          disabled
                          className="w-full rounded-2xl bg-green-100 py-3 font-semibold text-green-700 cursor-not-allowed"
                        >
                          Applied
                        </button>
                      ) : (
                        <button
                          onClick={() => openApplyBox(job._id)}
                          className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl active:scale-95"
                        >
                          Apply Now
                        </button>
                      )
                    ) : (
                      <div className="w-full rounded-2xl bg-slate-100 py-3 text-center font-semibold text-slate-500">
                        Recruiters cannot apply
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedJobId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Paste Resume Link
            </h2>

            <input
              type="text"
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              placeholder="Paste Google Drive / portfolio / resume link"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />

            <p className="mt-3 text-sm text-slate-500">
              Paste your resume link here before applying.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={applyJob}
                className="flex-1 rounded-2xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Submit
              </button>

              <button
                onClick={closeApplyBox}
                className="flex-1 rounded-2xl bg-slate-200 py-3 font-semibold text-slate-700 hover:bg-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;