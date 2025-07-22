import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useLocation as useRouterLocation } from "react-router-dom";
import PatientTopIcons from "../../components/PatientTopIcons";
import HeroCarousel from "../../components/HeroBanners";
import SidebarNavPatient from "../../components/SidebarNavPatient";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();

  const [city, setCity] = useState("Vijayawada");

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) {
      setCity(storedCity);
    }
  }, [routerLocation]);

  return (
    <div className="flex font-[Poppins] bg-[#F8FAFC] min-h-screen">
      {/* Sidebar */}
      <SidebarNavPatient />

      {/* Main Content */}
      <div className="flex-1 min-h-screen px-6 py-6 md:pb-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <img
                src="/assets/logo.png"
                alt="Meetocure"
                className="w-14 h-14 rounded-full object-cover shadow-md"
              />
              <h1 className="text-3xl font-bold text-[#0A4D68]">Meetocure</h1>
            </div>

            {/* Location */}
            <div
              className="flex items-center gap-2 text-[#0A4D68] cursor-pointer hover:underline text-sm md:text-base pl-1"
              onClick={() => navigate("/location")}
            >
              <FaMapMarkerAlt />
              <span>{city}</span>
            </div>
          </div>

          <PatientTopIcons />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for doctors or specialties..."
            className="w-full max-w-xl px-5 py-3 border rounded-xl shadow-sm bg-white focus:outline-none"
          />
        </div>

        {/* Hero Banner */}
        <div className="mb-10">
          <HeroCarousel height="h-64" />
        </div>

        {/* Categories */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#1F2A37]">Categories</h2>
          <a
            href="/patient/categories"
            className="text-sm text-[#0A4D68] hover:underline font-medium"
          >
            See All
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-16">
          {categories.map((item) => (
            <div
              key={item.label}
              className="bg-[#E0F2FE] hover:bg-[#BDE0F9] w-full h-52 rounded-3xl shadow-md flex flex-col justify-center items-center px-4 py-6 transition duration-300 ease-in-out"
            >
              <img
                src={`/assets/categories/${item.icon}`}
                alt={item.label}
                className="w-12 h-12 mb-3"
              />
              <p className="text-base font-semibold text-gray-700 text-center">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Nearby Doctors */}
        <SectionHeader title="Nearby Doctors" seeAllLink="/patient/doctors" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {doctors.map((doc) => (
            <DoctorCard key={doc.name} {...doc} />
          ))}
        </div>

        {/* Nearby Hospitals */}
        <SectionHeader title="Nearby Hospitals" seeAllLink="/patient/hospitals" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hospitals.map((hosp) => (
            <HospitalCard key={hosp.name} {...hosp} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Section
const SectionHeader = ({ title, seeAllLink }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-semibold text-[#1F2A37]">{title}</h2>
    {seeAllLink && (
      <a
        href={seeAllLink}
        className="text-sm text-[#0A4D68] hover:underline font-medium"
      >
        See All
      </a>
    )}
  </div>
);

// Doctor section
const DoctorCard = ({ name, specialty, location, image }) => (
  <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
    <div className="w-full h-44 overflow-hidden rounded-lg mb-4">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover object-top"
      />
    </div>
    <h3 className="text-lg font-semibold text-[#1F2A37]">{name}</h3>
    <p className="text-sm text-gray-500">{specialty}</p>
    <p className="text-sm text-gray-400">{location}</p>
  </div>
);

// Hospital Section
const HospitalCard = ({ name, location, image }) => (
  <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
    <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover object-top"
      />
    </div>
    <h3 className="text-lg font-semibold text-[#1F2A37]">{name}</h3>
    <p className="text-sm text-gray-500">{location}</p>
  </div>
);

// Preset Data
const categories = [
  { label: "Dentistry", icon: "dentist.png" },
  { label: "Cardiology", icon: "cardiology.png" },
  { label: "Pulmonary", icon: "lungs.png" },
  { label: "General", icon: "general.png" },
  { label: "Neurology", icon: "brain.png" },
  { label: "Gastroen", icon: "stomach.png" },
  { label: "Laboratory", icon: "lab.png" },
  { label: "Vaccination", icon: "vaccine.png" },
];

const doctors = [
  {
    name: "Dr. Srinivas",
    specialty: "Dermatologist",
    location: "Vijayawada",
    image: "/assets/doctor2.png",
  },
  {
    name: "Dr. Siva Prasad",
    specialty: "Gastroenterologist",
    location: "Vijayawada",
    image: "/assets/doctor2.png",
  },
];

const hospitals = [
  {
    name: "Star Hospital",
    location: "Vijayawada",
    image: "/assets/doctor2.png",
  },
  {
    name: "Rainbow Hospital",
    location: "Vijayawada",
    image: "/assets/doctor2.png",
  },
];

export default PatientDashboard;
