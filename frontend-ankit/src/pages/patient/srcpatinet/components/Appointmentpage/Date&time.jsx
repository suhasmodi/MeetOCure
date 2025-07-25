import React, { useState } from 'react';
import { ChevronLeft, MessageCircle, Calendar, Wallet, Bell, ChevronRight } from 'lucide-react';
import PatientDetails from './patientdetails.jsx';
import { Link } from 'react-router-dom';
// Mock appointment data for demonstration
const mockAppointmentData = {
  selectedDate: '',
  selectedTime: ''
};

const DateTime = ({ appointmentData = mockAppointmentData, updateAppointmentData }) => {
  const [selectedDate, setSelectedDate] = useState(appointmentData?.selectedDate || '');
  const [selectedTime, setSelectedTime] = useState(appointmentData?.selectedTime || '');
  const [currentMonth, setCurrentMonth] = useState(6); // June 2025 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentPage, setCurrentPage] = useState('datetime'); // New state for page navigation
  const [finalAppointmentData, setFinalAppointmentData] = useState(appointmentData);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const timeSlots = [
    '9.00 AM', '9.30 AM', '10.00 AM',
    '10.30 AM', '11.00 AM', '11.30 AM',
    '3.00 PM', '3.30 PM', '4.00 PM',
    '4.30 PM', '5.00 PM', '5.30 PM',
    '6.00 PM', '6.30 PM', '7.00 PM'
  ];

  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];
    
    // Previous month's trailing days
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        isPast: true
      });
    }

    // Current month days
    const today = new Date();
    const currentDate = today.getDate();
    const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

    for (let day = 1; day <= daysInMonth; day++) {
      const isPast = isCurrentMonth && day < currentDate;
      const isToday = isCurrentMonth && day === currentDate;
      
      days.push({
        day,
        isCurrentMonth: true,
        isPast,
        isToday,
        dateString: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isPast: false
      });
    }

    return days;
  };

  const handleDateSelect = (day) => {
    if (!day.isCurrentMonth || day.isPast) return;
    setSelectedDate(day.dateString);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      const updatedData = {
        ...finalAppointmentData,
        selectedDate,
        selectedTime
      };
      
      setFinalAppointmentData(updatedData);
      updateAppointmentData?.(updatedData);
      
      // Navigate to patient details page
      setCurrentPage(<PatientDetails />);
    }
  };

  const handleBackToDateTime = () => {
    setCurrentPage('datetime');
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  // Render patient details page if navigated
  if (currentPage === 'PatientDetails') {
    return (
      <PatientDetails 
        onBack={handleBackToDateTime}
        appointmentData={finalAppointmentData}
      />
    );
  }

  const calendarDays = generateCalendarDays();

return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm w-full flex items-center justify-between px-4 py-3">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
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
                <div className=" border-r-2 h-10 w-2"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 font-semibold">2</span>
                </div>
                <div className="ml-3">
                  <div className="text-sm text-gray-400">Patient Detail</div>
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

          {/* Calendar - Middle */}
          <div className="lg:w-2/4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Date</h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Calendar Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <button onClick={() => navigateMonth('prev')} className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h3 className="text-lg font-semibold text-gray-800">
                  {monthNames[currentMonth]} {currentYear}
                </h3>
                <button onClick={() => navigateMonth('next')} className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 border-b">
                {dayNames.map((day) => (
                  <div key={day} className="py-3 text-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(day)}
                    disabled={!day.isCurrentMonth || day.isPast}
                    className={`
                      h-12 flex items-center justify-center text-sm relative
                      ${!day.isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : 
                        day.isPast ? 'text-gray-400 cursor-not-allowed line-through' : 
                        'text-gray-700 hover:bg-teal-50 cursor-pointer'}
                      ${day.isToday ? 'bg-gray-100 font-semibold' : ''}
                      ${selectedDate === day.dateString ? 'bg-teal-600 text-white font-semibold' : ''}
                    `}
                  >
                    {day.day}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time Slots - Right Side */}
          <div className="lg:w-1/4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Hour</h2>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`
                    py-3 px-4 rounded-xl border text-sm font-medium transition-all
                    ${selectedTime === time ? 'bg-teal-600 text-white border-teal-600' : 
                      'bg-white text-gray-700 border-gray-200 hover:border-teal-300'}
                  `}
                >
                  {time}
                </button>
              ))}
            </div>
            
            {/* Continue Button */}
            <div className="mt-6">
                 <Link to={'/patient'}>
              <button
                onClick={handleContinue}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
               Continue
                <ChevronRight className="w-5 h-5" />
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DateTime;