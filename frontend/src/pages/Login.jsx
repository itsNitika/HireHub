import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("role", res.data.user.role);

      alert(res.data.message);

      if (res.data.user.role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else {
        navigate("/jobs");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-2xl backdrop-blur-xl md:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl">
              🚀
            </div>
            <h1 className="text-4xl font-black leading-tight">
              Welcome to HireHub
            </h1>
            <p className="mt-4 max-w-md text-white/85">
              Apply for jobs, manage applicants, and build your placement journey
              in one clean portal.
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-5">
            <p className="text-sm text-white/80">Trusted by students & recruiters</p>
            <div className="mt-3 flex gap-3 text-sm">
              <span className="rounded-full bg-white/15 px-3 py-1">Fast</span>
              <span className="rounded-full bg-white/15 px-3 py-1">Secure</span>
              <span className="rounded-full bg-white/15 px-3 py-1">Modern</span>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white text-2xl shadow-lg">
              🔐
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="mt-2 text-sm text-slate-500">
              Login to continue with HireHub
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl active:scale-95">
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;