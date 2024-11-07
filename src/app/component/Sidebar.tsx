"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import dashboard from '../../../public/dashboard.png';
import userManage from '../../../public/profile.png';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white h-screen w-64 p-6 border-r border-gray-200 fixed lg:relative`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 bg-orange-500 text-white p-2 rounded-md z-50"
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      <div className="flex items-center space-x-2 mb-10">
        <div className="text-2xl font-bold text-black flex flex-row items-center">
          <Image
            src={dashboard}
            alt="right arrow icon"
            className="mr-3 w-5 h-5"
          />
          Dashboard
        </div>
      </div>

      <nav className="space-y-2">
        <button className="flex items-center w-full py-3 px-2 rounded-lg hover:bg-orange-500 hover:text-white text-gray-600">
          <div className="text-[14px] font-semibold flex flex-row items-center">
            <Image
              src={userManage}
              alt="right arrow icon"
              className="mr-2 w-6 h-6"
            />
            User Management
          </div>
        </button>
      </nav>

      <div className="mt-auto pt-10"></div>
    </aside>
  );
};

export default Sidebar;
