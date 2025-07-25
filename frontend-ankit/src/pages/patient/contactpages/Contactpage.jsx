import React from "react";
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Phone,
  Clock,
  MessageCircle,
  Video,
  Bell,
  Wallet,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BiWallet } from "react-icons/bi";

export default function ContactUs() {
  return (
    <>
      {/* Header */}
      <div className="bg-white  shadow-sm w-full flex items-center justify-between px-4 py-3">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to={"/chat"}>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-800">Contact Us</h1>
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
            <span className="absolute -top-1 -right-1 w-3 h-3 "></span>
          </button>
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 "></span>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm w-full min-h-155 flex flex-col items-center px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 mt-12">
          {/* Agent Card - pinned right on desktop */}
          <div className="flex justify-center items-center p-4 md:p-5 w-full md:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-200 flex-col justify-between h-65">
              <div>
                <div className="flex items-center gap-8 mb-5">
                  <img
                    src="https://randomuser.me/api/portraits/women/32.jpg"
                    alt="Neelima"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="font-semibold text-gray-900 text-2xl">Neelima</h2>
                      <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-teal-700 text-lg mt-1">Appointment Booking Agent</p>
                  </div>
                </div>
                <Link to={"/payment"}>
                <button
                  onClick={() => alert("Booking request sent to Neelima")}
                  className="w-full bg-teal-700 text-white font-semibold py-4 rounded-lg mb-8 transition hover:bg-teal-800 shadow-lg"
                >
                  For Booking
                </button>
                </Link>
              </div>

              <div className="flex items-center gap-4 text-gray-700 text-lg font-semibold">
                <Clock className="w-6 h-6" />
                <span>6:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>
          {/* Illustration - pinned left on desktop */}
          <div className="flex justify-center items-center mb-40 p-4 md:p-8 w-full md:w-1/3 mx-auto">
            <div className="relative w-full max-w-md h-auto flex flex-row justify-center items-center">
              {/* Computer/Laptop Screen showing doctor consulting patient */}
              <div className="absolute left-8 top-2 w-40 h-22  rounded-lg border-2 border-gray-300 shadow-lg">
                {/* Browser dots */}
                <div className="flex gap-1 p-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>

                {/* Doctor on screen talking to patient */}
                <div className="px-3 pb-2 flex justify-between  items-center">
                  {/* Doctor (left side of screen) */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-pink-200 rounded-full mb-1"></div>
                    <div className="w-10 h-6 bg-white rounded border border-gray-200 flex items-center justify-center">
                      <div className="w-6 h-4 bg-teal-700 rounded"></div>
                    </div>
                  </div>

                  {/* Patient (right side of screen) */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-pink-200 rounded-full mb-1"></div>
                    <div className="w-8 h-5 bg-teal-800 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Medicine Bottle */}
              <div className="absolute right-20 top-4 w-8 h-14 bg-white rounded-t-full border-2 border-gray-300 shadow">
                {/* Cap */}
                <div className="w-6 h-3 bg-gray-200 rounded-full mx-auto border border-gray-300"></div>
                {/* Label */}
                <div className="w-6 h-8 bg-white border border-gray-200 mx-auto mt-1 rounded">
                  <div className="w-4 h-1 bg-gray-300 mx-auto mt-1"></div>
                  <div className="w-3 h-1 bg-gray-300 mx-auto mt-1"></div>
                </div>
              </div>

              {/* Pills/Tablets scattered */}
              <div className="absolute right-12 top-16">
                <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-300 shadow"></div>
              </div>
              <div className="absolute right-8 top-20">
                <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-300 shadow"></div>
              </div>
              <div className="absolute right-16 top-24">
                <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-300 shadow"></div>
              </div>
              <div className="absolute right-4 top-28">
                <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-300 shadow"></div>
              </div>

              {/* Medical Shield */}
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

              {/* Main Person - Patient sitting with mobile phone */}
              <div className="absolute top-40 left-1/2 transform -translate-x-1/2">
                {/* Legs crossed */}
                <div className="w-32 h-14 bg-gray-400 rounded-full relative">
                  <div className="absolute left-4 -top-3 w-14 h-10 bg-gray-400 rounded-full transform rotate-12"></div>
                  <div className="absolute right-4 -top-3 w-14 h-10 bg-gray-400 rounded-full transform -rotate-12"></div>
                </div>

                {/* Body with dotted pattern */}
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-18 h-24 bg-teal-800 rounded-t-3xl overflow-hidden">
                  {/* Small pattern dots */}
                  <div className="absolute inset-1">
                    {[...Array(48)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-teal-200 rounded-full"
                        style={{
                          left: `${(i % 8) * 10 + 8}%`,
                          top: `${Math.floor(i / 8) * 12 + 8}%`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Head */}
                <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-pink-200 rounded-full">
                  {/* Hair */}
                  <div className="absolute -top-1 left-1 w-10 h-7 bg-teal-900 rounded-t-full"></div>
                </div>

                {/* Left arm */}
                <div className="absolute -top-16 left-1 w-10 h-5 bg-pink-200 rounded-full transform -rotate-45"></div>

                {/* Right arm holding phone */}
                <div className="absolute -top-16 right-1 w-10 h-5 bg-pink-200 rounded-full transform rotate-45">
                  {/* Mobile phone */}
                  <div className="absolute -right-2 -top-1 w-3 h-5 bg-gray-800 rounded border border-gray-600">
                    <div className="w-2 h-3 bg-blue-400 rounded mx-auto mt-0.5"></div>
                  </div>
                </div>

                {/* Feet */}
                <div className="absolute -bottom-3 left-8 w-8 h-5 bg-teal-900 rounded-full"></div>
                <div className="absolute -bottom-3 right-8 w-8 h-5 bg-teal-900 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bg-repeat-round bottom-6 left-0 right-0 px-6 max-w-lg mx-auto">
          <Link to={"/Cards-data"}>
          <button
            // onClick={() => alert("Calling Neelima...")}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-full flex items-center justify-center gap-3 text-lg font-semibold transition-colors shadow-lg"
          >
            Call Now
            <Phone className="w-5 h-5" />
          </button>
          </Link>
        </div>
      </div>
    </>
  );
}

