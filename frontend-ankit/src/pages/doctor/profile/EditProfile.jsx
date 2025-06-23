import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBell,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaVenusMars,
  FaPencilAlt,
  FaCommentDots,
} from "react-icons/fa";
import profileImg from "/assets/doc_profile.png";

const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "Nutan Sai Nandam",
    phone: "8639068288",
    dob: "2003-06-13",
    gender: "Male",
    photo: profileImg,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenderSelect = (gender) => {
    setForm((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile:", form);
    navigate("/doctor/profile");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFC] font-[Poppins] px-6 pt-6 pb-28">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FaArrowLeft
            className="text-2xl text-[#1F2A37] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-[22px] font-semibold text-[#1F2A37]">
            Edit Profile
          </h1>
        </div>
        <div className="flex items-center gap-4 text-[#0A4D68] text-xl">
          <FaCommentDots className="cursor-pointer" />
          <div className="relative">
            <FaBell className="cursor-pointer" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-8 relative">
        <div className="rounded-full p-1 bg-white shadow-xl">
          <img
            src={form.photo}
            alt="User"
            className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-inner"
          />
        </div>
        <label className="absolute bottom-3 right-[calc(50%-36px)] bg-[#0A4D68] p-2 rounded-full cursor-pointer shadow-md">
          <FaPencilAlt className="text-white text-sm" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      <h2 className="text-center text-xl font-bold text-[#0A4D68] mb-10">
        Edit
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        {/* Input Group */}
        {[
          {
            label: "Full Name",
            name: "name",
            icon: <FaUser className="text-[#0A4D68]" />,
            type: "text",
            placeholder: "Enter full name",
          },
          {
            label: "Mobile Number",
            name: "phone",
            icon: <FaPhone className="text-[#0A4D68]" />,
            type: "tel",
            placeholder: "Enter phone number",
          },
          {
            label: "Date of Birth",
            name: "dob",
            icon: <FaCalendarAlt className="text-[#0A4D68]" />,
            type: "date",
          },
        ].map(({ label, name, icon, type, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <div className="flex items-center gap-3 border border-[#0A4D68] rounded-lg px-4 py-2 bg-white shadow-sm">
              {icon}
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none placeholder-gray-400 text-sm"
                placeholder={placeholder}
              />
            </div>
          </div>
        ))}

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Gender
          </label>
          <div className="flex flex-wrap gap-4">
            {["Male", "Female", "Other"].map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => handleGenderSelect(g)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition border shadow-sm ${
                  form.gender === g
                    ? "bg-[#0A4D68] text-white"
                    : "bg-white text-[#1F2A37] border-gray-300"
                }`}
              >
                <FaVenusMars />
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-4 bg-[#0A4D68] text-white py-3 rounded-full font-semibold text-lg shadow-md hover:bg-[#083e54] transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
