import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 border-b border-white/40 bg-white/75 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/jobs" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
            🚀
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              HireHub
            </h1>
            <p className="text-xs text-slate-500">Placement Portal</p>
          </div>
        </Link>

        <div className="flex items-center gap-3 md:gap-5">
          <Link
            to="/jobs"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
          >
            Jobs
          </Link>

          {role === "student" && (
            <Link
              to="/my-applications"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
            >
              My Applications
            </Link>
          )}

          {role === "recruiter" && (
            <>
              <Link
                to="/recruiter-dashboard"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
              >
                Dashboard
              </Link>

              <Link
                to="/create-job"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
              >
                Create Job
              </Link>
            </>
          )}

          <div className="hidden rounded-2xl bg-slate-100 px-4 py-2 md:block">
            <p className="text-xs text-slate-500">{role || "user"}</p>
            <p className="max-w-[180px] truncate text-sm font-semibold text-slate-800">
              {userEmail}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;