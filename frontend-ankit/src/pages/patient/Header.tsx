
import React from 'react';
import { IoArrowBack, IoChatbubbleEllipsesOutline, IoWalletOutline, IoNotificationsOutline } from 'react-icons/io5';

interface HeaderProps {
  title: string;
  onBackClick: () => void;
  showIcons?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, onBackClick, showIcons = true }) => {
  return (
    <header className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-sm p-4 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center gap-4">
        <button onClick={onBackClick} className="text-2xl text-gray-700 hover:text-black transition-colors">
          <IoArrowBack />
        </button>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>
      {showIcons && (
         <div className="flex items-center gap-3">
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-600 text-xl">
                <IoChatbubbleEllipsesOutline />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 ring-2 ring-teal-300 text-xl">
                <IoWalletOutline />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-600 text-xl">
                <IoNotificationsOutline />
            </button>
         </div>
      )}
    </header>
  );
};

export default Header;
