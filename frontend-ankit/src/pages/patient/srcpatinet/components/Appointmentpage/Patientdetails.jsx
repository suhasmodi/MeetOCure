import React, { useState } from 'react';
import { ChevronLeft, MessageCircle, Calendar, Wallet, Bell, User, Phone, UserCircle, Upload, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PatientDetailsPage = ({ appointmentData, updateAppointmentData }) => {
  const [formData, setFormData] = useState({
    patientName: appointmentData?.patientDetails?.patientName || '',
    mobileNumber: appointmentData?.patientDetails?.mobileNumber || '',
    age: appointmentData?.patientDetails?.age || '',
    gender: appointmentData?.patientDetails?.gender || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenderSelect = (gender) => {
    setFormData(prev => ({
      ...prev,
      gender: gender
    }));
  };

  const handleBack = () => {
    updateAppointmentData?.({
      patientDetails: formData
    });
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAppointmentData?.({
      patientDetails: formData
    });
    alert('Appointment details saved! Ready for payment.');
  };

  const isFormValid = formData.patientName && formData.mobileNumber && formData.age && formData.gender;

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm w-full flex items-center justify-between px-4 py-3">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Link to={"/date-time"}><ChevronLeft className="w-6 h-6 text-gray-600" /></Link>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Appointment</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 mr-8">
          <Link to={"/chat"}>
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <MessageCircle className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 "></span>
          </button>
          </Link>
          <Link to={"/user-wallet"}>
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Wallet className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3"></span>
          </button>
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 "></span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Progress Steps - Left Side */}
          <div className="lg:w-1/4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">1</span>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-teal-600">Date & Time</div>
                </div>
              </div>
              <div className="w-full ml-3">
                <div className=" border-r-2 h-10 w-2 border-teal-600"></div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">2</span>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-teal-600">Patient Detail</div>
                </div>
              </div>
              <div className="w-full ml-3">
                <div className=" border-r-2 h-10 w-2"></div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 font-semibold">3</span>
                </div>
                <div className="ml-3">
                  <div className="text-sm text-gray-400">Payment</div>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Details Form - Middle/Right */}
          <div className="lg:w-3/4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Patient Details</h2>
            <form className="bg-white rounded-2xl shadow-sm p-6 md:p-8" onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Patient Name */}
                <div className="flex flex-col">
                  <label className="mb-2 font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-500" />
                    Patient Name
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    placeholder="Enter patient name"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-teal-500 focus:shadow-lg focus:shadow-teal-100 focus:-translate-y-0.5 bg-white"
                  />
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col">
                  <label className="mb-2 font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-teal-500" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-teal-500 focus:shadow-lg focus:shadow-teal-100 focus:-translate-y-0.5 bg-white"
                  />
                </div>

                {/* Age */}
                <div className="flex flex-col">
                  <label className="mb-2 font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-teal-500" />
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter age"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-teal-500 focus:shadow-lg focus:shadow-teal-100 focus:-translate-y-0.5 bg-white"
                  />
                </div>

                {/* /* Gender */}
                        <div className="flex flex-col">
                          <label className="mb-2 font-semibold text-gray-800 text-sm flex items-center gap-2">
                          <UserCircle className="w-4 h-4 text-teal-500" />
                          Gender
                          </label>
                          <div className="flex gap-3 mt-2">
                          <button
                            type="button"
                            onClick={() => handleGenderSelect('Male')}
                            className={`flex-1 p-4 border-2 rounded-lg text-sm font-semibold transition-all duration-300 text-gray-600 hover:bg-gray-50 hover:border-teal-500 hover:-translate-y-0.5 ${
                            formData.gender === 'Male'
                              ? 'bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-200'
                              : 'bg-white text-gray-600 border-gray-200'
                            }`}
                          >
                            Male
                          </button>
                          <button
                            type="button"
                            onClick={() => handleGenderSelect('Female')}
                            className={`flex-1 p-4 border-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-gray-50 hover:border-teal-500 hover:-translate-y-0.5 ${
                            formData.gender === 'Female'
                              ? 'bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-200'
                              : 'bg-white text-gray-600 border-gray-200'
                            }`}
                          >
                            Female
                          </button>
                          <button
                            type="button"
                            onClick={() => handleGenderSelect('Other')}
                            className={`flex-1 p-4 border-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-gray-50 hover:border-teal-500 hover:-translate-y-0.5 ${
                            formData.gender === 'Other'
                              ? 'bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-200'
                              : 'bg-white text-gray-600 border-gray-200'
                            }`}
                          >
                            Other
                          </button>
                          </div>
                        </div>

                        {/* Upload Photo */}
                        <div className="flex flex-col">
                          <label className="mb-2 font-semibold text-gray-800 text-sm flex items-center gap-2">
                          <Upload className="w-4 h-4 text-teal-500" />
                          Upload Photo
                          </label>
                          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center bg-gray-50 transition-all duration-300 hover:border-teal-500 hover:bg-teal-50">
                          <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                            if (e.target.files?.[0]) {
                              alert('File selected: ' + e.target.files[0].name);
                            }
                            }}
                          />
                          <label
                            htmlFor="file-upload"
                            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-7 py-4 rounded-lg text-sm font-semibold mb-3 transition-all duration-300 hover:from-teal-600 hover:to-teal-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-200 flex items-center gap-2 mx-auto cursor-pointer inline-line h-15 w-40"
                          >
                            <Upload className="w-4 h-4" />
                            Choose File
                          </label>
                          <p className="text-gray-600 text-xs font-medium m-0">
                            Upload patient photo (optional)
                          </p>
                          </div>
                        </div>

                        {/* Form Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-8">
                   <Link to={'/date-time'}>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:from-gray-600 hover:to-gray-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-300 flex items-center gap-2 w-full md:w-auto"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  </Link>
                  <Link to={'/payment'}> 
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`px-10 py-4 rounded-lg text-base font-semibold transition-all duration-300 flex items-center gap-2 min-w-48 justify-center w-full md:w-auto ${isFormValid
                      ? 'bg-gradient-to-r from-teal-600 to-teal-600 text-white hover:from-teal-600 hover:to-teal-600 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-300'
                      : 'bg-gray-400 text-white cursor-not-allowed'
                      }`}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsPage;