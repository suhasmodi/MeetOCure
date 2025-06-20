import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "Nutan Sai Nandam",
    email: "nutan@example.com",
    phone: "8639068288",
    specialization: "Cardiologist",
    experience: "5 Years",
    location: "Hyderabad",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", form);
    navigate("/doctor/profile");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-[Poppins] px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <FaArrowLeft
          onClick={() => navigate("/doctor/profile")}
          className="text-[#0A4D68] text-xl cursor-pointer"
        />
        <h1 className="text-2xl font-semibold text-[#1F2A37]">Edit Profile</h1>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Group */}
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phone", type: "tel" },
            { label: "Specialization", name: "specialization", type: "text" },
            { label: "Experience", name: "experience", type: "text" },
            { label: "Location", name: "location", type: "text" },
          ].map((input, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-[#1F2A37] mb-1">
                {input.label}
              </label>
              <input
                type={input.type}
                name={input.name}
                value={form[input.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A4D68]"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-[#0A4D68] text-white py-3 rounded-full font-semibold hover:bg-[#08374f] transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
