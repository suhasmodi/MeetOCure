import React from "react";

const PatientModal = ({ isOpen, onClose, patient }) => {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-fade-in">
        <h2 className="text-xl font-bold text-[#0A4D68] mb-4">
          Patient Details
        </h2>

        <div className="mb-3">
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-semibold text-lg">{patient.name}</p>
        </div>

        <div className="mb-3 flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Age</p>
            <p className="font-medium">{patient.age}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium">{patient.gender}</p>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm text-gray-500">Date & Time</p>
          <p className="font-medium">
            {patient.date} at {patient.time}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Concern</p>
          <p className="font-medium">{patient.concern || "N/A"}</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 text-sm px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
          <button className="bg-[#0A4D68] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#083e54]">
            Prescribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
