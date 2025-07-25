
import React from 'react';
import { IoArrowBack, IoChatbubbleEllipsesOutline, IoWalletOutline, IoNotificationsOutline } from 'react-icons/io5';
import { ChevronLeft, MessageCircle, Calendar, Wallet, Bell, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const Header = ({ title, onBack, showIcons = true }) => {
  return (
    <header className="sticky top-0 flex items-center justify-between border-b border-gray-200 ">
      <div className="bg-white shadow-sm w-full flex items-center justify-between px-4 py-3">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
          {onBack && (
                    <button onClick={onBack} className="text-black p-2 ml-2">
                        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                    </button>
                )}
            <h1 className="text-xl font-semibold text-gray-800">Wallet</h1>
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

    </header>
  );
};

export default Header;
