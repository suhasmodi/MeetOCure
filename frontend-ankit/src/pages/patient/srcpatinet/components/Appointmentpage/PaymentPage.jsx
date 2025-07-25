import React, { useState } from 'react';
import { ChevronLeft, MessageCircle, Calendar, Wallet, Bell, User, Phone, UserCircle, Upload, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demonstration since external imports aren't available
const mockAppointmentData = {
  selectedDate: '2024-03-15', 
  selectedTime: '2:30 PM',
  patientDetails: {
    patientName: 'John Doe'
  }
};

const Payment = () => {
  const paymentMethods = [
    {
      id: 'phonepe',
      name: 'PhonePe',
      img: 'https://img.icons8.com/color/48/phone-pe.png',
      color: '#5f259f'
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      img: 'https://img.icons8.com/color/48/google-pay.png',
      color: '#2da94f'
    },
    {
      id: 'paytm',
      name: 'Paytm', 
      img: 'https://img.icons8.com/color/48/paytm.png',
      color: '#00b9f1'
    },
    {
      id: 'amazonpay',
      name: 'Amazon Pay',
      img: 'https://img.icons8.com/color/48/amazon.png',
      color: '#ff9900'
    },
    {
      id: 'bharatpe',
      name: 'Net Banking',
      img: 'https://img.icons8.com/ios-filled/50/broker.png',
      color: '#0062ff'
    },
    {
      id: 'mobikwik',
      name: 'Mobikwik',
      img: 'https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/mobikwik-app-icon.png', 
      color: '#26b5e8'
    }
  ].map(method => ({
    ...method,
    icon: <img src={method.img} alt={method.name} className="w-8 h-8" />
  }));


  const [selectedPayment, setSelectedPayment] = useState('');
  const [appointmentData] = useState(mockAppointmentData);

  const handlePaymentSelect = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  const handleBack = () => {
    console.log('Navigate to /patient');
    // navigate('/patient');
  };

  const handlePayment = () => {
    if (selectedPayment) {
      // updateAppointmentData({ paymentMethod: selectedPayment });
      
      alert(
        `Payment initiated via ${
          paymentMethods.find((p) => p.id === selectedPayment)?.name
        }!\nAppointment booked successfully!`
      );

      console.log('Navigate to /date-time');
      // navigate('/date-time');
    } else {
      alert('Please select a payment method');
    }
  };

  const handleNext = () => {
    if (selectedPayment) {
      handlePayment();
    }
  };

  return (
<div className="min-h-screen w-full bg-gray-50 font-sans">
  {/* Header */}
  <div className="bg-white shadow-sm w-full flex items-center justify-between px-4 py-3">
    <div className="px-4 py-4">
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Link to={"/date-time"}>
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Link>
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Appointment</h1>
      </div>
    </div>
    <div className="flex items-center gap-2 mr-8">
      <Link to={"/chat"}>
      <button className="p-2 hover:bg-gray-100 rounded-full relative">
        <MessageCircle className="w-6 h-6 text-gray-600" />
        <span className="absolute -top-1 -right-1 w-3 h-3"></span>
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
            <div className="border-r-2 h-10 w-2 border-teal-600"></div>
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
            <div className="border-r-2 h-10 w-2 border-teal-600"></div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">3</span>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-teal-600">Payment</div>
            </div>
          </div>
        </div>

        {/* Summary Box */}
        {(appointmentData.selectedDate || appointmentData.patientDetails?.patientName) && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mt-6">
            <h3 className="text-gray-800 text-lg font-semibold mb-3">Appointment Summary</h3>
            <div className="flex flex-col gap-4 text-sm">
              {appointmentData.selectedDate && appointmentData.selectedTime && (
                <div className="flex items-start gap-3">
                  <Calendar className="text-blue-500 w-5 h-5 mt-0.5" />
                  <span className="text-gray-800">
                    {new Date(appointmentData.selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    at {appointmentData.selectedTime}
                  </span>
                </div>
              )}
              {appointmentData.patientDetails?.patientName && (
                <div className="flex items-center gap-3">
                  <User className="text-blue-500 w-5 h-5" />
                  <span className="text-gray-800">
                    Patient: {appointmentData.patientDetails.patientName}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3 font-semibold text-green-600">
                <Upload className="text-blue-500 w-5 h-5" />
                <span>Amount: ₹500</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Section - Right Side */}
      <div className="lg:w-3/4 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Payment Method</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`bg-white border-2 rounded-xl p-6 flex justify-between items-center cursor-pointer transition-all duration-300 hover:shadow-md hover:border-blue-500 ${
                selectedPayment === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => handlePaymentSelect(method.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center" style={{ color: method.color }}>
                  {method.icon}
                </div>
                <span className="text-lg font-semibold text-gray-800">{method.name}</span>
              </div>
              <div
                className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
                  selectedPayment === method.id ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    selectedPayment === method.id ? 'bg-white' : 'bg-transparent'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="mt-59 flex justify-end">
          <button
            className={`px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 ${
              selectedPayment ? 'bg-teal-600 hover:bg-teal-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleNext}
            disabled={!selectedPayment}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Payment;


