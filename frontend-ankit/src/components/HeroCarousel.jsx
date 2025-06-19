import React, { useEffect, useState } from "react";

const banners = [
  {
    text: "Looking for Specialist Doctors?",
    subtext: "Schedule an appointment with our top doctors.",
    bgColor: "bg-[#5CB8B2]",
    image: "src/assets/doctor1.png",
  },
  {
    text: "Looking for Specialist Doctors?",
    subtext: "Schedule an appointment with our top doctors.",
    bgColor: "bg-[#F4B9C1]",
    image: "src/assets/doctor2.png",
  },
  {
    text: "Looking for Specialist Doctors?",
    subtext: "Schedule an appointment with our top doctors.",
    bgColor: "bg-[#F9A26C]",
    image: "src/assets/doctor3.png",
  },
  {
    text: "Looking for Specialist Doctors?",
    subtext: "Schedule an appointment with our top doctors.",
    bgColor: "bg-[#F4B9C1]",
    image: "src/assets/doctor4.png",
  },
];

const HeroBanners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[300px] overflow-hidden rounded-xl shadow-md">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${banners.length * 100}%`,
        }}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`relative w-full h-[300px] ${banner.bgColor} px-8 pt-6 flex items-start justify-between flex-shrink-0`}
            style={{ width: "100%" }}
          >
            {/* Text Section */}
            <div className="flex-1 text-white pr-6 z-10">
              <h2 className="text-3xl font-bold mb-2">{banner.text}</h2>
              <p className="text-base">{banner.subtext}</p>
            </div>

            {/* Doctor Image - centered more to the middle */}
            <div className="h-full pl-8 pr-8 flex items-end">
              <img
                src={banner.image}
                alt={`Doctor ${index + 1}`}
                className="h-[290px] object-contain select-none drop-shadow-xl"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroBanners;
