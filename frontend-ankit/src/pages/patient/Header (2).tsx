
import React from 'react';
import { ChevronLeftIcon } from './Icons';
import { BsChatSquareDotsFill } from "react-icons/bs";
import { IoWallet } from "react-icons/io5";
import { BiSolidBell } from "react-icons/bi";

interface HeaderProps {
    title: string;
    onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
                {onBack && (
                    <button onClick={onBack} aria-label="Go back" className="text-black p-2 -ml-2">
                        <ChevronLeftIcon className="w-6 h-6 md:w-7 md:h-7" />
                    </button>
                )}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">{title}</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                 <button
                    onClick={() => alert('Messages feature is coming soon!')}
                    title="Chat"
                    aria-label="Messages"
                    className="relative w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <BsChatSquareDotsFill className="w-5 h-5 text-[#697080]" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                <button
                    onClick={() => alert('Wallet feature is coming soon!')}
                    title="Wallet"
                    aria-label="Wallet"
                    className="relative w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <IoWallet className="w-5 h-5 text-[#697080]" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                <button
                    onClick={() => alert('Notifications feature is coming soon!')}
                    title="Notifications"
                    aria-label="Notifications"
                    className="relative w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <BiSolidBell className="w-5 h-5 md:w-6 md:h-6 text-[#697080]" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>
            </div>
        </div>
    );
};

export default Header;
