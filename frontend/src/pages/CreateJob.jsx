import { useState } from "react";

import Navbar from "../components/Navbar";
import API from "../services/api";

function CreateJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
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
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/jobs/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
      });
    } catch (error) {
      console.log(error);

      alert("Job Creation Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
      
      <Navbar />

      <div className="flex justify-center items-center p-8">
        
        <div className="bg-white w-full max-w-2xl p-8 rounded-3xl shadow-2xl">
          
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
            Create Job 💼
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Job Description"
              rows="5"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Create Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateJob;