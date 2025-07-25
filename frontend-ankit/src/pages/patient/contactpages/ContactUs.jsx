import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Phone, Clock, ChevronLeft } from "lucide-react";
import PatientTopIcons from "../../../components/PatientTopIcons";

export default function ContactUs() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-sm w-full flex items-center justify-between px-4 py-3">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Contact Us</h1>
          </div>
        </div>
        <div className="mr-6">
          <PatientTopIcons />
        </div>
      </div>

      <div className="bg-gray-50 w-full min-h-155 flex flex-col items-center px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 mt-10">
          {/* Agent Card */}
          <div className="flex justify-center items-center p-4 md:p-5 w-full md:w-1/3">
            <div className="bg-[#0A4D68] text-white rounded-2xl shadow-xl p-8 max-w-md w-full flex-col justify-between h-65 border border-[#0A4D68]/30">
              <div>
                <div className="flex items-center gap-6 mb-6">
                  <img
                    src="https://randomuser.me/api/portraits/women/32.jpg"
                    alt="Neelima"
                    className="w-16 h-16 rounded-full border-2 border-white/30 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="font-semibold text-white text-2xl">Neelima</h2>
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                      </div>
                    </div>
                    <p className="text-white/80 text-base mt-1">Appointment Booking Agent</p>
                  </div>
                </div>
                
                  <button
                    onClick={() => alert("Booking request sent to Neelima")}
                    className="w-full bg-white/20 text-white font-medium py-3 rounded-lg mb-6 hover:bg-white/30 transition"
                  >
                    For Booking
                  </button>
                
              </div>

              <div className="flex items-center gap-3 text-white/80 text-base font-medium">
                <Clock className="w-5 h-5" />
                <span>6:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center items-center mb-32 p-4 md:p-8 w-full md:w-1/3 mx-auto">
            <div className="relative w-full max-w-md h-auto flex flex-row justify-center items-center">
              {/* Laptop */}
              <div className="absolute left-8 top-2 w-40 h-22 rounded-lg border-2 border-gray-300 shadow-lg">
                <div className="flex gap-1 p-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <div className="px-3 pb-2 flex justify-between items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full mb-1"></div>
                    <div className="w-10 h-6 bg-white rounded border border-gray-200 flex items-center justify-center">
                      <div className="w-6 h-4 bg-blue-600 rounded"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-blue-100 rounded-full mb-1"></div>
                    <div className="w-8 h-5 bg-blue-700 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Bottle */}
              <div className="absolute right-20 top-4 w-8 h-14 bg-white rounded-t-full border-2 border-gray-300 shadow">
                <div className="w-6 h-3 bg-gray-200 rounded-full mx-auto border border-gray-300"></div>
                <div className="w-6 h-8 bg-white border border-gray-200 mx-auto mt-1 rounded">
                  <div className="w-4 h-1 bg-gray-300 mx-auto mt-1"></div>
                  <div className="w-3 h-1 bg-gray-300 mx-auto mt-1"></div>
                </div>
              </div>

              {/* Pills */}
              {[16, 20, 24, 28].map((top, i) => (
                <div key={i} className={`absolute right-${4 + i * 4} top-${top}`}>
                  <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-300 shadow"></div>
                </div>
              ))}

              {/* Shield */}
              <div className="absolute right-2 top-8 w-20 h-26">
                <div className="w-full h-24 border-2 border-gray-300 bg-white rounded-t-full rounded-b-3xl flex items-center justify-center shadow">
                  <div className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center bg-white">
                    <div className="relative">
                      <div className="w-5 h-1 bg-gray-500"></div>
                      <div className="w-1 h-5 bg-gray-500 absolute top-0 left-2 -mt-2"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient */}
              <div className="absolute top-40 left-1/2 transform -translate-x-1/2">
                <div className="w-32 h-14 bg-gray-400 rounded-full relative">
                  <div className="absolute left-4 -top-3 w-14 h-10 bg-gray-400 rounded-full transform rotate-12"></div>
                  <div className="absolute right-4 -top-3 w-14 h-10 bg-gray-400 rounded-full transform -rotate-12"></div>
                </div>
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-18 h-24 bg-blue-700 rounded-t-3xl overflow-hidden">
                  <div className="absolute inset-1">
                    {[...Array(48)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-blue-200 rounded-full"
                        style={{
                          left: `${(i % 8) * 10 + 8}%`,
                          top: `${Math.floor(i / 8) * 12 + 8}%`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-pink-200 rounded-full">
                  <div className="absolute -top-1 left-1 w-10 h-7 bg-blue-900 rounded-t-full"></div>
                </div>
                <div className="absolute -top-16 left-1 w-10 h-5 bg-pink-200 rounded-full transform -rotate-45"></div>
                <div className="absolute -top-16 right-1 w-10 h-5 bg-pink-200 rounded-full transform rotate-45">
                  <div className="absolute -right-2 -top-1 w-3 h-5 bg-gray-800 rounded border border-gray-600">
                    <div className="w-2 h-3 bg-blue-400 rounded mx-auto mt-0.5"></div>
                  </div>
                </div>
                <div className="absolute -bottom-3 left-8 w-8 h-5 bg-blue-900 rounded-full"></div>
                <div className="absolute -bottom-3 right-8 w-8 h-5 bg-blue-900 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Call Now Button */}
        <div className="fixed bottom-6 left-0 right-0 px-6 max-w-lg mx-auto">
      
            <button className="w-full bg-[#0A4D68] hover:bg-[#083952] text-white py-4 rounded-full flex items-center justify-center gap-3 text-lg font-semibold transition-colors shadow-lg">
              Call Now
              <Phone className="w-5 h-5" />
            </button>
      
        </div>
      </div>
    </>
  );
}
